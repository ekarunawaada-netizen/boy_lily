const axios = require('axios');

module.exports = {
    name: 'ai',
    command: ['ai', 'chatgpt', 'gemini', 'logic'],
    category: 'ai',
    desc: 'Fitur kecerdasan buatan (Artificial Intelligence)',
    async run(DinzBotz, m, { command, text, q, isRegistered, replydaftar, replyviex, mess }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦\n\nDENGAN DAFTAR KAMU BISA AKSES BOT SEPUASNYA\n\n💂‍♀: Kenapa harus daftar sih?\n🍁: Agar bot mengenal siapa anda\n💂‍♀: Ribet banget harus daftar segala\n🍁: Jika tidak daftar, Anda tidak bisa menggunakan fitur bot");
        }

        if (!text) return replyviex("Mau nanya apa sama Lily?");

        switch (command) {
            case 'ai':
            case 'chatgpt': {
                await m.reply(mess.wait);
                try {
                    let res = await axios.get(`https://api.lolhuman.xyz/api/openai?apikey=GataDios&text=${encodeURIComponent(text)}`);
                    replyviex(res.data.result);
                } catch (e) {
                    replyviex("Error: " + e.message);
                }
                break;
            }
            case 'gemini': {
                await m.reply(mess.wait);
                try {
                    let res = await axios.get(`https://api.lolhuman.xyz/api/gemini?apikey=GataDios&text=${encodeURIComponent(text)}`);
                    replyviex(res.data.result);
                } catch (e) {
                    replyviex("Error: " + e.message);
                }
                break;
            }
        }
    }
}
