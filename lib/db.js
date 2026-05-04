/**
 * db.js — Database Utility Layer untuk Lily-MD
 * Phase 2: DB Utility dengan in-memory Cache
 *
 * Cara pakai:
 *   const db = require('./lib/db')
 *   await db.connect()                     // di index.js saat startup
 *   const user = await db.getUser(jid)     // ganti global.db.users[jid]
 *   await db.updateUser(jid, { money: 500 })
 *   const grp  = await db.getGroup(jid)    // ganti cek welcome.json, nsfw.json, dll
 *   await db.updateGroup(jid, { welcome: true })
 */

'use strict'

require('dotenv').config()
const mongoose  = require('mongoose')
const NodeCache = require('node-cache')
const { User, Group } = require('./schema')

// ──────────────────────────────────────────────────────────────────────────────
// Cache Config
// TTL = 5 menit (300 detik) per entry.
// Setiap kali update DB, entry cache juga diperbarui supaya konsisten.
// ──────────────────────────────────────────────────────────────────────────────
const userCache  = new NodeCache({ stdTTL: 300, checkperiod: 60, useClones: false })
const groupCache = new NodeCache({ stdTTL: 300, checkperiod: 60, useClones: false })

// ──────────────────────────────────────────────────────────────────────────────
// Default template untuk user baru (identik dengan database.json)
// ──────────────────────────────────────────────────────────────────────────────
const DEFAULT_USER = {
    registered: false, banned: false, bannedTime: 0,
    premium: false, premiumTime: 0, role: 'Beginner', skill: '',
    warning: 0, WarnReason: '',
    money: 100000, bank: 0, atm: 0, fullatm: 0, chip: 0, rokets: 0,
    exp: 0, level: 0, limit: 20, freelimit: 0, pc: 0, skata: 0,
    age: -1, regTime: -1, joinlimit: 1, unreg: false, lastclaim: 0,
    afk: -1, afkTime: -1, afkReason: '',
    health: 1000, potion: 10, ojekk: 0,
    armor: 1, armordurability: 0, sword: 1, sworddurability: 0,
    pickaxe: 1, pickaxedurability: 0, fishingrod: 0, fishingroddurability: 0,
    robodurability: 0,
    wood: 0, rock: 0, string: 0, iron: 0, gold: 0, emerald: 0, diamond: 0,
    trash: 0, botol: 0, kardus: 0, kaleng: 0, gelas: 0, plastik: 0,
    common: 0, uncommon: 0, mythic: 0, legendary: 0, umpan: 0,
    petfood: 0, makanan: 0,
    pet: 0,
    horse: 0, horseexp: 0, horselastfeed: 0,
    cat: 0,   catexp: 0,   catlastfeed: 0,
    fox: 0,   foxexp: 0,   foxlastfeed: 0,
    dog: 0,   dogexp: 0,   doglastfeed: 0,
    robo: 0,  roboexp: 0,  robolastfeed: 0,
    apel: 20, pisang: 0, anggur: 0, mangga: 0, jeruk: 0,
    bibitanggur: 0, bibitpisang: 0, bibitapel: 0, bibitmangga: 0, bibitjeruk: 0,
    lastadventure: 0, lastkill: 0, lastmisi: 0, lastdungeon: 0, lastwar: 0,
    lastsda: 0, lastduel: 0, lastmining: 0, lasthunt: 0, lastgift: 0,
    lastberkebon: 0, lastdagang: 0, lasthourly: 0, lastbansos: 0,
    lastrampok: 0, lastnebang: 0, lastweekly: 0, lastmonthly: 0,
    paus: 0, kepiting: 0, gurita: 0, cumi: 0, buntal: 0, dory: 0,
    lumba: 0, lobster: 0, hiu: 0, udang: 0, ikan: 0, orca: 0,
    banteng: 0, harimau: 0, gajah: 0, kambing: 0, buaya: 0, kerbau: 0,
    sapi: 0, monyet: 0, babi: 0, ayam: 0, panda: 0, babihutan: 0,
}

// ──────────────────────────────────────────────────────────────────────────────
// Default template untuk grup baru
// ──────────────────────────────────────────────────────────────────────────────
const DEFAULT_GROUP = {
    name: '', welcome: false, left: false, proses: false, done: false,
    mute: false, nsfw: false, antitoxic: false, antivirus: false, antiwame: false,
    antilink: false, antilinkall: false, antilinkfacebook: false,
    antilinkinstagram: false, antilinktiktok: false, antilinktelegram: false,
    antilinktwitter: false, antilinkytchannel: false, antilinkytvideo: false,
    antilinkch: false, openaigc: false, chatDinzID: false, autosticker: false,
}

// ──────────────────────────────────────────────────────────────────────────────
// Connection
// ──────────────────────────────────────────────────────────────────────────────
let _connected = false

async function connect() {
    if (_connected) return
    const uri = process.env.MONGO_URI
    if (!uri) {
        console.warn('⚠️  [DB] MONGO_URI tidak ditemukan di .env — menggunakan JSON lokal saja.')
        return
    }
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        })
        _connected = true
        console.log('✅ [DB] Terhubung ke MongoDB Atlas!')
    } catch (err) {
        console.error('❌ [DB] Gagal connect MongoDB:', err.message)
        console.warn('⚠️  [DB] Bot tetap berjalan dengan JSON lokal sebagai fallback.')
    }
}

function isConnected() {
    return _connected && mongoose.connection.readyState === 1
}

// ──────────────────────────────────────────────────────────────────────────────
// USER OPERATIONS
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Ambil data user. Jika tidak ada di DB, buat entry baru dengan default.
 * Hasil di-cache 5 menit.
 * @param {string} jid - WhatsApp JID
 * @returns {Object} user data
 */
async function getUser(jid) {
    // 1. Coba dari cache dulu
    const cached = userCache.get(jid)
    if (cached) return cached

    // 2. Fallback ke global.db jika tidak ada koneksi MongoDB
    if (!isConnected()) {
        return _getOrCreateLocalUser(jid)
    }

    // 3. Ambil dari MongoDB
    try {
        let user = await User.findById(jid).lean()
        if (!user) {
            // Buat user baru dengan default
            user = await User.create({ _id: jid, ...DEFAULT_USER })
            user = user.toObject()
        }
        userCache.set(jid, user)
        return user
    } catch (err) {
        console.error(`❌ [DB] getUser(${jid}):`, err.message)
        return _getOrCreateLocalUser(jid)
    }
}

/**
 * Update field user. Juga mengupdate cache setelah update DB.
 * @param {string} jid - WhatsApp JID
 * @param {Object} data - Field yang mau diupdate
 */
async function updateUser(jid, data) {
    // Update cache dulu (optimistic update)
    const cached = userCache.get(jid)
    if (cached) {
        userCache.set(jid, { ...cached, ...data })
    }

    if (!isConnected()) {
        // Fallback: update global.db.users saja
        if (global.db?.users?.[jid]) {
            Object.assign(global.db.users[jid], data)
        }
        return
    }

    try {
        await User.findByIdAndUpdate(
            jid,
            { $set: data },
            { upsert: true, new: true }
        )
    } catch (err) {
        console.error(`❌ [DB] updateUser(${jid}):`, err.message)
    }
}

/**
 * Helper fallback: ambil dari global.db.users (JSON lokal)
 */
function _getOrCreateLocalUser(jid) {
    if (!global.db?.users) return { ...DEFAULT_USER, _id: jid }
    if (!global.db.users[jid]) {
        global.db.users[jid] = { ...DEFAULT_USER }
    }
    return { _id: jid, ...global.db.users[jid] }
}

// ──────────────────────────────────────────────────────────────────────────────
// GROUP OPERATIONS
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Ambil data grup. Jika tidak ada di DB, buat entry baru dengan default.
 * @param {string} jid - Group JID
 * @returns {Object} group data
 */
async function getGroup(jid) {
    const cached = groupCache.get(jid)
    if (cached) return cached

    if (!isConnected()) {
        return _getOrCreateLocalGroup(jid)
    }

    try {
        let group = await Group.findById(jid).lean()
        if (!group) {
            group = await Group.create({ _id: jid, ...DEFAULT_GROUP })
            group = group.toObject()
        }
        groupCache.set(jid, group)
        return group
    } catch (err) {
        console.error(`❌ [DB] getGroup(${jid}):`, err.message)
        return _getOrCreateLocalGroup(jid)
    }
}

/**
 * Update field grup.
 * @param {string} jid - Group JID
 * @param {Object} data - Field yang mau diupdate
 */
async function updateGroup(jid, data) {
    const cached = groupCache.get(jid)
    if (cached) {
        groupCache.set(jid, { ...cached, ...data })
    }

    if (!isConnected()) return

    try {
        await Group.findByIdAndUpdate(
            jid,
            { $set: data },
            { upsert: true, new: true }
        )
    } catch (err) {
        console.error(`❌ [DB] updateGroup(${jid}):`, err.message)
    }
}

/**
 * Helper fallback: ambil dari global.db.groups atau file JSON terpisah
 */
function _getOrCreateLocalGroup(jid) {
    if (!global.db?.groups) return { ...DEFAULT_GROUP, _id: jid }
    if (!global.db.groups[jid]) {
        global.db.groups[jid] = { ...DEFAULT_GROUP }
    }
    return { _id: jid, ...global.db.groups[jid] }
}

// ──────────────────────────────────────────────────────────────────────────────
// Cache Invalidation Helpers
// ──────────────────────────────────────────────────────────────────────────────
function clearUserCache(jid) { userCache.del(jid) }
function clearGroupCache(jid) { groupCache.del(jid) }
function clearAllCache() { userCache.flushAll(); groupCache.flushAll() }

// ──────────────────────────────────────────────────────────────────────────────
// Export
// ──────────────────────────────────────────────────────────────────────────────
module.exports = {
    connect,
    isConnected,
    getUser,
    updateUser,
    getGroup,
    updateGroup,
    clearUserCache,
    clearGroupCache,
    clearAllCache,
    DEFAULT_USER,
    DEFAULT_GROUP,
}
