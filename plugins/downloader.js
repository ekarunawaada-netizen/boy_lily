const axios = require('axios');
const { tiktokDl } = require('../scrape/scraper1'); 
const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = require('lily-baileys');

module.exports = {
    name: 'downloader',
    command: ['tiktok', 'tt', 'tiktokdl', 'igdl', 'igvideo', 'igimage', 'igvid', 'igimg'],
    category: 'downloader',
    desc: 'Download media dari Tiktok dan Instagram',
    async run(LilyBot, m, { command, args, text, q, prefix, mess, replyviex, fetchJson }) {
        if (!text || !text.startsWith("http")) return replyviex(`Contoh: ${prefix}${command} https://...`);
        
        await m.reply(mess.wait);
        
        try {
            if (['igdl', 'igvideo', 'igimage', 'igvid', 'igimg'].includes(command)) {
                await m.react('⏱️');
                // Menggunakan API Siputzx yang lebih stabil daripada endpoint.web.id
                let res = await fetchJson(`https://api.siputzx.my.id/api/d/instagram?url=${encodeURIComponent(text)}`);
                if (!res?.data || res.data.length === 0) return replyviex("Media tidak ditemukan!");
                
                for (let item of res.data) {
                    if (item.url.includes('.mp4')) {
                        await LilyBot.sendMessage(m.chat, { video: { url: item.url }, caption: "Success download IG video" }, { quoted: m });
                    } else {
                        await LilyBot.sendMessage(m.chat, { image: { url: item.url }, caption: "Success download IG image" }, { quoted: m });
                    }
                }
                await m.react('✅');
                return;
            }

            if (['tiktok', 'tt', 'tiktokdl'].includes(command)) {
                await m.react('🕖');
                // Menggunakan API Siputzx sebagai fallback jika scraper lokal gagal
                try {
                    let res = await fetchJson(`https://api.siputzx.my.id/api/d/tiktok?url=${encodeURIComponent(text)}`);
                    if (res?.data?.nowm) {
                        await LilyBot.sendMessage(m.chat, { video: { url: res.data.nowm }, caption: "✅ TikTok Video Downloader" }, { quoted: m });
                        await m.react('✅');
                        return;
                    }
                } catch (e) {
                    console.log('Siputzx TikTok fail, trying local scraper...');
                }

                // Fallback to local scraper if exists
                if (typeof tiktokDl === 'function') {
                    const result = await tiktokDl(q);
                    if (result.status) {
                        let urlVid = result.data.find(e => e.type == "nowatermark_hd" || e.type == "nowatermark");
                        if (urlVid) {
                            await LilyBot.sendMessage(m.chat, { video: { url: urlVid.url }, caption: "✅ TikTok Downloader" }, { quoted: m });
                            await m.react('✅');
                            return;
                        }
                    }
                }
                
                replyviex("Gagal mendownload TikTok. Link mungkin tidak valid atau server down.");
            }
        } catch (error) {
            console.error(error);
            m.reply('Terjadi kesalahan saat memproses permintaan: ' + error.message);
        }
    }
}
