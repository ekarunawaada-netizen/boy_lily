const axios = require('axios');

module.exports = {
    name: 'ai',
    command: ['ai', 'chatgpt', 'gemini', 'logic'],
    category: 'ai',
    desc: 'Fitur kecerdasan buatan (Artificial Intelligence)',
    async run(LilyBot, m, { command, text, q, isRegistered, replydaftar, replyviex, mess }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦");
        }

        if (!text) return replyviex("Mau nanya apa sama Lily?");

        await m.react('🤖');

        try {
            switch (command) {
                case 'ai':
                case 'chatgpt': {
                    await m.reply(mess.wait);
                    let res = await axios.get(`https://api.siputzx.my.id/api/ai/gpt4?content=${encodeURIComponent(text)}`);
                    if (res.data.status) {
                        replyviex(res.data.result || res.data.data);
                    } else {
                        throw new Error("API Error");
                    }
                    break;
                }
                case 'gemini': {
                    await m.reply(mess.wait);
                    let res = await axios.get(`https://api.siputzx.my.id/api/ai/gemini?content=${encodeURIComponent(text)}`);
                    if (res.data.status) {
                        replyviex(res.data.result || res.data.data);
                    } else {
                        throw new Error("API Error");
                    }
                    break;
                }
                case 'logic': {
                    await m.reply(mess.wait);
                    let res = await axios.get(`https://api.siputzx.my.id/api/ai/logic-ai?content=${encodeURIComponent(text)}`);
                    if (res.data.status) {
                        replyviex(res.data.result || res.data.data);
                    } else {
                        throw new Error("API Error");
                    }
                    break;
                }
            }
        } catch (e) {
            console.error(e);
            replyviex("❌ Maaf kak, server AI sedang mengalami gangguan. Coba lagi nanti ya!");
        }
    }
}
