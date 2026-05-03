const axios = require('axios');

module.exports = {
    name: 'anime',
    alias: ['wibu', 'husbu', 'waifu'],
    category: 'anime',
    desc: 'Fitur untuk mencari gambar atau info anime',
    async run(DinzBotz, m, { command, mess, replyviex }) {
        await m.reply(mess.wait);

        try {
            if (command === 'waifu') {
                let res = await axios.get(`https://waifu.pics/api/sfw/waifu`);
                await DinzBotz.sendMessage(m.chat, { image: { url: res.data.url }, caption: mess.success }, { quoted: m });
            } 
            else if (command === 'husbu') {
                // Contoh implementasi API lain
                m.reply('Gambar husbu akan dikirim...');
            }
            else {
                m.reply('Fitur anime sedang dalam tahap migrasi ke sistem plugin.');
            }
        } catch (error) {
            console.error(error);
            m.reply('Terjadi kesalahan saat memproses permintaan.');
        }
    }
}
