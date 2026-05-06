// maker.js - sticker & media converter plugin

module.exports = {
    name: 'maker',
    command: ['sticker', 's', 'sgif', 'swm', 'wm', 'tovideo', 'tomp4'],
    category: 'maker',
    desc: 'Fitur pembuatan media (Sticker, Video conversion)',
    async run(LilyBot, m, { command, prefix, text, q, isRegistered, replydaftar, replyviex, mime, quoted, getBuffer, mess }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦\n\nDENGAN DAFTAR KAMU BISA AKSES BOT SEPUASNYA\n\n💂‍♀: Kenapa harus daftar sih?\n🍁: Agar bot mengenal siapa anda\n💂‍♀: Ribet banget harus daftar segala\n🍁: Jika tidak daftar, Anda tidak bisa menggunakan fitur bot");
        }

        const fs = require('fs');

        switch (command) {
            case 'sticker':
            case 's': {
                if (!mime || !/image|video|webp/.test(mime)) {
                    return replyviex(`Kirim/reply gambar/video dengan caption ${prefix}${command}`);
                }
                try {
                    let img = await LilyBot.downloadAndSaveMediaMessage(quoted);
                    await LilyBot.sendImageAsSticker(m.chat, img, m, {
                        packname: global.packname || 'Furina-MD',
                        author: global.author || 'LilyMD'
                    });
                    try { fs.unlinkSync(img); } catch {}
                } catch (e) {
                    console.error('[maker:sticker]', e);
                    replyviex('Gagal membuat sticker: ' + e.message);
                }
                break;
            }

            case 'tovideo':
            case 'tomp4': {
                if (!mime || !/webp/.test(mime)) {
                    return replyviex(`Reply sticker gif dengan caption ${prefix}${command}`);
                }
                await m.reply(mess.wait || 'Memproses...');
                try {
                    const { webp2mp4File } = require('../lib/uploader');
                    let img = await LilyBot.downloadAndSaveMediaMessage(quoted);
                    let result = await webp2mp4File(img);
                    await LilyBot.sendMessage(m.chat, {
                        video: { url: result.url || result },
                        caption: mess.success || '✅ Berhasil'
                    }, { quoted: m });
                    try { fs.unlinkSync(img); } catch {}
                } catch (e) {
                    console.error('[maker:tovideo]', e);
                    replyviex('Gagal convert sticker ke video: ' + e.message);
                }
                break;
            }
        }
    }
};
