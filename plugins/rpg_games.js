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
    kucing: { name: 'Kucing Garong', hp: 100, reward: 5000, exp: 100, reqLevel: 0 },
    naga: { name: 'Naga Purba', hp: 5000, reward: 500000, exp: 5000, reqLevel: 50 },
    phonix: { name: 'Phoenix', hp: 2000, reward: 200000, exp: 2000, reqLevel: 30 },
    griffin: { name: 'Griffin', hp: 1500, reward: 150000, exp: 1500, reqLevel: 25 },
    kyubi: { name: 'Kyubi (Rubah)', hp: 3000, reward: 300000, exp: 3000, reqLevel: 40 },
    centaur: { name: 'Centaur', hp: 1000, reward: 100000, exp: 1000, reqLevel: 20 }
}

module.exports = {
    name: 'rpg_games',
    command: [
        'fightnaga', 'fightkucing', 'fightphonix', 'fightgriffin', 'fightkyubi', 'fightcentaur',
        'mancing', 'mulung', 'ojek', 'polisi', 'berdagang', 'maling', 'rob', 'casino', 'slot',
        'mining', 'nebang', 'craft', 'heal', 'inforpg', 'judi', 'suit', 'roulette'
    ],
    category: 'rpg',
    desc: 'Fitur tambahan RPG Games & Activities',
    async run(DinzBotz, m, { command, args, prefix, isRegistered, replydaftar, sender, pushname }) {
        if (!isRegistered) return replydaftar()

        const user = await mongoDb.getUser(sender)
        const now = Date.now()

        // ─── [INFO RPG] ────────────────────────────────────────────────────────
        if (command === 'inforpg') {
            let info = `🎮 *TUTORIAL LILY-RPG* 🎮\n\n`
            info += `👋 Halo *${pushname}*! Ini adalah panduan singkat bermain RPG di LilyMD:\n\n`
            info += `🛡️ *TUJUAN UTAMA:* Menjadi pemain terkuat dengan Level 100 dan mengoleksi perlengkapan (Sword & Armor) tingkat tinggi untuk mengalahkan Naga Purba!\n\n`
            info += `📈 *CARA BERMAIN:*\n`
            info += `1. *Cari Bahan:* Gunakan \`.mining\` (batu/besi) atau \`.nebang\` (kayu) untuk mencari bahan baku.\n`
            info += `2. *Cari Uang:* Lakukan aktivitas harian seperti \`.mulung\`, \`.mancing\`, atau \`.ojek\`.\n`
            info += `3. *Crafting:* Gunakan bahan yang kamu punya untuk membuat senjata dengan \`.craft sword\` atau \`.craft armor\`.\n`
            info += `4. *Battle:* Jika sudah kuat, lawan monster dengan \`.fightkucing\` hingga \`.fightnaga\` untuk XP & Money melimpah!\n\n`
            info += `✨ *LEVELING:* Setiap kegiatan memberikan XP. Semakin tinggi Level, hadiah uang dari kerja harian akan semakin besar (Bonus Level).\n\n`
            info += `🏥 *HEAL:* Darah berkurang saat kalah bertarung atau kerja berat. Gunakan \`.heal\` untuk memulihkan darah (biaya Rp 5.000).\n\n`
            info += `🔥 *Ketik .menu untuk melihat semua command RPG!*`
            return m.reply(info)
        }

        // ─── [HEAL SYSTEM] ─────────────────────────────────────────────────────
        if (command === 'heal') {
            if (user.health >= 1000) return m.reply(`❤️ Darah kamu sudah penuh!`)
            if (user.money < 5000) return m.reply(`💰 Uang kamu tidak cukup (Butuh Rp 5.000) untuk berobat.`)

            user.money -= 5000
            user.health = 1000
            await mongoDb.updateUser(sender, user)
            return m.reply(`🏥 Kamu telah berobat. Darah sekarang penuh (1000 HP).`)
        }

        // ─── [MINING & NEBANG] ──────────────────────────────────────────────────
        if (command === 'mining') {
            const cd = 5 * 60 * 1000
            if (now - (user.lastmining || 0) < cd) return m.reply(`🕒 Kamu lelah menambang! Tunggu ${clockString(cd - (now - user.lastmining))} lagi.`)

            const rock = Math.floor(Math.random() * 10) + 5
            const iron = Math.floor(Math.random() * 5) + 1
            const gold = Math.random() > 0.8 ? 1 : 0

            user.rock = (user.rock || 0) + rock
            user.iron = (user.iron || 0) + iron
            user.gold = (user.gold || 0) + gold
            user.exp += 50
            user.lastmining = now

            await mongoDb.updateUser(sender, user)
            return m.reply(`⛏️ Kamu pergi ke tambang...\n\n📦 Hasil tambang:\n🪨 Rock: +${rock}\n⛓️ Iron: +${iron}\n🪙 Gold: +${gold}\n✨ XP: +50`)
        }

        if (command === 'nebang') {
            const cd = 5 * 60 * 1000
            if (now - (user.lastnebang || 0) < cd) return m.reply(`🕒 Kamu lelah menebang pohon! Tunggu ${clockString(cd - (now - user.lastnebang))} lagi.`)

            const wood = Math.floor(Math.random() * 15) + 5
            user.wood = (user.wood || 0) + wood
            user.exp += 40
            user.lastnebang = now

            await mongoDb.updateUser(sender, user)
            return m.reply(`🪓 Kamu pergi ke hutan...\n\n📦 Hasil tebangan:\n🪵 Wood: +${wood}\n✨ XP: +40`)
        }

        // ─── [CRAFTING SYSTEM] ─────────────────────────────────────────────────
        if (command === 'craft') {
            const type = args[0]?.toLowerCase()
            if (!type) return m.reply(`Contoh: *.craft sword* atau *.craft armor*`)

            if (type === 'sword') {
                if (user.wood < 20 || user.iron < 10) return m.reply(`⚠️ Bahan tidak cukup!\nButuh: 🪵 20 Wood & ⛓️ 10 Iron.\nPunya: 🪵 ${user.wood} Wood & ⛓️ ${user.iron} Iron.`)
                user.wood -= 20
                user.iron -= 10
                user.sword = (user.sword || 1) + 1
                await mongoDb.updateUser(sender, user)
                return m.reply(`⚔️ *CRAFTING SUKSES!* Senjata kamu sekarang Level *${user.sword}*.\nSerangan ke monster akan semakin kuat!`)
            }

            if (type === 'armor') {
                if (user.iron < 20 || user.gold < 2) return m.reply(`⚠️ Bahan tidak cukup!\nButuh: ⛓️ 20 Iron & 🪙 2 Gold.\nPunya: ⛓️ ${user.iron} Iron & 🪙 ${user.gold} Gold.`)
                user.iron -= 20
                user.gold -= 2
                user.armor = (user.armor || 1) + 1
                await mongoDb.updateUser(sender, user)
                return m.reply(`🥼 *CRAFTING SUKSES!* Armor kamu sekarang Level *${user.armor}*.\nDarah yang berkurang saat bertarung akan lebih sedikit!`)
            }

            return m.reply(`Item tidak dikenal. Pilih: *sword* atau *armor*.`)
        }

        // ─── [FIGHT SYSTEM UPDATED] ─────────────────────────────────────────────
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

            // Logic Pertarungan dengan Pengaruh Armor & Sword
            const userPower = (user.level * 10) + (user.sword * 100) // Sword berpengaruh besar ke attack
            const monsterDefense = monster.hp / 5
            const damageToMonster = Math.floor(Math.random() * userPower) + 50

            // Armor mengurangi damage yang diterima (semakin tinggi armor, damage semakin kecil)
            const rawDamageToUser = Math.floor(Math.random() * (monster.hp / 15))
            const damageToUser = Math.max(5, rawDamageToUser - (user.armor * 10))

            let resultMsg = `⚔️ *BATTLE VS ${monster.name.toUpperCase()}*\n\n`
            resultMsg += `💥 Kamu menyerang dengan kekuatan ${damageToMonster}!\n`
            resultMsg += `🩸 ${monster.name} menyerang balik. (Armor Level ${user.armor} menahan damage!)\n`
            resultMsg += `❤️ Darahmu berkurang ${damageToUser} HP!\n\n`

            user.health -= damageToUser
            user.lastfight = now

            if (damageToMonster >= monsterDefense) { // Menang jika attack > defense monster
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
            mancing: { msg: '🎣 Kamu pergi memancing di danau...', cd: 5 * 60 * 1000, reward: 5000, xp: 50 },
            mulung: { msg: '📦 Kamu berkeliling mencari barang bekas...', cd: 2 * 60 * 1000, reward: 2000, xp: 20 },
            ojek: { msg: '🏍️ Kamu narik ojek keliling kota...', cd: 3 * 60 * 1000, reward: 8000, xp: 80 },
            polisi: { msg: '👮 Kamu berpatroli menjaga keamanan...', cd: 10 * 60 * 1000, reward: 25000, xp: 200 },
            berdagang: { msg: '🏪 Kamu membuka lapak dagangan...', cd: 15 * 60 * 1000, reward: 40000, xp: 300 }
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

        // ─── [3] CRIME & GAMBLING ──────────────────────────────────────────────
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

        // ─── [GAMBLING SUITE] ──────────────────────────────────────────────────
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

        if (command === 'judi') {
            const bet = parseInt(args[0])
            if (!bet || isNaN(bet) || bet <= 0) return m.reply(`Format salah!\nContoh: *${prefix}judi 50000*`)
            if (user.money < bet) return m.reply(`⚠️ Uang kamu tidak cukup untuk judi ini!`)

            const win = Math.random() > 0.55 // 45% chance win
            if (win) {
                user.money += bet
                await mongoDb.updateUser(sender, user)
                return m.reply(`🎰 *JUDI SUKSES!* Kamu menang Rp ${bet.toLocaleString()}!\n💰 Total Uang: Rp ${user.money.toLocaleString()}`)
            } else {
                user.money -= bet
                await mongoDb.updateUser(sender, user)
                return m.reply(`💸 *JUDI GAGAL!* Kamu kalah Rp ${bet.toLocaleString()}!\n💰 Sisa Uang: Rp ${user.money.toLocaleString()}`)
            }
        }

        if (command === 'suit') {
            const choices = ['batu', 'gunting', 'kertas']
            const userChoice = args[0]?.toLowerCase()
            const bet = parseInt(args[1])

            if (!userChoice || !choices.includes(userChoice) || !bet || isNaN(bet)) {
                return m.reply(`Format salah!\nContoh: *${prefix}suit batu 10000*`)
            }
            if (user.money < bet) return m.reply(`⚠️ Uang kamu tidak cukup!`)

            const botChoice = choices[Math.floor(Math.random() * choices.length)]
            let result = ''
            let status = ''

            if (userChoice === botChoice) {
                status = 'SERI'
                result = `🤝 Pertandingan seri! Uangmu aman.`
            } else if (
                (userChoice === 'batu' && botChoice === 'gunting') ||
                (userChoice === 'gunting' && botChoice === 'kertas') ||
                (userChoice === 'kertas' && botChoice === 'batu')
            ) {
                status = 'MENANG'
                user.money += bet
                result = `🎉 Kamu menang Rp ${bet.toLocaleString()}!`
            } else {
                status = 'KALAH'
                user.money -= bet
                result = `❌ Kamu kalah Rp ${bet.toLocaleString()}!`
            }

            await mongoDb.updateUser(sender, user)
            return m.reply(`🎮 *SUIT GAMES* 🎮\n\n👤 Kamu: ${userChoice}\n🤖 Lily: ${botChoice}\n\n🏆 Hasil: *${status}*\n${result}\n💰 Total Uang: Rp ${user.money.toLocaleString()}`)
        }

        if (command === 'roulette') {
            const colors = ['red', 'black', 'green']
            const userColor = args[0]?.toLowerCase()
            const bet = parseInt(args[1])

            if (!userColor || !colors.includes(userColor) || !bet || isNaN(bet)) {
                return m.reply(`Format salah!\nContoh: *${prefix}roulette red 10000*\n(Warna: red, black, green)`)
            }
            if (user.money < bet) return m.reply(`⚠️ Uang kamu tidak cukup!`)

            const random = Math.floor(Math.random() * 37)
            let botColor = ''
            if (random === 0) botColor = 'green'
            else if (random % 2 === 0) botColor = 'red'
            else botColor = 'black'

            let msg = `🎡 *ROULETTE* 🎡\n\n`
            msg += `📍 Bola mendarat di: *${botColor.toUpperCase()}*\n\n`

            if (userColor === botColor) {
                const multiplier = botColor === 'green' ? 14 : 2
                const win = bet * multiplier
                user.money += (win - bet)
                msg += `🎉 *MENANG!* Kamu mendapatkan Rp ${win.toLocaleString()}! (${multiplier}x)`
            } else {
                user.money -= bet
                msg += `❌ *KALAH!* Kehilangan Rp ${bet.toLocaleString()}.`
            }

            await mongoDb.updateUser(sender, user)
            return m.reply(msg)
        }
    }
}
