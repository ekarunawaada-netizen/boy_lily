const axios = require('axios');
const fs = require('fs');

module.exports = {
    name: 'hentaivid',
    command: ['hentaivid2', 'hentaivideo', 'trap', 'hneko', 'nwaifu', 'milf', 'yuri', 'zettai'],
    category: 'nsfw',
    desc: 'NSFW Content',
    async run(LilyBot, m, { command, isPrem, mess, replyprem, replyviex, pickRandom }) {
        if (!isPrem) return replyprem(mess.premium);
        
        // Anti NSFW Check (optional, if group settings allow)
        // if (m.isGroup && !global.db.chats[m.chat].nsfw) return m.reply('Fitur NSFW tidak aktif di grup ini!')

        switch (command) {
            case 'hentaivid':
            case 'hentaivid2':
            case 'hentaivideo':
                await m.reply(mess.wait);
                await LilyBot.sendMessage(m.chat, {
                    video: { url: `https://api.fgmods.xyz/api/nsfw-nime/hentai-mp4?apikey=qzu9Ja5Q` },
                    caption: `success`
                }, { quoted: m });
                break;

            case 'trap':
                await m.reply(mess.wait);
                let resTrap = await axios.get(`https://waifu.pics/api/nsfw/trap`);
                await LilyBot.sendMessage(m.chat, { image: { url: resTrap.data.url }, caption: mess.success }, { quoted: m });
                break;

            case 'hneko':
            case 'hentai-neko':
                let resNeko = await axios.get(`https://waifu.pics/api/nsfw/neko`);
                await LilyBot.sendMessage(m.chat, { image: { url: resNeko.data.url }, caption: mess.success }, { quoted: m });
                break;

            case 'milf':
                let milfData = JSON.parse(fs.readFileSync("./data/DinzIDMedia/nsfw/milf.json"));
                let milfRes = milfData[Math.floor(Math.random() * milfData.length)];
                await LilyBot.sendMessage(m.chat, { image: { url: milfRes.url }, caption: mess.success }, { quoted: m });
                break;
            
            case 'yuri':
                let yuriData = JSON.parse(fs.readFileSync("./data/DinzIDMedia/nsfw/yuri.json"));
                let yuriRes = yuriData[Math.floor(Math.random() * yuriData.length)];
                await LilyBot.sendMessage(m.chat, { image: { url: yuriRes.url }, caption: mess.success }, { quoted: m });
                break;

            case 'zettai':
                let zettaiData = JSON.parse(fs.readFileSync("./data/DinzIDMedia/nsfw/zettai.json"));
                let zettaiRes = zettaiData[Math.floor(Math.random() * zettaiData.length)];
                await LilyBot.sendMessage(m.chat, { image: { url: zettaiRes.url }, caption: mess.success }, { quoted: m });
                break;
        }
    }
}
