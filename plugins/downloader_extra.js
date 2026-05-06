const axios = require('axios');

module.exports = {
    name: 'downloader_extra',
    command: ['tiktoknukthy', 'hentaivid', 'weather', 'cuaca', 'twittervid', 'twdl', 'igvid'],
    category: 'downloader',
    desc: 'Fitur downloader tambahan & Cuaca',
    async run(LilyBot, m, { command, text, q, prefix, isRegistered, replydaftar, replyviex, mess }) {
        if (!isRegistered) return replydaftar();

        switch (command) {
            case 'weather':
            case 'cuaca': {
                if (!text) return m.reply(`Masukkan nama kota!\nContoh: *${prefix}${command} Jakarta*`);
                await m.reply(mess.wait);
                try {
                    const res = await axios.get(`https://api.siputzx.my.id/api/tools/weather?location=${encodeURIComponent(text)}`);
                    const d = res.data.data;
                    let cap = `🌤️ *INFO CUACA - ${d.location.name.toUpperCase()}*\n\n`;
                    cap += `📍 Wilayah: ${d.location.region}, ${d.location.country}\n`;
                    cap += `🌡️ Suhu: ${d.current.temp_c}°C (${d.current.condition.text})\n`;
                    cap += `💧 Kelembapan: ${d.current.humidity}%\n`;
                    cap += `💨 Angin: ${d.current.wind_kph} kph\n`;
                    cap += `📅 Update: ${d.current.last_updated}`;
                    await LilyBot.sendMessage(m.chat, { image: { url: 'https:' + d.current.condition.icon }, caption: cap }, { quoted: m });
                } catch (e) {
                    m.reply(`❌ Kota tidak ditemukan atau API sedang down.`);
                }
                break;
            }

            case 'twittervid':
            case 'twdl': {
                if (!q.includes('twitter.com') && !q.includes('x.com')) return m.reply(`Masukkan link Twitter/X!`);
                await m.reply(mess.wait);
                try {
                    const res = await axios.get(`https://api.siputzx.my.id/api/d/twitter?url=${q}`);
                    const vid = res.data.data[0].url; // Ambil kualitas pertama
                    await LilyBot.sendMessage(m.chat, { video: { url: vid }, caption: '✅ Twitter Video Downloader' }, { quoted: m });
                } catch (e) {
                    m.reply(`❌ Gagal mendownload video Twitter.`);
                }
                break;
            }

            case 'hentaivid': {
                await m.reply(mess.wait);
                try {
                    const res = await axios.get(`https://api.siputzx.my.id/api/nsfw/hentai`);
                    await LilyBot.sendMessage(m.chat, { video: { url: res.data.result.video_1 }, caption: '🔞 Hentai Video' }, { quoted: m });
                } catch (e) {
                    m.reply(`❌ Server sedang sibuk.`);
                }
                break;
            }

            case 'tiktoknukthy': {
                await m.reply(mess.wait);
                try {
                    const res = await axios.get(`https://api.siputzx.my.id/api/d/tiktok?url=https://www.tiktok.com/@nukthy/video/7311394149202169094`); // Contoh endpoint random tiktok
                    await LilyBot.sendMessage(m.chat, { video: { url: res.data.data.nowm }, caption: '✅ TikTok Nukthy' }, { quoted: m });
                } catch (e) {
                    m.reply(`❌ Gagal mengambil video.`);
                }
                break;
            }
        }
    }
}
