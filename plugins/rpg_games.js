const mongoDb = require('../lib/db')

// Helper untuk format waktu
function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

// Data Monster untuk Fight
const MONSTERS = {
    kucing:  { name: 'Kucing Garong', hp: 100,  reward: 5000,   exp: 100,  reqLevel: 0 },
    naga:    { name: 'Naga Purba',   hp: 5000, reward: 500000, exp: 5000, reqLevel: 50 },
    phonix:  { name: 'Phoenix',      hp: 2000, reward: 200000, exp: 2000, reqLevel: 30 },
    griffin: { name: 'Griffin',      hp: 1500, reward: 150000, exp: 1500, reqLevel: 25 },
    kyubi:   { name: 'Kyubi (Rubah)', hp: 3000, reward: 300000, exp: 3000, reqLevel: 40 },
    centaur: { name: 'Centaur',      hp: 1000, reward: 100000, exp: 1000, reqLevel: 20 }
}

module.exports = {
    name: 'rpg_games',
    command: [
        'fightnaga', 'fightkucing', 'fightphonix', 'fightgriffin', 'fightkyubi', 'fightcentaur',
        'mancing', 'mulung', 'ojek', 'polisi', 'berdagang', 'maling', 'rob', 'casino', 'slot'
    ],
    category: 'rpg',
    desc: 'Fitur tambahan RPG Games & Activities',
    async run(DinzBotz, m, { command, args, prefix, isRegistered, replydaftar, sender, pushname }) {
        if (!isRegistered) return replydaftar()

        const user = await mongoDb.getUser(sender)
        const now = Date.now()

        // ─── [1] FIGHT SYSTEM ──────────────────────────────────────────────────
        if (command.startsWith('fight')) {
            const monsterKey = command.replace('fight', '')
            const monster = MONSTERS[monsterKey]
            if (!monster) return m.reply(`Monster tidak ditemukan!`)

            if (user.level < monster.reqLevel) return m.reply(`⚠️ Level kamu tidak cukup! Minimal level ${monster.reqLevel} untuk melawan ${monster.name}`)
            if (user.health < 100) return m.reply(`⚠️ Darah kamu terlalu rendah (${user.health}). Sembuhkan diri dulu dengan *.heal*!`)
            
            const cd = 1 * 60 * 1000 // 1 menit cooldown
            if (now - (user.lastfight || 0) < cd) {
                return m.reply(`🕒 Kamu masih lelah setelah bertarung! Tunggu selama ${clockString(cd - (now - user.lastfight))} lagi.`)
            }

            // Logic Pertarungan (Simulasi)
            const userPower = (user.level * 10) + (user.sword * 50)
            const damageToMonster = Math.floor(Math.random() * userPower) + 50
            const damageToUser = Math.floor(Math.random() * (monster.hp / 10))

            let resultMsg = `⚔️ *BATTLE VS ${monster.name.toUpperCase()}*\n\n`
            resultMsg += `💥 Kamu menyerang dengan kekuatan ${damageToMonster}!\n`
            resultMsg += `🩸 ${monster.name} menyerang balik dan kamu terluka ${damageToUser} HP!\n\n`

            user.health -= damageToUser
            user.lastfight = now

            if (damageToMonster >= monster.hp / 2) { // 50% chance win based on dmg
                user.money += monster.reward
                user.exp += monster.exp
                resultMsg += `🏆 *MENANG!* Kamu berhasil mengalahkan ${monster.name}!\n🎁 Hadiah: Rp ${monster.reward.toLocaleString()} & +${monster.exp} XP`
            } else {
                resultMsg += `💀 *KALAH!* ${monster.name} terlalu kuat. Kamu terpaksa melarikan diri.`
            }

            await mongoDb.updateUser(sender, user)
            return m.reply(resultMsg)
        }

        // ─── [2] ACTIVITIES ────────────────────────────────────────────────────
        const activities = {
            mancing:   { msg: '🎣 Kamu pergi memancing di danau...', cd: 5*60*1000, reward: 5000, xp: 50 },
            mulung:    { msg: '📦 Kamu berkeliling mencari barang bekas...', cd: 2*60*1000, reward: 2000, xp: 20 },
            ojek:      { msg: '🏍️ Kamu narik ojek keliling kota...', cd: 3*60*1000, reward: 8000, xp: 80 },
            polisi:    { msg: '👮 Kamu berpatroli menjaga keamanan...', cd: 10*60*1000, reward: 25000, xp: 200 },
            berdagang: { msg: '🏪 Kamu membuka lapak dagangan...', cd: 15*60*1000, reward: 40000, xp: 300 }
        }

        if (activities[command]) {
            const act = activities[command]
            if (now - (user[`last${command}`] || 0) < act.cd) {
                return m.reply(`🕒 Kamu sedang lelah! Tunggu ${clockString(act.cd - (now - user[`last${command}`]))} lagi.`)
            }

            const bonus = user.level * 100
            const totalReward = act.reward + bonus
            
            user.money += totalReward
            user.exp += act.xp
            user[`last${command}`] = now

            await mongoDb.updateUser(sender, user)
            return m.reply(`${act.msg}\n\n✅ Selesai! Kamu mendapatkan:\n💰 Money: Rp ${totalReward.toLocaleString()} (Bonus Level included)\n✨ XP: +${act.xp}`)
        }

        // ─── [3] CRIME / GAMBLING ──────────────────────────────────────────────
        if (command === 'maling' || command === 'rob') {
            const cd = 30 * 60 * 1000 // 30 menit
            if (now - (user.lastrob || 0) < cd) {
                return m.reply(`🕒 Polisi masih mencarimu! Sembunyi dulu selama ${clockString(cd - (now - user.lastrob))} lagi.`)
            }

            const success = Math.random() > 0.6 // 40% chance success
            user.lastrob = now

            if (success) {
                const stolen = Math.floor(Math.random() * 50000) + 10000
                user.money += stolen
                await mongoDb.updateUser(sender, user)
                return m.reply(`🥷 *SUKSES!* Kamu berhasil merampok toko kelontong dan mendapatkan Rp ${stolen.toLocaleString()}!`)
            } else {
                const fine = 15000
                user.money = Math.max(0, user.money - fine)
                await mongoDb.updateUser(sender, user)
                return m.reply(`🚔 *TERCIDUK!* Kamu tertangkap polisi saat beraksi. Kamu didenda Rp ${fine.toLocaleString()} dan uangmu disita!`)
            }
        }

        if (command === 'casino' || command === 'slot') {
            const bet = parseInt(args[0])
            if (!bet || isNaN(bet) || bet <= 0) return m.reply(`Format salah!\nContoh: *${prefix}${command} 10000*`)
            if (user.money < bet) return m.reply(`⚠️ Uang kamu tidak cukup untuk taruhan ini!`)

            const emojis = ['🍎', '💎', '🎰', '🔔', '🍋']
            const a = emojis[Math.floor(Math.random() * emojis.length)]
            const b = emojis[Math.floor(Math.random() * emojis.length)]
            const c = emojis[Math.floor(Math.random() * emojis.length)]

            let msg = `🎰 *CASINO SLOT* 🎰\n\n`
            msg += `     [ ${a} | ${b} | ${c} ]\n\n`

            if (a === b && b === c) {
                const win = bet * 10
                user.money += win
                msg += `🎉 *JACKPOT!!!* Kamu menang Rp ${win.toLocaleString()}! (10x lipat)`
            } else if (a === b || b === c || a === c) {
                const win = Math.floor(bet * 1.5)
                user.money += win
                msg += `✨ *MENANG!* Ada yang kembar. Kamu dapat Rp ${win.toLocaleString()}!`
            } else {
                user.money -= bet
                msg += `❌ *KALAH!* Coba lagi ya kak, jangan menyerah!`
            }

            await mongoDb.updateUser(sender, user)
            return m.reply(msg)
        }
    }
}
