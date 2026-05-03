module.exports = {
    name: 'profile',
    command: ['me', 'profile', 'profil', 'myinfo'],
    category: 'main',
    desc: 'Melihat profil pengguna bot',
    async run(DinzBotz, m, { prefix, isOwner, DinzTheCreator, isPrem, sender, pushname }) {
        const user = global.db.users[sender] || {};
        const registered = user.registered ? '✅ Terdaftar' : '❌ Belum Daftar';
        const role = DinzTheCreator ? 'ᴅᴇᴠᴇʟᴏᴘᴇʀ🥇' 
                   : isOwner ? 'ᴏᴡɴᴇʀ🥈' 
                   : isPrem ? 'ᴘʀᴇᴍɪᴜᴍ💎' 
                   : 'ᴜsᴇʀ🥉';
        
        // Ambil data dari DB (fallback jika kosong)
        const name = user.name || pushname || 'User';
        const age = user.age || '-';
        const limit = user.limit || 'Unlimited';
        const balance = user.balance ? `Rp ${user.balance.toLocaleString()}` : 'Rp 0';
        const xp = user.xp || 0;
        const level = user.level || 0;
        const regAt = user.registeredAt ? new Date(user.registeredAt).toLocaleDateString('id-ID') : '-';

        const profileText = `╭──「 *USER PROFILE* 」──✦
│ 👤 ɴᴀᴍᴀ : ${name}
│ 🎂 ᴜᴍᴜʀ : ${age}
│ 🎖️ ʀᴏʟᴇ : ${role}
│ 📊 ʟᴇᴠᴇʟ : ${level} (XP: ${xp})
│ 💳 sᴀʟᴅᴏ : ${balance}
│ 🎫 ʟɪᴍɪᴛ : ${limit}
│ 📝 sᴛᴀᴛᴜs : ${registered}
│ 📅 ᴅᴀꜰᴛᴀʀ : ${regAt}
╰───────────────────✦

💡 *ᴛɪᴘꜱ:* ᴋᴇᴛɪᴋ *.ᴅᴀꜰᴛᴀʀ* ᴜɴᴛᴜᴋ ᴍᴇʟᴇɴɢᴋᴀᴘɪ ᴅᴀᴛᴀ ᴅɪʀɪ!`;

        try {
            let ppUrl;
            try {
                ppUrl = await DinzBotz.profilePictureUrl(sender, 'image');
            } catch {
                ppUrl = 'https://files.catbox.moe/yng1lr.jpg'; // Fallback default image
            }

            await DinzBotz.sendMessage(m.chat, {
                image: { url: ppUrl },
                caption: profileText
            }, { quoted: m });
        } catch (e) {
            console.error('[profile]', e);
            m.reply(profileText); // Kirim teks saja jika gagal kirim gambar
        }
    }
};
