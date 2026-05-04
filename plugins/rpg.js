'use strict'
const db = require('../lib/db')

// ── Helpers ──────────────────────────────────────────────────────────────────
function clock(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
function rng(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function fmt(n) { return Number(n).toLocaleString('id-ID') }

// ── Handler Utama ─────────────────────────────────────────────────────────────
async function rpgHandler(DinzBotz, m, { prefix, command, args, q }) {
  const reply = t => m.reply(t)
  const sender = m.sender
  const grpOnly = () => { if (!m.isGroup) { reply('Perintah ini hanya bisa digunakan di dalam grup!'); return true } return false }

  // Ambil user dari MongoDB (via db.js)
  let user = await db.getUser(sender)

  // ── .profile ─────────────────────────────────────────────────────────────
  if (command === 'profile' || command === 'profil') {
    const xpNeeded = (user.level + 1) * 1000
    const xpBar = (() => {
      const filled = Math.floor((user.exp / xpNeeded) * 10)
      return '█'.repeat(Math.min(filled, 10)) + '▒'.repeat(Math.max(10 - filled, 0))
    })()
    const hpBar = (() => {
      const filled = Math.floor((user.health / 1000) * 10)
      return '❤'.repeat(Math.min(filled, 10)) + '🖤'.repeat(Math.max(10 - filled, 0))
    })()
    return reply(`╔══『 *PROFIL RPG* 』══╗
│ 👤 ${user.registered ? user.name : m.pushName || 'User'}
│ 🏅 Level: ${user.level}  |  ⭐ XP: ${fmt(user.exp)}/${fmt(xpNeeded)}
│ [${xpBar}]
│ 
│ ❤️ HP: ${user.health}/1000
│ [${hpBar}]
│ 
│ 💰 Money: ${fmt(user.money)}
│ 🏦 Bank: ${fmt(user.bank)}
│ 🎰 Chip: ${fmt(user.chip)}
│ 💎 Diamond: ${user.diamond}  |  🥇 Gold: ${user.gold}
│ 
│ ⛏ Pickaxe: Lv.${user.pickaxe}  |  ⚔️ Sword: Lv.${user.sword}
│ 🎣 Fishingrod: Lv.${user.fishingrod}  |  🛡 Armor: Lv.${user.armor}
╚══════════════════╝`)
  }

  // ── .bankcek ─────────────────────────────────────────────────────────────
  if (command === 'bankcek') {
    if (grpOnly()) return
    return reply(`╔══『 *BANK CEK* 』══╗
│ 👤 ${user.registered ? user.name : m.pushName}
│ 💰 Money : ${fmt(user.money)}
│ 🏦 Bank  : ${fmt(user.bank)} / ${fmt(user.fullatm)}
│ 🎰 Chip  : ${fmt(user.chip)}
│ 🏧 ATM   : ${user.atm > 0 ? 'Level ' + user.atm : '❌'}
╚═══════════════════╝`)
  }

  // ── .nabung ──────────────────────────────────────────────────────────────
  if (command === 'nabung' || command === 'deposit') {
    if (grpOnly()) return
    if (user.atm === 0) return reply('❌ Kamu belum punya ATM! Beli dulu dengan `.beli atm`')
    const amount = /all/i.test(args[0]) ? user.money : parseInt(args[0])
    if (!amount || isNaN(amount) || amount < 1) return reply(`Contoh: \`${prefix}nabung 50000\` atau \`${prefix}nabung all\``)
    if (user.money < amount) return reply('❌ Uangmu tidak cukup!')
    if (user.bank >= user.fullatm) return reply('❌ Bank kamu sudah penuh!')
    const actual = Math.min(amount, user.fullatm - user.bank)
    user.money -= actual
    user.bank += actual
    await db.updateUser(sender, { money: user.money, bank: user.bank })
    return reply(`✅ Berhasil menabung *${fmt(actual)} 💰* ke bank!\n🏦 Saldo Bank: ${fmt(user.bank)}/${fmt(user.fullatm)}`)
  }

  // ── .tarik ───────────────────────────────────────────────────────────────
  if (command === 'tarik' || command === 'withdraw') {
    if (grpOnly()) return
    if (user.atm === 0) return reply('❌ Kamu belum punya ATM!')
    const amount = /all/i.test(args[0]) ? user.bank : parseInt(args[0])
    if (!amount || isNaN(amount) || amount < 1) return reply(`Contoh: \`${prefix}tarik 50000\``)
    if (user.bank < amount) return reply('❌ Saldo bank tidak cukup!')
    user.money += amount
    user.bank -= amount
    await db.updateUser(sender, { money: user.money, bank: user.bank })
    return reply(`✅ Berhasil menarik *${fmt(amount)} 💰* dari bank!`)
  }

  // ── .transfer ────────────────────────────────────────────────────────────
  if (command === 'transfer' || command === 'kirim') {
    if (grpOnly()) return
    const target = m.mentionedJid?.[0] || m.quoted?.sender
    if (!target) return reply('Tag/reply user yang mau kamu kirimi uang!')
    const amount = parseInt(args[1] || args[0])
    if (!amount || isNaN(amount) || amount < 1000) return reply('Minimal transfer 1.000 💰')
    if (user.money < amount) return reply('❌ Uangmu tidak cukup!')
    const targetUser = await db.getUser(target)
    user.money -= amount
    targetUser.money += amount
    await db.updateUser(sender, { money: user.money })
    await db.updateUser(target, { money: targetUser.money })
    return reply(`✅ Berhasil mengirim *${fmt(amount)} 💰* ke @${target.split('@')[0]}`)
  }

  // ── .rampok ──────────────────────────────────────────────────────────────
  if (command === 'rampok' || command === 'merampok') {
    if (grpOnly()) return
    const target = m.mentionedJid?.[0] || m.quoted?.sender
    if (!target) return reply('❌ Tag orang yang mau kamu rampok!')
    if (target === sender) return reply('❌ Tidak bisa merampok diri sendiri!')
    const targetUser = await db.getUser(target)
    if (!targetUser) return reply('❌ User tidak ada di database.')
    if (targetUser.level > user.level) return reply(`❌ Level kamu harus lebih tinggi dari target!`)
    if (targetUser.money < 10000) return reply('❌ Target tidak punya cukup uang.')
    const now = Date.now()
    const cooldown = 3600000 // 1 jam
    if (now - user.lastrampok < cooldown) return reply(`⏳ Tunggu ${clock(cooldown - (now - user.lastrampok))} untuk merampok lagi.`)
    const dapat = rng(5000, Math.min(100000, Math.floor(targetUser.money * 0.1)))
    targetUser.money -= dapat
    user.money += dapat
    user.lastrampok = now
    await db.updateUser(sender, { money: user.money, lastrampok: user.lastrampok })
    await db.updateUser(target, { money: targetUser.money })
    return reply(`🦹 Berhasil merampok @${target.split('@')[0]}!\n💰 Kamu mendapat: ${fmt(dapat)}`)
  }

  // ── .bet ─────────────────────────────────────────────────────────────────
  if (command === 'bet') {
    if (grpOnly()) return
    const type = (args[0] || '').toLowerCase()
    if (!['money', 'chip'].includes(type)) return reply(`Gunakan: \`.bet money <jumlah>\` atau \`.bet chip <jumlah>\``)
    const amount = /all/i.test(args[1]) ? user[type] : parseInt(args[1])
    if (!amount || isNaN(amount) || amount < 1) return reply('Masukkan jumlah yang valid.')
    if (user[type] < amount) return reply(`❌ ${type} kamu tidak cukup!`)
    const bot = rng(1, 100)
    const kamu = rng(1, 100)
    let hasil, status
    if (kamu > bot) { user[type] += amount; status = 'Menang'; hasil = `+${fmt(amount)}` }
    else if (kamu < bot) { user[type] -= amount; status = 'Kalah'; hasil = `-${fmt(amount)}` }
    else { user[type] += Math.floor(amount / 2); status = 'Seri'; hasil = `+${fmt(Math.floor(amount / 2))}` }
    await db.updateUser(sender, { [type]: user[type] })
    return reply(`🎲 *BETTING*\n🤖 Bot: ${bot}  |  👤 Kamu: ${kamu}\n\nStatus: *${status}* (${hasil} ${type})`)
  }

  // ── .claim / .bonus ───────────────────────────────────────────────────────
  if (command === 'claim' || command === 'bonus') {
    if (grpOnly()) return
    const now = Date.now()
    const cd = 86400000 // 24 jam
    if (now - user.lastclaim < cd) return reply(`⏳ Sudah claim hari ini!\nTunggu ${clock(cd - (now - user.lastclaim))} lagi.`)
    // Reward berdasarkan level
    const money = rng(50000, 200000) + (user.level * 10000)
    const exp = rng(100, 500)
    user.money += money
    user.exp += exp
    user.lastclaim = now
    // Cek level up
    const xpNeeded = (user.level + 1) * 1000
    if (user.exp >= xpNeeded) { user.level += 1; user.exp -= xpNeeded }
    await db.updateUser(sender, { money: user.money, exp: user.exp, level: user.level, lastclaim: user.lastclaim })
    return reply(`🎁 *DAILY CLAIM*\n💰 +${fmt(money)} Money\n⭐ +${exp} XP\n\nTotal Money: ${fmt(user.money)}`)
  }

  // ── .bansos ───────────────────────────────────────────────────────────────
  if (command === 'bansos') {
    if (grpOnly()) return
    const now = Date.now()
    const cd = 300000 // 5 menit
    if (now - user.lastbansos < cd) return reply(`⏳ Tunggu ${clock(cd - (now - user.lastbansos))} untuk bansos lagi.`)
    if (user.money < 1000) return reply('❌ Uang kamu harus diatas 1.000 untuk ikut bansos.')
    const roll = rng(1, 100)
    user.lastbansos = now
    let msg
    if (roll > 60) {
      const denda = rng(500000, 2000000)
      user.money -= denda
      msg = `🚔 Tertangkap korupsi bansos! Denda: -${fmt(denda)} 💰`
    } else if (roll < 40) {
      const gain = rng(500000, 2000000)
      user.money += gain
      msg = `🤑 Berhasil korupsi dana bansos!\n💰 Dapat: +${fmt(gain)}`
    } else {
      msg = `🏃 Kamu melarikan diri dari sidak bansos, tidak rugi tidak untung.`
    }
    await db.updateUser(sender, { money: user.money, lastbansos: user.lastbansos })
    return reply(msg)
  }
}

// ── Export Plugin ─────────────────────────────────────────────────────────────
module.exports = {
  command: ['profile', 'profil', 'bankcek', 'nabung', 'deposit', 'tarik', 'withdraw',
            'transfer', 'kirim', 'rampok', 'merampok', 'bet', 'claim', 'bonus', 'bansos'],
  tags: ['rpg'],
  help: ['profile', 'bankcek', 'nabung', 'tarik', 'transfer', 'rampok', 'bet', 'claim', 'bansos'],
  run: rpgHandler
}
