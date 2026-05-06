'use strict'
// Migrated to global.db

function clock(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
function rng(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function fmt(n) { return Number(n).toLocaleString('id-ID') }
function addExpAndLevel(user, exp) {
  user.exp += exp
  const needed = (user.level + 1) * 1000
  if (user.exp >= needed) { user.level += 1; user.exp -= needed }
}

async function rpgGatherHandler(LilyBot, m, { prefix, command, args, q }) {
  const reply = t => m.reply(t)
  const sender = m.sender
  if (!m.isGroup) return reply('Perintah RPG hanya bisa digunakan di grup!')
  const now = Date.now()

  let user = await global.db.users[sender]

  // ── .kerja ──────────────────────────────────────────────────────────────
  if (command === 'kerja') {
    const type = (args[0] || '').toLowerCase()
    const CD = 300000 // 5 menit
    if (now - user.lastkerja < CD) return reply(`⏳ Istirahat dulu! Tunggu ${clock(CD - (now - user.lastkerja))}`)

    const profesi = {
      ojek:     { icon: '🚗', narasi: (p) => `Mengantarkan ${p}`, penumpan: ['mas mas','bapak bapak','cewe SMA','bocil','emak emak'] },
      pedagang: { icon: '🛒', narasi: (p) => `Berjualan ${p}`, penumpan: ['wortel','sawi','cabai','daging','ikan','ayam'] },
      dokter:   { icon: '💉', narasi: (p) => `Menyembuhkan pasien ${p}`, penumpan: ['sakit kepala','cedera','luka bakar','patah tulang'] },
      petani:   { icon: '🌽', narasi: (p) => `Memanen ${p}`, penumpan: ['Wortel','Kubis','Padi','Jeruk','Pisang','Semangka'] },
      montir:   { icon: '🔧', narasi: (p) => `Memperbaiki ${p}`, penumpan: ['mobil','motor','becak','bus','sepeda'] },
      kuli:     { icon: '🔨', narasi: (p) => `Menyelesaikan ${p}`, penumpan: ['Membangun Rumah','Memperbaiki Gedung','Renovasi'] }
    }

    if (!profesi[type]) return reply(`*Pilih Pekerjaan:*\n${Object.keys(profesi).map(k => `• .kerja ${k}`).join('\n')}`)

    const p = profesi[type]
    const target = p.penumpan[rng(0, p.penumpan.length - 1)]
    // Reward: base + bonus dari level
    const money = rng(30000, 150000) + (user.level * 5000)
    const exp = rng(50, 200)
    user.money += money
    user.lastkerja = now
    addExpAndLevel(user, exp)
    await Object.assign(global.db.users[sender], { money: user.money, exp: user.exp, level: user.level, lastkerja: now })
    return reply(`${p.icon} ${p.narasi(target)}\n💰 +${fmt(money)} Money\n⭐ +${exp} XP`)
  }

  // ── .nebang ──────────────────────────────────────────────────────────────
  if (command === 'nebang') {
    const CD = 1800000 // 30 menit
    if (now - user.lastnebang < CD) return reply(`⏳ Tunggu ${clock(CD - (now - user.lastnebang))} untuk nebang lagi.`)
    if (user.sword === 0) return reply('❌ Kamu butuh Kapak/Sword dulu! Beli di `.shop`')

    const wood = rng(20, 50 + user.sword * 5)
    const money = rng(10000, 50000)
    const exp = rng(30, 100)
    user.wood += wood
    user.money += money
    user.lastnebang = now
    addExpAndLevel(user, exp)
    await Object.assign(global.db.users[sender], { wood: user.wood, money: user.money, exp: user.exp, level: user.level, lastnebang: now })
    return reply(`🪓 Selesai menebang!\n🪵 +${wood} Kayu\n💰 +${fmt(money)} Money\n⭐ +${exp} XP`)
  }

  // ── .mining ──────────────────────────────────────────────────────────────
  if (command === 'mining' || command === 'tambang') {
    const CD = 300000 // 5 menit
    if (now - user.lastmining < CD) return reply(`⏳ Tunggu ${clock(CD - (now - user.lastmining))} untuk mining lagi.`)
    if (user.pickaxe === 0) return reply('❌ Kamu butuh Pickaxe! Beli di `.shop`')
    if (user.health < 80) return reply(`❌ HP kamu terlalu rendah (${user.health}/1000)!\nHeal dulu dengan \`.heal\``)

    const lvl = user.pickaxe
    const rock  = rng(10, 30 + lvl * 5)
    const iron  = rng(0, 5 + lvl * 2)
    const gold  = lvl >= 4 ? rng(0, lvl) : 0
    const diamond = lvl >= 6 ? rng(0, Math.floor(lvl / 2)) : 0
    const exp = rng(80, 200 + lvl * 20)
    const hpLoss = rng(10, 30)

    user.rock += rock
    user.iron += iron
    user.gold += gold
    user.diamond += diamond
    user.health = Math.max(0, user.health - hpLoss)
    user.lastmining = now
    addExpAndLevel(user, exp)

    await Object.assign(global.db.users[sender], {
      rock: user.rock, iron: user.iron, gold: user.gold, diamond: user.diamond,
      health: user.health, exp: user.exp, level: user.level, lastmining: now
    })

    let hasil = `⛏️ *Hasil Mining*\n`
    if (rock)    hasil += `\n🪨 +${rock} Rock`
    if (iron)    hasil += `\n⚙️ +${iron} Iron`
    if (gold)    hasil += `\n🥇 +${gold} Gold`
    if (diamond) hasil += `\n💎 +${diamond} Diamond`
    hasil += `\n\n❤️ HP: -${hpLoss} (sisa ${user.health}/1000)\n⭐ +${exp} XP`
    return reply(hasil)
  }

  // ── .hunt ─────────────────────────────────────────────────────────────────
  if (command === 'hunt' || command === 'berburu') {
    const CD = 600000 // 10 menit
    if (now - user.lasthunt < CD) return reply(`⏳ Tunggu ${clock(CD - (now - user.lasthunt))} untuk berburu lagi.`)
    if (user.sword === 0) return reply('❌ Kamu butuh Sword dulu! Beli di `.shop`')
    if (user.health < 50) return reply(`❌ HP kamu terlalu rendah (${user.health}/1000)!`)

    const lvl = user.sword
    const animalPool = [
      { name: 'ayam', icon: '🐔', prob: 60 },
      { name: 'kambing', icon: '🐐', prob: 40 },
      { name: 'sapi', icon: '🐄', prob: 25 },
      { name: 'babi', icon: '🐗', prob: 20 },
      { name: 'harimau', icon: '🐯', prob: lvl >= 5 ? 15 : 0 },
      { name: 'gajah', icon: '🐘', prob: lvl >= 7 ? 10 : 0 },
    ].filter(a => a.prob > 0)

    const animal = animalPool[rng(0, animalPool.length - 1)]
    const count = rng(1, 3 + Math.floor(lvl / 2))
    const exp = rng(60, 150 + lvl * 15)
    const hpLoss = rng(5, 20)

    user[animal.name] = (user[animal.name] || 0) + count
    user.health = Math.max(0, user.health - hpLoss)
    user.lasthunt = now
    addExpAndLevel(user, exp)

    await Object.assign(global.db.users[sender], {
      [animal.name]: user[animal.name], health: user.health,
      exp: user.exp, level: user.level, lasthunt: now
    })
    return reply(`🏹 *Hasil Berburu*\n${animal.icon} +${count} ${animal.name}\n❤️ HP: -${hpLoss} (sisa ${user.health}/1000)\n⭐ +${exp} XP`)
  }

  // ── .berkebon ─────────────────────────────────────────────────────────────
  if (command === 'berkebon' || command === 'kebun') {
    const CD = 1800000 // 30 menit
    if (now - user.lastberkebon < CD) return reply(`⏳ Tunggu ${clock(CD - (now - user.lastberkebon))} untuk berkebun lagi.`)

    const seedsNeeded = { bibitpisang: 100, bibitanggur: 100, bibitmangga: 100, bibitjeruk: 100, bibitapel: 100 }
    const missing = Object.entries(seedsNeeded).filter(([k, v]) => (user[k] || 0) < v)
    if (missing.length > 0) {
      return reply(`🌱 Bibit yang dibutuhkan:\n${missing.map(([k, v]) => `• ${k}: butuh ${v - (user[k]||0)} lagi`).join('\n')}\n\nBeli bibit di \`.shop bibit\``)
    }

    const hasil = { pisang: rng(20, 80), anggur: rng(20, 80), mangga: rng(20, 80), jeruk: rng(20, 80), apel: rng(20, 80) }
    const exp = rng(100, 300)
    Object.entries(hasil).forEach(([k, v]) => { user[k] = (user[k] || 0) + v })
    Object.keys(seedsNeeded).forEach(k => { user[k] -= 100 })
    user.lastberkebon = now
    addExpAndLevel(user, exp)

    await Object.assign(global.db.users[sender], {
      pisang: user.pisang, anggur: user.anggur, mangga: user.mangga, jeruk: user.jeruk, apel: user.apel,
      bibitpisang: user.bibitpisang, bibitanggur: user.bibitanggur, bibitmangga: user.bibitmangga,
      bibitjeruk: user.bibitjeruk, bibitapel: user.bibitapel,
      exp: user.exp, level: user.level, lastberkebon: now
    })

    return reply(`🌿 *Hasil Panen Kebun*\n🍌 +${hasil.pisang} Pisang\n🍇 +${hasil.anggur} Anggur\n🥭 +${hasil.mangga} Mangga\n🍊 +${hasil.jeruk} Jeruk\n🍎 +${hasil.apel} Apel\n⭐ +${exp} XP`)
  }

  // ── .buah ─────────────────────────────────────────────────────────────────
  if (command === 'buah') {
    return reply(`🍎 *Gudang Buah*\n🍌 Pisang: ${user.pisang}\n🍇 Anggur: ${user.anggur}\n🥭 Mangga: ${user.mangga}\n🍊 Jeruk: ${user.jeruk}\n🍎 Apel: ${user.apel}\n\nJual buah dengan \`.jualbbuah\``)
  }
}

module.exports = {
  command: ['kerja', 'nebang', 'mining', 'tambang', 'hunt', 'berburu', 'berkebon', 'kebun', 'buah'],
  tags: ['rpg'],
  help: ['kerja [profesi]', 'nebang', 'mining', 'hunt', 'berkebon', 'buah'],
  run: rpgGatherHandler
}
