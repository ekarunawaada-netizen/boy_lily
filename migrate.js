/**
 * migrate.js — Script Migrasi Data (Phase 3)
 * Jalankan SEKALI saja: node migrate.js
 *
 * Apa yang dilakukan script ini:
 * 1. Baca semua data dari database/database.json (users)
 * 2. Baca file-file JSON grup terpisah (welcome.json, nsfw.json, dll)
 * 3. Upload ke MongoDB Atlas
 */

'use strict'

require('dotenv').config()
const fs       = require('fs')
const mongoose = require('mongoose')
const { User, Group } = require('./lib/schema')

const DB_PATH = './database'

// ─── Connect ─────────────────────────────────────────────────────────────────
async function main() {
    const uri = process.env.MONGO_URI
    if (!uri) {
        console.error('❌ MONGO_URI tidak ada di .env!')
        process.exit(1)
    }

    console.log('🔌 Menghubungkan ke MongoDB Atlas...')
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 })
    console.log('✅ Terhubung!\n')

    await migrateUsers()
    await migrateGroups()

    console.log('\n🎉 Migrasi selesai! Disconnect...')
    await mongoose.disconnect()
    process.exit(0)
}

// ─── Migrate Users ────────────────────────────────────────────────────────────
async function migrateUsers() {
    console.log('👤 Migrasi Users...')
    const raw = JSON.parse(fs.readFileSync(`${DB_PATH}/database.json`, 'utf-8'))
    const users = raw.users || {}
    const jids  = Object.keys(users)

    console.log(`   Ditemukan ${jids.length} user`)

    let ok = 0, skip = 0, fail = 0

    for (const jid of jids) {
        // Filter: skip newsletter (bukan user nyata)
        if (jid.includes('@newsletter')) { skip++; continue }

        try {
            await User.findByIdAndUpdate(
                jid,
                { $set: { _id: jid, ...users[jid] } },
                { upsert: true, new: true }
            )
            ok++
        } catch (e) {
            console.error(`   ❌ Gagal migrasi user ${jid}:`, e.message)
            fail++
        }
    }

    console.log(`   ✅ Berhasil: ${ok} | ⏭ Skip: ${skip} | ❌ Gagal: ${fail}`)
}

// ─── Migrate Groups ───────────────────────────────────────────────────────────
async function migrateGroups() {
    console.log('\n👥 Migrasi Groups...')

    // Map file JSON ke field di schema Group
    const groupFiles = {
        'welcome.json':          { field: 'welcome',          isArray: true },
        'left.json':             { field: 'left',             isArray: true },
        'set_done.json':         { field: 'done',             isArray: true },
        'set_proses.json':       { field: 'proses',           isArray: true },
        'mute.json':             { field: 'mute',             isArray: true },
        'nsfw.json':             { field: 'nsfw',             isArray: true },
        'antitoxic.json':        { field: 'antitoxic',        isArray: false }, // format objek
        'antivirus.json':        { field: 'antivirus',        isArray: false },
        'antiwame.json':         { field: 'antiwame',         isArray: false },
        'antilinkall.json':      { field: 'antilinkall',      isArray: true },
        'antilinkfacebook.json': { field: 'antilinkfacebook', isArray: false },
        'antilinkinstagram.json':{ field: 'antilinkinstagram',isArray: false },
        'antilinktiktok.json':   { field: 'antilinktiktok',   isArray: true },
        'antilinktelegram.json': { field: 'antilinktelegram', isArray: true },
        'antilinktwitter.json':  { field: 'antilinktwitter',  isArray: true },
        'antilinkytchannel.json':{ field: 'antilinkytchannel',isArray: true },
        'antilinkytvideo.json':  { field: 'antilinkytvideo',  isArray: true },
        'antilinkch.json':       { field: 'antilinkch',       isArray: true },
        'openaigc.json':         { field: 'openaigc',         isArray: true },
        'autosticker.json':      { field: 'autosticker',      isArray: false }, // {groupId: bool}
    }

    // Kumpulkan semua grup yang perlu diupdate ke dalam map { jid: {fields} }
    const groupMap = {}

    for (const [filename, config] of Object.entries(groupFiles)) {
        const filePath = `${DB_PATH}/${filename}`
        if (!fs.existsSync(filePath)) continue

        let raw
        try {
            raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        } catch {
            console.warn(`   ⚠️  Gagal parse ${filename}, dilewati.`)
            continue
        }

        if (config.isArray && Array.isArray(raw)) {
            // Format: ["groupjid1", "groupjid2", ...]
            for (const jid of raw) {
                if (!jid.endsWith('@g.us')) continue
                if (!groupMap[jid]) groupMap[jid] = {}
                groupMap[jid][config.field] = true
            }
        } else if (typeof raw === 'object' && raw !== null) {
            // Format: { "groupjid": true/false, ... }
            for (const [jid, val] of Object.entries(raw)) {
                if (!jid.endsWith('@g.us')) continue
                if (!groupMap[jid]) groupMap[jid] = {}
                groupMap[jid][config.field] = Boolean(val)
            }
        }
    }

    const groupJids = Object.keys(groupMap)
    console.log(`   Ditemukan ${groupJids.length} grup unik`)

    let ok = 0, fail = 0
    for (const jid of groupJids) {
        try {
            await Group.findByIdAndUpdate(
                jid,
                { $set: { _id: jid, ...groupMap[jid] } },
                { upsert: true, new: true }
            )
            ok++
        } catch (e) {
            console.error(`   ❌ Gagal migrasi grup ${jid}:`, e.message)
            fail++
        }
    }

    console.log(`   ✅ Berhasil: ${ok} | ❌ Gagal: ${fail}`)
}

// ─── Run ─────────────────────────────────────────────────────────────────────
main().catch(err => {
    console.error('❌ Fatal error:', err)
    process.exit(1)
})
