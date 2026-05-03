const fs = require('fs');

module.exports = {
    name: 'sticker',
    command: [
        'smeme', 'stickermeme', 'stickmeme',
        'toonce', 'toviewonce',
        'toghibli', 'toanime', 'jadianime',
        'upscale', 'superhd', 'hd',
        'remjni', 'remini',
        'removebg'
    ],
    category: 'maker',
    desc: 'Fitur konversi gambar & sticker (meme, ghibli, upscale, dll)',
    async run(DinzBotz, m, { command, text, q, args, prefix,
        isRegistered, replydaftar, replyviex, reply,
        mime, quoted, mess, getBuffer, fetchJson }) {

        if (!isRegistered) return replydaftar(
            '👋 Daftar dulu kak!\n\nCara: .daftar nama.umur\nContoh: .daftar Lily.20'
        );

        switch (command) {

            // === STICKER MEME ===
            case 'smeme':
            case 'stickermeme':
            case 'stickmeme': {
                if (!quoted || !/image/.test(mime) || /webp/.test(mime)) {
                    return replyviex(`Kirim/Reply gambar dengan caption:\n${prefix}${command} teks_atas|teks_bawah`);
                }
                if (!text) return replyviex(`Tambahkan teks!\nFormat: ${prefix}${command} atas|bawah`);
                try {
                    const atas = text.split('|')[0] || '-';
                    const bawah = text.split('|')[1] || '-';
                    const { UploadFileUgu } = require('../lib/uploader');
                    const imgPath = await DinzBotz.downloadAndSaveMediaMessage(quoted);
                    const uploaded = await UploadFileUgu(imgPath);
                    const memeUrl = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${uploaded.url}`;
                    await DinzBotz.sendImageAsSticker(m.chat, memeUrl, m, {
                        packname: global.packname || 'LilyMD',
                        author: global.author || 'KaaPhiww'
                    });
                    try { fs.unlinkSync(imgPath); } catch {}
                } catch (e) {
                    console.error('[sticker:smeme]', e);
                    replyviex('Gagal buat sticker meme: ' + e.message);
                }
                break;
            }

            // === TO GHIBLI ===
            case 'toghibli': {
                if (!quoted || !/image/.test(mime) || /webp/.test(mime)) {
                    return replyviex(`Reply gambar dengan caption ${prefix}${command}`);
                }
                try {
                    replyviex(mess.wait || 'Memproses...');
                    const { toGhibli } = require('../lib/uploader');
                    const imgPath = await DinzBotz.downloadAndSaveMediaMessage(quoted);
                    const result = await toGhibli(imgPath);
                    await DinzBotz.sendMessage(m.chat, {
                        image: { url: result.url || result },
                        caption: '✅ Ghibli Style!'
                    }, { quoted: m });
                    try { fs.unlinkSync(imgPath); } catch {}
                } catch (e) {
                    console.error('[sticker:toghibli]', e);
                    replyviex('Gagal konversi Ghibli: ' + e.message);
                }
                break;
            }

            // === TO ANIME ===
            case 'toanime':
            case 'jadianime': {
                if (!quoted || !/image/.test(mime) || /webp/.test(mime)) {
                    return replyviex(`Reply gambar dengan caption ${prefix}${command}`);
                }
                try {
                    replyviex(mess.wait || 'Memproses Anime Style...');
                    const { toAnime } = require('../lib/uploader');
                    const imgPath = await DinzBotz.downloadAndSaveMediaMessage(quoted);
                    const result = await toAnime(imgPath);
                    await DinzBotz.sendMessage(m.chat, {
                        image: { url: result.url || result },
                        caption: '✅ Anime Style!'
                    }, { quoted: m });
                    try { fs.unlinkSync(imgPath); } catch {}
                } catch (e) {
                    // Fallback ke API external
                    try {
                        const imgPath2 = await DinzBotz.downloadAndSaveMediaMessage(quoted);
                        const { UploadFileUgu } = require('../lib/uploader');
                        const up = await UploadFileUgu(imgPath2);
                        const apiUrl = `https://api.siputzx.my.id/api/edit/jadianime?url=${encodeURIComponent(up.url)}`;
                        await DinzBotz.sendMessage(m.chat, {
                            image: { url: apiUrl },
                            caption: '✅ Anime Style!'
                        }, { quoted: m });
                        try { fs.unlinkSync(imgPath2); } catch {}
                    } catch (e2) {
                        replyviex('Gagal konversi Anime: ' + e2.message);
                    }
                }
                break;
            }

            // === UPSCALE / SUPER HD ===
            case 'upscale':
            case 'superhd':
            case 'hd': {
                if (!quoted || !/image/.test(mime) || /webp/.test(mime)) {
                    return replyviex(`Reply gambar dengan caption ${prefix}${command}`);
                }
                try {
                    replyviex(mess.wait || 'Meningkatkan kualitas gambar...');
                    const { toHD } = require('../lib/hd');
                    const imgPath = await DinzBotz.downloadAndSaveMediaMessage(quoted);
                    const result = await toHD(imgPath);
                    await DinzBotz.sendMessage(m.chat, {
                        image: { url: result.url || result },
                        caption: '✅ Gambar sudah di-upscale!'
                    }, { quoted: m });
                    try { fs.unlinkSync(imgPath); } catch {}
                } catch (e) {
                    console.error('[sticker:hd]', e);
                    replyviex('Gagal upscale: ' + e.message);
                }
                break;
            }

            // === REMINI ===
            case 'remjni':
            case 'remini': {
                if (!quoted || !/image/.test(mime) || /webp/.test(mime)) {
                    return replyviex(`Reply gambar dengan caption ${prefix}${command}`);
                }
                try {
                    replyviex(mess.wait || 'Memproses Remini...');
                    const { remini } = require('../lib/remini');
                    const imgPath = await DinzBotz.downloadAndSaveMediaMessage(quoted);
                    const result = await remini(imgPath);
                    await DinzBotz.sendMessage(m.chat, {
                        image: { url: result.url || result },
                        caption: '✅ Remini berhasil!'
                    }, { quoted: m });
                    try { fs.unlinkSync(imgPath); } catch {}
                } catch (e) {
                    replyviex('Gagal Remini: ' + e.message);
                }
                break;
            }

            // === REMOVE BG ===
            case 'removebg': {
                if (!quoted || !/image/.test(mime) || /webp/.test(mime)) {
                    return replyviex(`Reply gambar dengan caption ${prefix}${command}`);
                }
                try {
                    replyviex(mess.wait || 'Menghapus background...');
                    const { UploadFileUgu } = require('../lib/uploader');
                    const imgPath = await DinzBotz.downloadAndSaveMediaMessage(quoted);
                    const up = await UploadFileUgu(imgPath);
                    const apiUrl = `https://api.siputzx.my.id/api/edit/removebg?url=${encodeURIComponent(up.url)}`;
                    await DinzBotz.sendMessage(m.chat, {
                        image: { url: apiUrl },
                        caption: '✅ Background berhasil dihapus!'
                    }, { quoted: m });
                    try { fs.unlinkSync(imgPath); } catch {}
                } catch (e) {
                    replyviex('Gagal hapus background: ' + e.message);
                }
                break;
            }
        }
    }
};
