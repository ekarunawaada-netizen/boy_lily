const axios = require('axios');
const googleIt = require('google-it');
const yts = require('youtube-yts');

module.exports = {
    name: 'search',
    command: ['google', 'yts', 'pinterest', 'kbbi', 'resep'],
    category: 'search',
    desc: 'Fitur pencarian informasi (Google, Pinterest, Youtube)',
    async run(LilyBot, m, { command, text, q, isRegistered, replydaftar, replyviex, fetchJson, mess, prefix }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦");
        }

        if (!text) return replyviex(`Kirim perintah ${prefix + command} query\nContoh: ${prefix + command} Minecraft`);

        await m.react('🔍');

        try {
            switch (command) {
                case 'google': {
                    await m.reply(mess.wait);
                    const results = await googleIt({ query: text });
                    let teks = `🔍 *GOOGLE SEARCH*\n\n`;
                    for (let i of results.slice(0, 5)) {
                        teks += `*Title:* ${i.title}\n*Link:* ${i.link}\n*Desc:* ${i.snippet}\n\n`;
                    }
                    replyviex(teks);
                    break;
                }
                case 'yts': {
                    await m.reply(mess.wait);
                    const search = await yts(text);
                    const results = search.videos;
                    let teks = `📺 *YOUTUBE SEARCH*\n\n`;
                    for (let i of results.slice(0, 5)) {
                        teks += `*Title:* ${i.title}\n*Views:* ${i.views}\n*Duration:* ${i.timestamp}\n*Link:* ${i.url}\n\n`;
                    }
                    replyviex(teks);
                    break;
                }
                case 'pinterest': {
                    await m.reply(mess.wait);
                    // Menggunakan API Siputzx yang lebih stabil daripada Lolhuman GataDios
                    const res = await fetchJson(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
                    if (!res?.data || res.data.length === 0) return replyviex("Gambar tidak ditemukan!");
                    await LilyBot.sendMessage(m.chat, { image: { url: res.data[0] }, caption: `Hasil pencarian: ${text}` }, { quoted: m });
                    break;
                }
                case 'kbbi': {
                    const res = await fetchJson(`https://api.siputzx.my.id/api/s/kbbi?kata=${encodeURIComponent(text)}`);
                    if (!res?.data) return replyviex("Kata tidak ditemukan di KBBI!");
                    replyviex(`📖 *KBBI*\n\n*Kata:* ${res.data.kata}\n*Arti:* ${res.data.arti}`);
                    break;
                }
                case 'resep': {
                    const res = await fetchJson(`https://api.siputzx.my.id/api/s/resepmasakan?query=${encodeURIComponent(text)}`);
                    if (!res?.data) return replyviex("Resep tidak ditemukan!");
                    replyviex(`🍳 *RESEP MASAKAN*\n\n*Judul:* ${res.data.judul}\n*Bahan:* ${res.data.bahan}\n*Cara:* ${res.data.cara}`);
                    break;
                }
            }
        } catch (e) {
            console.error(e);
            replyviex(`Gagal: ${e.message}`);
        }
    }
}
