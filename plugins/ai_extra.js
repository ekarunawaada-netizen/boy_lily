const axios = require('axios');

module.exports = {
    name: 'ai_extra',
    command: [
        'chat', 'openai', 'gpt4', 'gpt3', 'cai', 'characterai', 'gemini2',
        'hercai', 'blackbox', 'lepton', 'claude'
    ],
    category: 'ai',
    desc: 'Fitur AI tambahan (Free API)',
    async run(DinzBotz, m, { command, text, q, prefix, isRegistered, replydaftar, replyviex, mess }) {
        if (!isRegistered) return replydaftar();
        if (!text) return m.reply(`Mau nanya apa? Contoh: *${prefix}${command} Siapa presiden Indonesia?*`);

        await m.reply(mess.wait || ' Lily sedang berpikir... 🧠');

        try {
            let res;
            switch (command) {
                case 'chat':
                case 'openai':
                case 'gpt4':
                case 'gpt3':
                    // Menggunakan API Siputzx (Free & Stable)
                    res = await axios.get(`https://api.siputzx.my.id/api/ai/gpt4?content=${encodeURIComponent(text)}`);
                    break;
                
                case 'cai':
                case 'characterai':
                    res = await axios.get(`https://api.siputzx.my.id/api/ai/character-ai?content=${encodeURIComponent(text)}&character=Lily`);
                    break;

                case 'blackbox':
                    res = await axios.get(`https://api.siputzx.my.id/api/ai/blackbox?content=${encodeURIComponent(text)}`);
                    break;

                case 'hercai':
                    res = await axios.get(`https://api.siputzx.my.id/api/ai/hercai?content=${encodeURIComponent(text)}`);
                    break;

                case 'lepton':
                    res = await axios.get(`https://api.siputzx.my.id/api/ai/lepton?content=${encodeURIComponent(text)}`);
                    break;

                case 'claude':
                    res = await axios.get(`https://api.siputzx.my.id/api/ai/claude?content=${encodeURIComponent(text)}`);
                    break;

                default:
                    res = await axios.get(`https://api.siputzx.my.id/api/ai/gpt4?content=${encodeURIComponent(text)}`);
            }

            if (res.data.status) {
                await m.reply(res.data.result || res.data.data);
            } else {
                throw new Error("API response failed");
            }
        } catch (e) {
            console.error('[AI EXTRA ERROR]', e);
            // Fallback ke LOLHUMAN jika siputzx gagal
            try {
                let fallback = await axios.get(`https://api.lolhuman.xyz/api/openai?apikey=GataDios&text=${encodeURIComponent(text)}`);
                await m.reply(fallback.data.result);
            } catch (err) {
                m.reply(`❌ Maaf kak, server AI sedang sibuk. Coba lagi nanti ya!`);
            }
        }
    }
}
