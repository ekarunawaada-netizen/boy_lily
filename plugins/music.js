// music.js - lazy load semua dependency agar plugin tetap bisa load
// meski ada modul yang tidak tersedia (error hanya muncul saat command dipanggil)


module.exports = {
    name: 'music',
    command: [
        // YouTube
        'yt', 'ytmp3', 'ytmp3xx', 'playyt', 'ytplay',
        'ytmp4', 'ytmp4xx', 'ytplayxx',
        'ytsearch', 'carimusic', 'play',
        // TikTok
        'tiktok', 'tt', 'tiktokvid',
        'tiktokaudio', 'ttaudio',
        'tiktokslide', 'ttslide',
        'tiktokfoto', 'tiktokmp4',
        // Spotify
        'spotify', 'spotifydl', 'spotifydl1', 'spdl1',
        'playspotify', 'spotifyplay', 'spotplay', 'spotify1',
        // Other
        'whatmusic',
    ],
    category: 'music',
    desc: 'Download musik dari YouTube, TikTok, Spotify',
    async run(DinzBotz, m, { command, q, text, args, prefix,
        isRegistered, replydaftar, replyviex, reply,
        mime, quoted, mess, fetchJson, getBuffer, sleep }) {

        if (!isRegistered) return replydaftar(
            '👋 Daftar dulu kak!\n\nCara: .daftar nama.umur'
        );
        if (!q) return replyviex(`Masukkan judul/link!\nContoh: ${prefix}${command} shape of you`);

        // Lazy-load library agar tidak crash saat startup
        let ytdl2, tiktokLib, spotifyLib, savetube;
        try { ytdl2 = require('../lib/ytdl2').ytdl2; } catch {}
        try { tiktokLib = require('../lib/tiktok').tiktok; } catch {}
        try { spotifyLib = require('../lib/spotify').spotify; } catch {}
        try { savetube = require('../lib/savetube').savetube; } catch {}

        await m.react('🎵');


        try {
            // ==================== YOUTUBE ====================
            if (['yt','ytmp3','ytmp3xx','playyt','ytplay','play','carimusic'].includes(command)) {
                replyviex(mess.wait || '🎵 Mencari & mendownload audio...');
                try {
                    let res;
                    // Gunakan ytdl2 dari lib
                    if (typeof ytdl2 === 'function') {
                        res = await ytdl2(q, 'mp3');
                    } else {
                        // Fallback ke SaveTube
                        const searchRes = await fetchJson(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`);
                        throw new Error('ytdl2 tidak tersedia, gunakan savetube');
                    }
                    await DinzBotz.sendMessage(m.chat, {
                        audio: { url: res.url || res },
                        mimetype: 'audio/mp4',
                        ptt: false
                    }, { quoted: m });
                } catch {
                    // Fallback SaveTube API
                    try {
                        const st = await savetube(q, 'mp3');
                        await DinzBotz.sendMessage(m.chat, {
                            audio: { url: st.url },
                            mimetype: 'audio/mp4',
                            ptt: false
                        }, { quoted: m });
                    } catch (e2) {
                        await m.react('❌');
                        replyviex('Gagal download audio: ' + e2.message);
                    }
                }
                return;
            }

            if (['ytmp4','ytmp4xx','ytplayxx'].includes(command)) {
                replyviex(mess.wait || '🎬 Mendownload video YouTube...');
                try {
                    let res;
                    if (typeof ytdl2 === 'function') {
                        res = await ytdl2(q, 'mp4');
                    } else {
                        throw new Error('ytdl2 tidak tersedia');
                    }
                    await DinzBotz.sendMessage(m.chat, {
                        video: { url: res.url || res },
                        caption: `🎬 ${res.title || q}`
                    }, { quoted: m });
                } catch {
                    try {
                        const st = await savetube(q, 'mp4');
                        await DinzBotz.sendMessage(m.chat, {
                            video: { url: st.url },
                            caption: `🎬 ${st.title || q}`
                        }, { quoted: m });
                    } catch (e2) {
                        await m.react('❌');
                        replyviex('Gagal download video: ' + e2.message);
                    }
                }
                return;
            }

            // ==================== TIKTOK ====================
            if (['tiktok','tt','tiktokvid','tiktokmp4'].includes(command)) {
                if (!q.includes('tiktok.com') && !q.includes('vm.tiktok')) {
                    return replyviex('Masukkan link TikTok yang valid!');
                }
                replyviex(mess.wait || '📥 Mendownload TikTok...');
                try {
                    const res = await tiktok(q);
                    await DinzBotz.sendMessage(m.chat, {
                        video: { url: res.videoUrl || res.play || res.url },
                        caption: `🎵 ${res.title || 'TikTok Video'}\n👤 @${res.author || ''}`
                    }, { quoted: m });
                } catch (e) {
                    await m.react('❌');
                    replyviex('Gagal download TikTok: ' + e.message);
                }
                return;
            }

            if (['tiktokaudio','ttaudio'].includes(command)) {
                if (!q.includes('tiktok.com') && !q.includes('vm.tiktok')) {
                    return replyviex('Masukkan link TikTok yang valid!');
                }
                replyviex(mess.wait || '🎵 Mendownload audio TikTok...');
                try {
                    const res = await tiktok(q);
                    await DinzBotz.sendMessage(m.chat, {
                        audio: { url: res.music || res.musicUrl || res.audioUrl },
                        mimetype: 'audio/mp4',
                        ptt: false
                    }, { quoted: m });
                } catch (e) {
                    await m.react('❌');
                    replyviex('Gagal download audio TikTok: ' + e.message);
                }
                return;
            }

            if (['tiktokslide','ttslide','tiktokfoto'].includes(command)) {
                if (!q.includes('tiktok.com') && !q.includes('vm.tiktok')) {
                    return replyviex('Masukkan link TikTok slide yang valid!');
                }
                replyviex(mess.wait || '📷 Mendownload TikTok slide...');
                try {
                    const res = await tiktok(q);
                    const images = res.images || res.image_post_info?.images || [];
                    if (!images.length) return replyviex('Tidak ada gambar slide!');
                    for (let i = 0; i < Math.min(images.length, 10); i++) {
                        await DinzBotz.sendMessage(m.chat, {
                            image: { url: images[i].display_image?.url_list?.[0] || images[i] },
                            caption: i === 0 ? `📷 TikTok Slide (${images.length} gambar)` : ''
                        });
                        await sleep(500);
                    }
                } catch (e) {
                    await m.react('❌');
                    replyviex('Gagal download TikTok slide: ' + e.message);
                }
                return;
            }

            // ==================== SPOTIFY ====================
            if (['spotify','spotifydl','spotifydl1','spdl1','playspotify','spotifyplay','spotplay','spotify1'].includes(command)) {
                replyviex(mess.wait || '🎵 Mencari di Spotify...');
                try {
                    let res;
                    if (typeof spotify === 'function') {
                        res = await spotify(q);
                    } else {
                        throw new Error('spotify lib tidak tersedia');
                    }
                    await DinzBotz.sendMessage(m.chat, {
                        audio: { url: res.audioUrl || res.url },
                        mimetype: 'audio/mp4',
                        ptt: false
                    }, { quoted: m });
                } catch (e) {
                    // Fallback: cari di YouTube
                    try {
                        const st = await savetube(q + ' official audio', 'mp3');
                        await DinzBotz.sendMessage(m.chat, {
                            audio: { url: st.url },
                            mimetype: 'audio/mp4',
                            ptt: false
                        }, { quoted: m });
                    } catch (e2) {
                        await m.react('❌');
                        replyviex('Gagal download Spotify: ' + e2.message);
                    }
                }
                return;
            }

            // === WHAT MUSIC ===
            if (command === 'whatmusic') {
                if (!quoted || !/audio|video/.test(mime)) {
                    return replyviex(`Reply audio/video dengan caption ${prefix}${command}`);
                }
                replyviex(mess.wait || 'Mendeteksi musik...');
                try {
                    replyviex('🎵 Fitur identifikasi musik sedang dalam pengembangan!');
                } catch (e) {
                    replyviex('Gagal mendeteksi musik: ' + e.message);
                }
                return;
            }


        } catch (e) {
            console.error(`[music:${command}]`, e.message);
            await m.react('❌');
            replyviex('Terjadi error: ' + e.message);
        }
    }
};
