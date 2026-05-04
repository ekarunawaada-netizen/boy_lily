const mongoDb = require('../lib/db')

// ─── Starter Pack Definitions ─────────────────────────────────────────────────
const PACKS = {
  developer: {
    label: '👨‍💻 DEVELOPER PACK',
    badge: '👨‍💻',
    role: 'Developer',
    data: {
      money: 999_999_999,
      bank: 999_999_999,
      atm: 10,
      fullatm: 999_999_999,
      chip: 999_999,
      exp: 0,
      level: 100,
      limit: 999,
      health: 1000,
      potion: 999,
      pickaxe: 10,
      sword: 10,
      fishingrod: 10,
      armor: 10,
      wood: 9999,
      rock: 9999,
      iron: 9999,
      gold: 9999,
      diamond: 9999,
      emerald: 9999,
      string: 9999,
      bibitpisang: 999,
      bibitanggur: 999,
      bibitmangga: 999,
      bibitjeruk: 999,
      bibitapel: 999,
      umpan: 999,
      petfood: 999,
      common: 50,
      uncommon: 30,
      mythic: 10,
      legendary: 5,
    },
    desc: `Akses penuh sebagai Developer bot. Semua resource di-max!`,
  },

  owner: {
    label: '👑 OWNER PACK',
    badge: '👑',
    role: 'Owner',
    data: {
      money: 999_999_999,
      bank: 500_000_000,
      atm: 10,
      fullatm: 999_999_999,
      chip: 500_000,
      exp: 0,
      level: 50,
      limit: 999,
      health: 1000,
      potion: 100,
      pickaxe: 8,
      sword: 8,
      fishingrod: 8,
      armor: 8,
      wood: 5000,
      rock: 5000,
      iron: 5000,
      gold: 2000,
      diamond: 1000,
      emerald: 500,
      string: 5000,
      bibitpisang: 500,
      bibitanggur: 500,
      bibitmangga: 500,
      bibitjeruk: 500,
      bibitapel: 500,
      umpan: 500,
      petfood: 500,
      common: 20,
      uncommon: 10,
      mythic: 5,
      legendary: 2,
    },
    desc: `Pemilik bot. Resource berlimpah!`,
  },

  premium: {
    label: '⭐ PREMIUM PACK',
    badge: '⭐',
    role: 'Premium',
    data: {
      money: 500_000,
      bank: 0,
      atm: 1,
      fullatm: 50_000_000,
      chip: 50_000,
      exp: 0,
      level: 0,
      limit: 999,
      health: 1000,
      potion: 20,
      pickaxe: 3,
      sword: 3,
      fishingrod: 2,
      armor: 2,
      wood: 500,
      rock: 500,
      iron: 200,
      gold: 50,
      diamond: 5,
      emerald: 0,
      string: 300,
      bibitpisang: 50,
      bibitanggur: 50,
      bibitmangga: 50,
      bibitjeruk: 50,
      bibitapel: 50,
      umpan: 50,
      petfood: 50,
    },
    desc: `User premium. Limit unlimited & resource ekstra!`,
  },

  free: {
    label: '🌱 BEGINNER PACK',
    badge: '🌱',
    role: 'Beginner',
    data: {
      money: 100_000,
      bank: 0,
      atm: 0,
      fullatm: 0,
      chip: 0,
      exp: 0,
      level: 0,
      limit: 20,
      health: 1000,
      potion: 5,
      pickaxe: 1,
      sword: 1,
      fishingrod: 0,
      armor: 1,
      wood: 50,
      rock: 50,
      iron: 0,
      bibitpisang: 10,
      umpan: 10,
      petfood: 5,
    },
    desc: `Starter pack untuk pemula. Selamat berpetualang!`,
  },
}

// ─── Deteksi Role ──────────────────────────────────────────────────────────────
function detectRole(sender) {
  const ownerList = JSON.parse(require('fs').readFileSync('./database/owner.json'))
  const premList  = JSON.parse(require('fs').readFileSync('./database/premium.json'))
  const ownerJid  = ownerList.map(n => n.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
  const premJid   = premList.map(n => n.replace(/[^0-9]/g, '') + '@s.whatsapp.net')

  // Developer = owner ke-1 (index 0) atau sesuai OWNER_NUMBER di env
  const devNumber = (process.env.OWNER_NUMBER || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  const devJids   = [ownerJid[0], devNumber].filter(Boolean)

  if (devJids.includes(sender)) return 'developer'
  if (ownerJid.includes(sender)) return 'owner'
  if (premJid.includes(sender)) return 'premium'
  return 'free'
}

// ─── Format Pack Message ───────────────────────────────────────────────────────
function packMessage(pack, name, age) {
  const d = pack.data
  return `╔══『 ${pack.label} 』══╗
│ 👤 Nama  : ${name}
│ 🎂 Umur  : ${age} Tahun
│ 🏅 Role  : ${pack.role}
│
│ 📦 *Resource yang kamu terima:*
│ 💰 Money    : ${d.money?.toLocaleString('id-ID') ?? 0}
│ 🏦 Bank     : ${d.bank?.toLocaleString('id-ID') ?? 0}
│ 🎰 Chip     : ${d.chip?.toLocaleString('id-ID') ?? 0}
│ 🎫 Limit    : ${d.limit === 999 ? 'Unlimited' : d.limit}
│ 🏅 Level    : ${d.level}
│ ❤️ HP       : ${d.health}/1000
│ 🧪 Potion   : ${d.potion}
│ ⛏ Pickaxe  : Lv.${d.pickaxe}
│ ⚔️ Sword    : Lv.${d.sword}
│ 🎣 Fishing  : Lv.${d.fishingrod}
│ 🛡 Armor    : Lv.${d.armor}
│
│ 💬 ${pack.desc}
╚══════════════════════╝

✨ Ketik *.profile* untuk cek statusmu!`
}

// ─── Plugin Handler ────────────────────────────────────────────────────────────
module.exports = {
  name: 'register',
  command: ['daftar', 'register', 'claimpack'],
  category: 'main',
  desc: 'Mendaftar sebagai pengguna bot',

  async run(DinzBotz, m, { prefix, command, args, sender }) {
    const fs = require('fs')

    // Pastikan global.db.users ada
    if (!global.db?.users) global.db.users = {}
    if (!global.db.users[sender]) global.db.users[sender] = {}
    let user = global.db.users[sender]

    // ── .claimpack — Paksa apply pack untuk user yg sudah terdaftar ─────────
    if (command === 'claimpack') {
      const role   = detectRole(sender)
      const pack   = PACKS[role]
      const name   = user.name || m.pushName || 'User'
      const age    = user.age || 0

      const updateData = { ...pack.data, role: pack.role }
      Object.assign(user, updateData)
      await mongoDb.updateUser(sender, updateData)

      return m.reply(`✅ *Pack berhasil di-apply!*\n\n${packMessage(pack, name, age)}`)
    }

    // ── .daftar / .register ─────────────────────────────────────────────────
    if (user.registered) return m.reply(`Kamu sudah terdaftar! ✨\nKetik *.profile* untuk cek profil atau *.claimpack* untuk apply ulang pack kamu.`)

    // Parsing nama & umur dari args
    const input = args.join(' ')
    if (!input.includes('.')) return m.reply(`Format salah!\n\nContoh: *${prefix}${command} Nama.Umur*\nContoh: *${prefix}${command} Lily.18*`)

    const dotIdx = input.lastIndexOf('.')
    const name   = input.slice(0, dotIdx).trim()
    const age    = input.slice(dotIdx + 1).trim()

    if (!name)               return m.reply(`❌ Nama harus diisi!\nContoh: *${prefix}${command} Lily.18*`)
    if (!age)                return m.reply(`❌ Umur harus diisi!\nContoh: *${prefix}${command} Lily.18*`)
    if (name.length > 20)    return m.reply(`❌ Nama kepanjangan, maksimal 20 karakter!`)
    if (isNaN(age))          return m.reply(`❌ Umur harus berupa angka!`)
    if (+age > 100 || +age < 5) return m.reply(`❌ Umur tidak masuk akal...`)

    // Deteksi role & ambil pack
    const role = detectRole(sender)
    const pack = PACKS[role]

    // Data yang disimpan
    const updateData = {
      registered: true,
      name: name,
      age: parseInt(age),
      registeredAt: Date.now(),
      role: pack.role,
      ...pack.data,
    }

    // Simpan ke global.db & MongoDB
    Object.assign(user, updateData)
    await mongoDb.updateUser(sender, updateData)

    return m.reply(`🎉 *PENDAFTARAN BERHASIL!*\n\n${packMessage(pack, name, age)}`)
  }
}
