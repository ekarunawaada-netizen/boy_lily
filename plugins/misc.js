const axios = require('axios');

module.exports = {
    name: 'misc',
    command: [
        'hytamkan', 'tafsir', 'kodeqc', 'soulmate', 'listpem', 'pekerjaan', 'penyakit',
        'artimimpi', 'artinama', 'ramaljodoh', 'zodiak', 'shio'
    ],
    category: 'other',
    desc: 'Fitur pendukung (Misc & Primbon)',
    async run(DinzBotz, m, { command, text, q, prefix, isRegistered, replydaftar, replyviex, mess }) {
        if (!isRegistered) return replydaftar();

        switch (command) {
            case 'hytamkan': { // Efek Hitam Putih
                const quoted = m.quoted ? m.quoted : m
                if (!/image/.test(quoted.mtype)) return m.reply(`Reply gambar dengan caption ${prefix}${command}`)
                await m.reply(mess.wait)
                try {
                    const img = await quoted.download()
                    const { UploadFileUgu } = require('../lib/uploader')
                    const url = await UploadFileUgu(img)
                    const res = `https://api.siputzx.my.id/api/tools/filters?url=${url.url}&filter=grayscale`
                    await DinzBotz.sendMessage(m.chat, { image: { url: res }, caption: '✅ Efek Hitam Putih' }, { quoted: m })
                } catch (e) { m.reply('❌ Gagal memproses gambar.') }
                break;
            }

            case 'tafsir': {
                if (!text) return m.reply(`Masukkan mimpi yang ingin ditafsirkan!`)
                await m.reply(mess.wait)
                try {
                    const res = await axios.get(`https://api.siputzx.my.id/api/primbon/tafsir-mimpi?query=${encodeURIComponent(text)}`)
                    m.reply(`📖 *TAFSIR MIMPI*\n\n${res.data.data}`)
                } catch { m.reply('❌ Tafsir tidak ditemukan.') }
                break;
            }

            case 'soulmate': {
                if (!text) return m.reply(`Tag atau masukkan nama target!`)
                const target = m.mentionedJid[0] ? DinzBotz.getName(m.mentionedJid[0]) : text
                const percent = Math.floor(Math.random() * 100)
                m.reply(`❤️ *SOULMATE CHECK*\n\nKecocokan antara *${m.pushName}* dan *${target}* adalah:\n📊 *${percent}%*`)
                break;
            }

            case 'pekerjaan':
            case 'penyakit': {
                const res = ['Dokter', 'Guru', 'Programmer', 'Kuli', 'Presiden', 'Kang Bakso', 'Developer Bot'][Math.floor(Math.random() * 7)]
                const dis = ['Flu', 'Batuk', 'Pusing', 'Kangen', 'Dompet Kering'][Math.floor(Math.random() * 5)]
                m.reply(`🔮 *RAMALAN ${command.toUpperCase()}*\n\n${command === 'pekerjaan' ? 'Masa depanmu akan menjadi: ' + res : 'Penyakit yang perlu diwaspadai: ' + dis}`)
                break;
            }
            
            case 'zodiak': {
                if (!text) return m.reply(`Masukkan zodiakmu! (contoh: Aries)`)
                try {
                    const res = await axios.get(`https://api.siputzx.my.id/api/primbon/zodiak?query=${text}`)
                    m.reply(`♈ *ZODIAK ${text.toUpperCase()}*\n\n${res.data.data}`)
                } catch { m.reply('❌ Zodiak tidak valid.') }
                break;
            }

            case 'listpem': {
                const owner = JSON.parse(require('fs').readFileSync('./database/owner.json'))
                let cap = `👑 *DAFTAR PEMILIK (OWNER)*\n\n`
                owner.forEach((v, i) => { cap += `${i+1}. @${v}\n` })
                DinzBotz.sendMessage(m.chat, { text: cap, mentions: owner.map(v => v + '@s.whatsapp.net') }, { quoted: m })
                break;
            }
        }
    }
}
