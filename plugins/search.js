const axios = require('axios');

module.exports = {
    name: 'search',
    command: ['google', 'yts', 'pinterest', 'igstalk', 'ghstalk', 'kbbi', 'resep'],
    category: 'search',
    desc: 'Fitur pencarian informasi (Google, Pinterest, Youtube, Stalking)',
    async run(DinzBotz, m, { command, text, q, isRegistered, replydaftar, replyviex, fetchJson, mess }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦\n\nDENGAN DAFTAR KAMU BISA AKSES BOT SEPUASNYA\n\n💂‍♀: Kenapa harus daftar sih?\n🍁: Agar bot mengenal siapa anda\n💂‍♀: Ribet banget harus daftar segala\n🍁: Jika tidak daftar, Anda tidak bisa menggunakan fitur bot");
        }

        if (!text && !['igstalk', 'ghstalk'].includes(command)) return replyviex(`Kirim perintah ${prefix + command} query\nContoh: ${prefix + command} Minecraft`);

        switch (command) {
            case 'google': {
                await m.reply(mess.wait);
                let res = await axios.get(`https://api.lolhuman.xyz/api/gsearch?apikey=GataDios&query=${encodeURIComponent(text)}`);
                let results = res.data.result;
                let teks = `*GOOGLE SEARCH*\n\n`;
                for (let i of results) {
                    teks += `*Title:* ${i.title}\n*Link:* ${i.link}\n*Desc:* ${i.desc}\n\n`;
                }
                replyviex(teks);
                break;
            }
            case 'pinterest': {
                await m.reply(mess.wait);
                let res = await axios.get(`https://api.lolhuman.xyz/api/pinterest?apikey=GataDios&query=${encodeURIComponent(text)}`);
                await DinzBotz.sendMessage(m.chat, { image: { url: res.data.result[0] }, caption: mess.success }, { quoted: m });
                break;
            }
            case 'yts': {
                await m.reply(mess.wait);
                let res = await axios.get(`https://api.lolhuman.xyz/api/ytsearch?apikey=GataDios&query=${encodeURIComponent(text)}`);
                let results = res.data.result;
                let teks = `*YOUTUBE SEARCH*\n\n`;
                for (let i of results) {
                    teks += `*Title:* ${i.title}\n*Link:* https://www.youtube.com/watch?v=${i.videoId}\n*Duration:* ${i.duration}\n*Views:* ${i.views}\n\n`;
                }
                replyviex(teks);
                break;
            }
            case 'igstalk': {
                if (!text) return replyviex("Input Username!");
                await m.reply(mess.wait);
                let res = await axios.get(`https://api.lolhuman.xyz/api/stalkig/${text}?apikey=GataDios`);
                let results = res.data.result;
                let teks = `*INSTAGRAM STALK*\n\n*Username:* ${results.username}\n*Fullname:* ${results.fullname}\n*Followers:* ${results.followers}\n*Following:* ${results.following}\n*Bio:* ${results.bio}`;
                await DinzBotz.sendMessage(m.chat, { image: { url: results.photo_profile }, caption: teks }, { quoted: m });
                break;
            }
            case 'ghstalk': {
                if (!text) return replyviex("Input Username!");
                await m.reply(mess.wait);
                let res = await axios.get(`https://api.lolhuman.xyz/api/github/${text}?apikey=GataDios`);
                let results = res.data.result;
                let teks = `*GITHUB STALK*\n\n*Username:* ${results.login}\n*Name:* ${results.name}\n*Followers:* ${results.followers}\n*Following:* ${results.following}\n*Public Repos:* ${results.public_repos}\n*Bio:* ${results.bio}`;
                await DinzBotz.sendMessage(m.chat, { image: { url: results.avatar_url }, caption: teks }, { quoted: m });
                break;
            }
        }
    }
}
