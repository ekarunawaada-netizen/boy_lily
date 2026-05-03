module.exports = {
    name: 'stalker',
    command: [
        'igstalk', 'igstalk2',
        'ttstalk', 'tiktokstalk',
        'ffstalk', 'freefirstalk',
        'mlstalk', 'mobilelegendstalk',
        'npmstalk',
        'ghstalk', 'githubstalk',
        'ytstalk', 'youtubestalk', 'infoyt',
        'wacheck', 'wanumber'
    ],
    category: 'stalker',
    desc: 'Cari info profil dari berbagai platform',
    async run(DinzBotz, m, { command, q, args, prefix, isRegistered, replydaftar, replyviex, fetchJson }) {

        if (!isRegistered) return replydaftar('👋 Daftar dulu ya kak!\n\nCara: .daftar nama.umur\nContoh: .daftar Lily.20');
        if (!q) return replyviex(`Masukkan parameter!\nContoh: ${prefix}${command} username/id`);

        await m.react('🔍');

        try {
            switch (command) {

                case 'igstalk':
                case 'igstalk2': {
                    const res = await fetchJson(`https://api.siputzx.my.id/api/s/instagram?username=${q}`);
                    if (!res?.data) return replyviex('User Instagram tidak ditemukan!');
                    const d = res.data;
                    const teks = `╭──「 *INSTAGRAM STALK* 」──\n│ 👤 Nama: ${d.full_name||'-'}\n│ 📛 Username: @${d.username||q}\n│ 📝 Bio: ${d.biography||'-'}\n│ 👥 Followers: ${(d.follower_count||0).toLocaleString()}\n│ 👣 Following: ${(d.following_count||0).toLocaleString()}\n│ 📸 Post: ${(d.media_count||0).toLocaleString()}\n│ ✅ Verified: ${d.is_verified?'Ya':'Tidak'}\n│ 🔒 Private: ${d.is_private?'Ya':'Tidak'}\n╰───────────────────✦`;
                    if (d.profile_pic_url) {
                        await DinzBotz.sendMessage(m.chat, { image: { url: d.profile_pic_url }, caption: teks }, { quoted: m });
                    } else replyviex(teks);
                    break;
                }

                case 'ttstalk':
                case 'tiktokstalk': {
                    const res = await fetchJson(`https://api.siputzx.my.id/api/s/tiktok?username=${q}`);
                    if (!res?.data) return replyviex('User TikTok tidak ditemukan!');
                    const d = res.data;
                    const teks = `╭──「 *TIKTOK STALK* 」──\n│ 👤 Nama: ${d.nickname||'-'}\n│ 📛 Username: @${d.uniqueId||q}\n│ 📝 Bio: ${d.signature||'-'}\n│ 👥 Followers: ${(d.followerCount||0).toLocaleString()}\n│ ❤️ Likes: ${(d.heartCount||0).toLocaleString()}\n│ 🎥 Video: ${(d.videoCount||0).toLocaleString()}\n│ ✅ Verified: ${d.verified?'Ya':'Tidak'}\n╰───────────────────✦`;
                    if (d.avatarLarger) {
                        await DinzBotz.sendMessage(m.chat, { image: { url: d.avatarLarger }, caption: teks }, { quoted: m });
                    } else replyviex(teks);
                    break;
                }

                case 'ffstalk':
                case 'freefirstalk': {
                    if (!args[0] || !args[1]) return replyviex(`Format: ${prefix}ffstalk id region\nContoh: ${prefix}ffstalk 12345678 id`);
                    const res = await fetchJson(`https://api.siputzx.my.id/api/s/freefires?id=${args[0]}&region=${args[1]||'id'}`);
                    if (!res?.data) return replyviex('Akun Free Fire tidak ditemukan!');
                    const d = res.data;
                    replyviex(`╭──「 *FREE FIRE STALK* 」──\n│ 👤 Nama: ${d.basicInfo?.nickname||'-'}\n│ 🆔 ID: ${args[0]}\n│ 🏆 Level: ${d.basicInfo?.level||'-'}\n│ 🎖️ Likes: ${(d.basicInfo?.liked||0).toLocaleString()}\n╰───────────────────✦`);
                    break;
                }

                case 'mlstalk':
                case 'mobilelegendstalk': {
                    if (!args[0] || !args[1]) return replyviex(`Format: ${prefix}mlstalk id zone\nContoh: ${prefix}mlstalk 12345678 1234`);
                    const res = await fetchJson(`https://api.siputzx.my.id/api/s/mobilelegends?id=${args[0]}&zone=${args[1]}`);
                    if (!res?.data) return replyviex('Akun Mobile Legends tidak ditemukan!');
                    replyviex(`╭──「 *ML STALK* 」──\n│ 👤 Nama: ${res.data.name||'-'}\n│ 🆔 ID: ${args[0]}\n│ 🏆 Level: ${res.data.level||'-'}\n╰───────────────────✦`);
                    break;
                }

                case 'npmstalk': {
                    const res = await fetchJson(`https://registry.npmjs.org/${q}`);
                    if (!res?.name) return replyviex('Package NPM tidak ditemukan!');
                    replyviex(`╭──「 *NPM STALK* 」──\n│ 📦 Package: ${res.name}\n│ 📝 Deskripsi: ${res.description||'-'}\n│ 🏷️ Versi: ${res['dist-tags']?.latest||'-'}\n│ 👤 Author: ${res.author?.name||'-'}\n│ 📄 License: ${res.license||'-'}\n╰───────────────────✦`);
                    break;
                }

                case 'ghstalk':
                case 'githubstalk': {
                    const res = await fetchJson(`https://api.github.com/users/${q}`);
                    if (!res?.login) return replyviex('User GitHub tidak ditemukan!');
                    const teks = `╭──「 *GITHUB STALK* 」──\n│ 👤 Nama: ${res.name||'-'}\n│ 📛 Username: @${res.login}\n│ 📝 Bio: ${res.bio||'-'}\n│ 👥 Followers: ${(res.followers||0).toLocaleString()}\n│ 📁 Repos: ${res.public_repos||0}\n│ 📍 Lokasi: ${res.location||'-'}\n│ 🔗 ${res.html_url}\n╰───────────────────✦`;
                    if (res.avatar_url) {
                        await DinzBotz.sendMessage(m.chat, { image: { url: res.avatar_url }, caption: teks }, { quoted: m });
                    } else replyviex(teks);
                    break;
                }

                case 'ytstalk':
                case 'youtubestalk':
                case 'infoyt': {
                    const res = await fetchJson(`https://api.siputzx.my.id/api/s/youtube?username=${encodeURIComponent(q)}`);
                    if (!res?.data) return replyviex('Channel YouTube tidak ditemukan!');
                    const d = res.data;
                    const teks = `╭──「 *YOUTUBE STALK* 」──\n│ 📺 Channel: ${d.title||q}\n│ 👥 Subscriber: ${d.subscriberCount||'-'}\n│ 🎥 Video: ${d.videoCount||'-'}\n│ 👁️ Views: ${d.viewCount||'-'}\n╰───────────────────✦`;
                    if (d.thumbnail) {
                        await DinzBotz.sendMessage(m.chat, { image: { url: d.thumbnail }, caption: teks }, { quoted: m });
                    } else replyviex(teks);
                    break;
                }

                case 'wacheck':
                case 'wanumber': {
                    const number = q.replace(/[^0-9]/g, '');
                    if (!number) return replyviex(`Masukkan nomor WA!\nContoh: ${prefix}${command} 6281234567890`);
                    const [result] = await DinzBotz.onWhatsApp(number + '@s.whatsapp.net');
                    replyviex(`╭──「 *WA CHECK* 」──\n│ 📞 Nomor: +${number}\n│ ✅ Terdaftar: ${result?.exists?'Ya':'Tidak'}\n╰───────────────────✦`);
                    break;
                }
            }
        } catch (e) {
            console.error(`[stalker:${command}]`, e.message);
            await m.react('❌');
            replyviex(`Gagal: ${e.message}`);
        }
    }
};
