/**
 * Mongoose Schema Definitions - Lily-MD
 * Phase 1: Schema Design (sesuai struktur database.json eksisting)
 */

const mongoose = require('mongoose')
const { Schema } = mongoose

// ──────────────────────────────────────────────────────────────────────────────
// USER SCHEMA
// Memetakan semua field dari database.json > users > <jid>
// ──────────────────────────────────────────────────────────────────────────────
const userSchema = new Schema({
    _id:         { type: String },   // WhatsApp JID, e.g. "62xxx@s.whatsapp.net"

    // === Status & Role ===
    registered:  { type: Boolean, default: false },
    banned:      { type: Boolean, default: false },
    bannedTime:  { type: Number,  default: 0 },
    premium:     { type: Boolean, default: false },
    premiumTime: { type: Number,  default: 0 },
    role:        { type: String,  default: 'Beginner' },
    skill:       { type: String,  default: '' },
    warning:     { type: Number,  default: 0 },
    WarnReason:  { type: String,  default: '' },

    // === Economy ===
    money:    { type: Number, default: 100000 },
    bank:     { type: Number, default: 0 },
    atm:      { type: Number, default: 0 },
    fullatm:  { type: Number, default: 0 },
    chip:     { type: Number, default: 0 },
    rokets:   { type: Number, default: 0 },

    // === Progression ===
    exp:   { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    limit: { type: Number, default: 20 },
    freelimit: { type: Number, default: 0 },
    pc:    { type: Number, default: 0 },
    skata: { type: Number, default: 0 },

    // === Profile ===
    age:        { type: Number, default: -1 },
    regTime:    { type: Number, default: -1 },
    joinlimit:  { type: Number, default: 1 },
    unreg:      { type: Boolean, default: false },
    lastclaim:  { type: Number, default: 0 },

    // === AFK ===
    afk:       { type: Number,  default: -1 },
    afkTime:   { type: Number,  default: -1 },
    afkReason: { type: String,  default: '' },

    // === RPG Stats ===
    health:  { type: Number, default: 1000 },
ojekk:   { type: Number, default: 0 },
    potion:  { type: Number, default: 10 },

    // === Equipment ===
    armor:              { type: Number, default: 1 },
    armordurability:    { type: Number, default: 0 },
    sword:              { type: Number, default: 1 },
    sworddurability:    { type: Number, default: 0 },
    pickaxe:            { type: Number, default: 1 },
    pickaxedurability:  { type: Number, default: 0 },
    fishingrod:         { type: Number, default: 0 },
    fishingroddurability: { type: Number, default: 0 },
    robodurability:     { type: Number, default: 0 },

    // === Resources (Mining) ===
    wood:    { type: Number, default: 0 },
    rock:    { type: Number, default: 0 },
    string:  { type: Number, default: 0 },
    iron:    { type: Number, default: 0 },
    gold:    { type: Number, default: 0 },
    emerald: { type: Number, default: 0 },
    diamond: { type: Number, default: 0 },
    trash:   { type: Number, default: 0 },
    botol:   { type: Number, default: 0 },
    kardus:  { type: Number, default: 0 },
    kaleng:  { type: Number, default: 0 },
    gelas:   { type: Number, default: 0 },
    plastik: { type: Number, default: 0 },

    // === Items (Loot) ===
    common:    { type: Number, default: 0 },
    uncommon:  { type: Number, default: 0 },
    mythic:    { type: Number, default: 0 },
    legendary: { type: Number, default: 0 },
    umpan:     { type: Number, default: 0 },
    petfood:   { type: Number, default: 0 },
    makanan:   { type: Number, default: 0 },

    // === Pets ===
    pet:  { type: Number, default: 0 },
    horse: { type: Number, default: 0 }, horseexp: { type: Number, default: 0 }, horselastfeed: { type: Number, default: 0 },
    cat:   { type: Number, default: 0 }, catexp:   { type: Number, default: 0 }, catlastfeed:   { type: Number, default: 0 },
    fox:   { type: Number, default: 0 }, foxexp:   { type: Number, default: 0 }, foxlastfeed:   { type: Number, default: 0 },
    dog:   { type: Number, default: 0 }, dogexp:   { type: Number, default: 0 }, doglastfeed:   { type: Number, default: 0 },
    robo:  { type: Number, default: 0 }, roboexp:  { type: Number, default: 0 }, robolastfeed:  { type: Number, default: 0 },

    // === Hasil Panen ===
    apel:         { type: Number, default: 20 },
    pisang:       { type: Number, default: 0 },
    anggur:       { type: Number, default: 0 },
    mangga:       { type: Number, default: 0 },
    jeruk:        { type: Number, default: 0 },
    bibitanggur:  { type: Number, default: 0 },
    bibitpisang:  { type: Number, default: 0 },
    bibitapel:    { type: Number, default: 0 },
    bibitmangga:  { type: Number, default: 0 },
    bibitjeruk:   { type: Number, default: 0 },

    // === Cooldowns (Timestamps) ===
    lastadventure: { type: Number, default: 0 },
    lastkill:      { type: Number, default: 0 },
    lastmisi:      { type: Number, default: 0 },
    lastdungeon:   { type: Number, default: 0 },
    lastwar:       { type: Number, default: 0 },
    lastsda:       { type: Number, default: 0 },
    lastduel:      { type: Number, default: 0 },
    lastmining:    { type: Number, default: 0 },
    lasthunt:      { type: Number, default: 0 },
    lastgift:      { type: Number, default: 0 },
    lastberkebon:  { type: Number, default: 0 },
    lastdagang:    { type: Number, default: 0 },
    lasthourly:    { type: Number, default: 0 },
    lastbansos:    { type: Number, default: 0 },
    lastrampok:    { type: Number, default: 0 },
    lastnebang:    { type: Number, default: 0 },
    lastweekly:    { type: Number, default: 0 },
    lastmonthly:   { type: Number, default: 0 },

    // === Hewan Ternak ===
    paus: { type: Number, default: 0 }, kepiting: { type: Number, default: 0 },
    gurita: { type: Number, default: 0 }, cumi: { type: Number, default: 0 },
    buntal: { type: Number, default: 0 }, dory: { type: Number, default: 0 },
    lumba: { type: Number, default: 0 }, lobster: { type: Number, default: 0 },
    hiu: { type: Number, default: 0 }, udang: { type: Number, default: 0 },
    ikan: { type: Number, default: 0 }, orca: { type: Number, default: 0 },
    banteng: { type: Number, default: 0 }, harimau: { type: Number, default: 0 },
    gajah: { type: Number, default: 0 }, kambing: { type: Number, default: 0 },
    buaya: { type: Number, default: 0 }, kerbau: { type: Number, default: 0 },
    sapi: { type: Number, default: 0 }, monyet: { type: Number, default: 0 },
    babi: { type: Number, default: 0 }, ayam: { type: Number, default: 0 },
    panda: { type: Number, default: 0 }, babihutan: { type: Number, default: 0 },

}, { _id: false, versionKey: false })

// ──────────────────────────────────────────────────────────────────────────────
// GROUP SCHEMA
// Memetakan file-file JSON terpisah di database/ yang terkait grup
// ──────────────────────────────────────────────────────────────────────────────
const groupSchema = new Schema({
    _id:  { type: String },  // Group JID, e.g. "123xxx@g.us"
    name: { type: String, default: '' },

    // Welcome/Leave toggles (sebelumnya simpan di file terpisah)
    welcome: { type: Boolean, default: false },
    left:    { type: Boolean, default: false },
    proses:  { type: Boolean, default: false },
    done:    { type: Boolean, default: false },

    // Moderation
    mute:       { type: Boolean, default: false },
    nsfw:       { type: Boolean, default: false },
    antitoxic:  { type: Boolean, default: false },
    antivirus:  { type: Boolean, default: false },
    antiwame:   { type: Boolean, default: false },

    // Anti-link variants
    antilink:           { type: Boolean, default: false },
    antilinkall:        { type: Boolean, default: false },
    antilinkfacebook:   { type: Boolean, default: false },
    antilinkinstagram:  { type: Boolean, default: false },
    antilinktiktok:     { type: Boolean, default: false },
    antilinktelegram:   { type: Boolean, default: false },
    antilinktwitter:    { type: Boolean, default: false },
    antilinkytchannel:  { type: Boolean, default: false },
    antilinkytvideo:    { type: Boolean, default: false },
    antilinkch:         { type: Boolean, default: false },

    // OpenAI chat per grup
    openaigc: { type: Boolean, default: false },

    // Game
    chatDinzID: { type: Boolean, default: false },

    // Autosticker
    autosticker: { type: Boolean, default: false },

}, { _id: false, versionKey: false })

// ──────────────────────────────────────────────────────────────────────────────
// Export models — try/catch agar tidak error jika model sudah terdaftar
// ──────────────────────────────────────────────────────────────────────────────
const User  = mongoose.models.User  || mongoose.model('User',  userSchema)
const Group = mongoose.models.Group || mongoose.model('Group', groupSchema)

module.exports = { User, Group }
