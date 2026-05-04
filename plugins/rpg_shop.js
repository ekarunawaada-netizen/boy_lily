'use strict'
const db = require('../lib/db')

function fmt(n) { return Number(n).toLocaleString('id-ID') }
function rng(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

// Katalog Shop
const SHOP = {
  // Tools
  pickaxe:    { price: 5000000,   type: 'tool',  icon: '⛏', desc: 'Untuk mining' },
  sword:      { price: 5000000,   type: 'tool',  icon: '⚔️', desc: 'Untuk hunt & rampok' },
  fishingrod: { price: 3000000,   type: 'tool',  icon: '🎣', desc: 'Untuk memancing' },
  armor:      { price: 8000000,   type: 'tool',  icon: '🛡', desc: 'Mengurangi HP loss' },
  atm:        { price: 10000000,  type: 'tool',  icon: '🏧', desc: 'Buka akses bank' },
  // Consumables
  potion:     { price: 50000,     type: 'item',  icon: '🧪', desc: 'Pulihkan 50 HP' },
  // Bibit
  bibitpisang:{ price: 5000,      type: 'bibit', icon: '🌱', desc: 'Bibit pisang' },
  bibitanggur:{ price: 5000,      type: 'bibit', icon: '🌱', desc: 'Bibit anggur' },
  bibitmangga:{ price: 5000,      type: 'bibit', icon: '🌱', desc: 'Bibit mangga' },
  bibitjeruk: { price: 5000,      type: 'bibit', icon: '🌱', desc: 'Bibit jeruk' },
  bibitapel:  { price: 5000,      type: 'bibit', icon: '🌱', desc: 'Bibit apel' },
  // Umpan
  umpan:      { price: 2000,      type: 'item',  icon: '🪱', desc: 'Umpan memancing' },
  petfood:    { price: 3000,      type: 'item',  icon: '🦴', desc: 'Makanan pet' },
}

// Batas ATM per level
function getAtmCap(level) { return level * 50000000 }

async function rpgShopHandler(DinzBotz, m, { prefix, command, args, q }) {
  const reply = t => m.reply(t)
  const sender = m.sender
  if (!m.isGroup) return reply('Perintah RPG hanya bisa digunakan di grup!')

  let user = await db.getUser(sender)

  // ── .shop ──────────────────────────────────────────────────────────────
  if (command === 'shop' || command === 'toko') {
    const filter = (args[0] || '').toLowerCase()
    const items = Object.entries(SHOP)
      .filter(([k]) => !filter || SHOP[k].type === filter || k.includes(filter))
    if (items.length === 0) return reply('Item tidak ditemukan.')
    const list = items.map(([k, v]) => `${v.icon} *${k}* — Rp ${fmt(v.price)}\n   └ ${v.desc}`).join('\n')
    return reply(`🏪 *TOKO RPG*\n\n${list}\n\n📌 Beli: \`.beli <item> [jumlah]\`\nKategori: \`tool\`, \`item\`, \`bibit\``)
  }

  // ── .beli ──────────────────────────────────────────────────────────────
  if (command === 'beli' || command === 'buy') {
    const item = (args[0] || '').toLowerCase()
    const qty = Math.max(1, parseInt(args[1]) || 1)
    const shopItem = SHOP[item]
    if (!shopItem) return reply(`❌ Item "${item}" tidak ada di toko.\nCek: \`.shop\``)

    const totalPrice = shopItem.price * qty
    if (user.money < totalPrice) return reply(`❌ Uangmu kurang!\nButuh: ${fmt(totalPrice)} 💰\nMilikmu: ${fmt(user.money)} 💰`)

    // Validasi khusus ATM (hanya bisa 1x beli, maks level 10)
    if (item === 'atm') {
      if (user.atm >= 10) return reply('❌ ATM kamu sudah level max!')
      user.atm += 1
      user.fullatm = getAtmCap(user.atm)
      user.money -= shopItem.price
      await db.updateUser(sender, { atm: user.atm, fullatm: user.fullatm, money: user.money })
      return reply(`✅ Berhasil upgrade ATM ke Level ${user.atm}!\n🏦 Kapasitas Bank: ${fmt(user.fullatm)}`)
    }

    // Tool: set ke level 1 jika belum ada
    if (shopItem.type === 'tool') {
      if (user[item] > 0) return reply(`❌ Kamu sudah punya ${item}! Gunakan \`.upgrade ${item}\` untuk naik level.`)
      user[item] = 1
      user.money -= shopItem.price
      await db.updateUser(sender, { [item]: user[item], money: user.money })
      return reply(`✅ Berhasil membeli *${shopItem.icon} ${item}*!\n💰 Sisa: ${fmt(user.money)}`)
    }

    // Item & Bibit: bisa beli banyak
    user[item] = (user[item] || 0) + qty
    user.money -= totalPrice
    await db.updateUser(sender, { [item]: user[item], money: user.money })
    return reply(`✅ Berhasil membeli *${qty}x ${shopItem.icon} ${item}*\n💰 -${fmt(totalPrice)} | Sisa: ${fmt(user.money)}`)
  }

  // ── .upgrade ────────────────────────────────────────────────────────────
  if (command === 'upgrade') {
    const type = (args[0] || '').toLowerCase()
    const recipes = {
      pickaxe:    { max: 10, mats: (lvl) => ({ rock: lvl * 250, wood: lvl * 150, money: lvl * 1500000 }) },
      fishingrod: { max: 10, mats: (lvl) => ({ wood: lvl * 100, string: lvl * 100, money: lvl * 1000000 }) },
      sword:      { max: 10, mats: (lvl) => ({ iron: lvl * 200, wood: lvl * 100, money: lvl * 2000000 }) },
      armor:      { max: 10, mats: (lvl) => ({ iron: lvl * 300, rock: lvl * 200, money: lvl * 2500000 }) },
    }
    if (!recipes[type]) {
      return reply(`📌 *Item yang bisa di-upgrade:*\n${Object.keys(recipes).map(k => `• ${k} (Lv.${user[k]||0}/10)`).join('\n')}`)
    }
    const r = recipes[type]
    if ((user[type] || 0) === 0) return reply(`❌ Kamu belum punya ${type}! Beli dulu: \`.beli ${type}\``)
    if (user[type] >= r.max) return reply(`❌ ${type} kamu sudah Level Max (${r.max})!`)

    const lvl = user[type]
    const needed = r.mats(lvl)
    const short = Object.entries(needed).filter(([k, v]) => (user[k] || 0) < v)
    if (short.length > 0) {
      return reply(`❌ Material kurang!\n${short.map(([k, v]) => `• ${k}: butuh ${v - (user[k]||0)} lagi`).join('\n')}`)
    }

    // Kurangi material
    Object.entries(needed).forEach(([k, v]) => { user[k] -= v })
    user[type] += 1

    const updatePayload = { [type]: user[type], ...Object.fromEntries(Object.keys(needed).map(k => [k, user[k]])) }
    await db.updateUser(sender, updatePayload)
    return reply(`✅ *${type}* berhasil diupgrade ke Level *${user[type]}*!\n\nMaterial dipakai:\n${Object.entries(needed).map(([k,v]) => `• -${fmt(v)} ${k}`).join('\n')}`)
  }

  // ── .heal ───────────────────────────────────────────────────────────────
  if (command === 'heal') {
    const qty = Math.max(1, parseInt(args[0]) || 1)
    const hpPer = 50
    if (user.potion < qty) return reply(`❌ Potion kamu cuma ${user.potion}!\nBeli potion: \`.beli potion ${qty}\``)
    if (user.health >= 1000) return reply('❤️ HP kamu sudah penuh!')
    const actualQty = Math.min(qty, Math.ceil((1000 - user.health) / hpPer))
    user.potion -= actualQty
    user.health = Math.min(1000, user.health + actualQty * hpPer)
    await db.updateUser(sender, { potion: user.potion, health: user.health })
    return reply(`💊 Berhasil heal *${actualQty}x potion*!\n❤️ HP: ${user.health}/1000\n🧪 Sisa potion: ${user.potion}`)
  }

  // ── .inventory / .bag ────────────────────────────────────────────────────
  if (command === 'inventory' || command === 'bag' || command === 'inv') {
    const tools = ['pickaxe', 'sword', 'fishingrod', 'armor']
    const mats  = ['wood', 'rock', 'iron', 'gold', 'diamond', 'emerald', 'string']
    const items = ['potion', 'umpan', 'petfood', 'makanan']
    const buah  = ['pisang', 'anggur', 'mangga', 'jeruk', 'apel']

    const section = (title, keys, icon) => {
      const lines = keys.filter(k => (user[k] || 0) > 0).map(k => `• ${k}: ${user[k]}`)
      return lines.length ? `${icon} *${title}*\n${lines.join('\n')}` : ''
    }

    const txt = [
      section('Tools', tools, '⚔️'),
      section('Material', mats, '🪨'),
      section('Item', items, '🎒'),
      section('Buah', buah, '🍎')
    ].filter(Boolean).join('\n\n')

    return reply(`🎒 *INVENTORY ${m.pushName}*\n\n${txt || 'Kosong...'}\n\n💰 Money: ${fmt(user.money)} | 🏦 Bank: ${fmt(user.bank)}`)
  }
}

module.exports = {
  command: ['shop', 'toko', 'beli', 'buy', 'upgrade', 'heal', 'inventory', 'bag', 'inv'],
  tags: ['rpg'],
  help: ['shop [kategori]', 'beli <item> [qty]', 'upgrade <item>', 'heal [qty]', 'inventory'],
  run: rpgShopHandler
}
