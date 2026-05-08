module.exports = {
    name: 'profile',
    command: ['me', 'profile', 'profil', 'myinfo'],
    category: 'main',
    desc: 'Melihat profil pengguna bot',
    async run(LilyBot, m, { prefix, isOwner, DinzTheCreator, isPrem, sender, pushname }) {
        if (!global.db?.users) global.db.users = {}
        const user = global.db.users[sender] || { money: 0, exp: 0, limit: 20, level: 1, role: 'Beginner', afkTime: -1, afkReason: '' };

        // ── Role ────────────────────────────────────────────────────────────
        let roleLabel, roleBadge
        if (DinzTheCreator) { roleLabel = 'Developer';    roleBadge = '👨‍💻' }
        else if (isOwner)   { roleLabel = 'Owner';        roleBadge = '👑' }
        else if (isPrem)    { roleLabel = 'Premium';      roleBadge = '⭐' }
        else if ((user.level || 0) >= 999) { roleLabel = 'Elite'; roleBadge = '🔱' }
        else                { roleLabel = 'Free User';   roleBadge = '🎖️' }

        // ── Data ─────────────────────────────────────────────────────────────
        const name     = user.name || pushname || 'User'
        const age      = user.age > 0 ? `${user.age} thn` : '—'
        const level    = user.level || 0
        const exp      = user.exp || 0
        const xpNeeded = (level + 1) * 1000
        const health   = user.health || 0
        const money    = (user.money || 0).toLocaleString('id-ID')
        const bank     = (user.bank  || 0).toLocaleString('id-ID')
        const chip     = (user.chip  || 0).toLocaleString('id-ID')
        const limitTxt = (user.limit || 0) >= 999 ? '∞ Unlimited' : `${user.limit || 20}/hari`
        const status   = user.registered ? '✅ Aktif' : '❌ Belum Daftar'
        const regDate  = user.registeredAt && Number(user.registeredAt) > 0
                         ? new Date(Number(user.registeredAt)).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' })
                         : '—'

        // ── XP Bar ──────────────────────────────────────────────────────────
        // Developer/Owner level 100+ → tampilkan MASTERED
        let xpLine
        if (DinzTheCreator || isOwner) {
            xpLine = `│ ⭐ ᴇxᴘ    : ✨ MASTERED`
        } else {
            const pct    = Math.min(exp / xpNeeded, 1)
            const filled = Math.floor(pct * 10)
            const bar    = '█'.repeat(filled) + '▒'.repeat(10 - filled)
            xpLine = `│ ⭐ ᴇxᴘ    : ${exp.toLocaleString('id-ID')} / ${xpNeeded.toLocaleString('id-ID')}\n│ [${bar}] ${Math.floor(pct * 100)}%`
        }

        // ── HP Bar ──────────────────────────────────────────────────────────
        const hpPct    = Math.min(health / 1000, 1)
        const hpFilled = Math.floor(hpPct * 10)
        const hpColor  = hpPct > 0.6 ? '🟩' : hpPct > 0.3 ? '🟨' : '🟥'
        const hpBar    = hpColor.repeat(hpFilled) + '⬛'.repeat(10 - hpFilled)

        // ── Tools Quick View ────────────────────────────────────────────────
        const tools = [
            `⛏ Lv.${user.pickaxe  || 0}`,
            `⚔️ Lv.${user.sword    || 0}`,
            `🎣 Lv.${user.fishingrod || 0}`,
            `🛡 Lv.${user.armor    || 0}`,
        ].join('  ')

        // ── Build Caption ────────────────────────────────────────────────────
        const profileText =
`✦━━━━━『 *USER PROFILE* 』━━━━━✦

  ${roleBadge} *${name}* — *${roleLabel}*
  📅 Daftar: ${regDate}  |  🎂 Umur: ${age}

━━━━━『 *PROGRESS* 』━━━━━
│ 📊 ʟᴇᴠᴇʟ  : *${level}*
${xpLine}
│
│ ❤️ ʜᴘ     : *${health}/1000*
│ [${hpBar}] ${Math.floor(hpPct * 100)}%

━━━━━『 *EKONOMI* 』━━━━━
│ 💰 Money  : Rp *${money}*
│ 🏦 Bank   : Rp *${bank}*
│ 🎰 Chip   : *${chip}*
│ 🎫 Limit  : *${limitTxt}*

━━━━━『 *EQUIPMENT* 』━━━━━
│ ${tools}

━━━━━『 *STATUS* 』━━━━━
│ 📝 ${status}
✦━━━━━━━━━━━━━━━━━━━━━━━━━━━✦
${!user.registered ? '\n💡 Ketik *.daftar Nama.Umur* untuk mendaftar!' : ''}`

        // ── Kirim dengan foto profil ─────────────────────────────────────────
        try {
            let ppUrl
            try { ppUrl = await LilyBot.profilePictureUrl(sender, 'image') }
            catch { ppUrl = global.thumbnail || 'https://files.catbox.moe/yng1lr.jpg' }

            await LilyBot.sendMessage(m.chat, {
                image: { url: ppUrl },
                caption: profileText
            }, { quoted: m })
        } catch {
            m.reply(profileText)
        }
    }
}
