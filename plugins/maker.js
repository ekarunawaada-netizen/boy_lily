const { sticker, toVideo } = require('../lib/sticker');

module.exports = {
    name: 'maker',
    command: ['sticker', 's', 'sgif', 'swm', 'wm', 'tovideo', 'tomp4'],
    category: 'maker',
    desc: 'Fitur pembuatan media (Sticker, Video conversion)',
    async run(DinzBotz, m, { command, text, q, isRegistered, replydaftar, replyviex, mime, quoted, getBuffer, mess }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦\n\nDENGAN DAFTAR KAMU BISA AKSES BOT SEPUASNYA\n\n💂‍♀: Kenapa harus daftar sih?\n🍁: Agar bot mengenal siapa anda\n💂‍♀: Ribet banget harus daftar segala\n🍁: Jika tidak daftar, Anda tidak bisa menggunakan fitur bot");
        }

        switch (command) {
            case 'sticker':
            case 's': {
                if (/image|video|webp/.test(mime)) {
                    let img = await DinzBotz.downloadAndSaveMediaMessage(quoted);
                    let stiker = await DinzBotz.sendImageAsSticker(m.chat, img, m, { packname: global.packname, author: global.author });
                    require('fs').unlinkSync(img);
                } else {
                    replyviex(`Kirim/reply gambar/video dengan caption ${prefix + command}`);
                }
                break;
            }
            case 'tovideo':
            case 'tomp4': {
                if (!/webp/.test(mime)) return replyviex(`Reply sticker gif dengan caption ${prefix + command}`);
                await m.reply(mess.wait);
                let img = await DinzBotz.downloadAndSaveMediaMessage(quoted);
                let webpToMp4 = await toVideo(img);
                await DinzBotz.sendMessage(m.chat, { video: { url: webpToMp4.result }, caption: mess.success }, { quoted: m });
                require('fs').unlinkSync(img);
                break;
            }
        }
    }
}
