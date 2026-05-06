module.exports = {
    name: 'admin',
    command: [
        'block', 'ban', 'unblock', 'unban', 'listblock', 'listban', 'blocklist', 'banlist',
        'resetlinkgc', 'resetlinkgroup', 'resetlinkgrup', 'revoke', 'resetlink', 'resetgrouplink', 'resetgclink', 'resetgruplink',
        'leavegc', 'kickall', 'kudetagc', 'kudeta',
        'delete', 'del', 'd', '>l',
        'ephemeral', 'closetime', 'opentime',
        'setnamegc', 'setgroupname', 'setsubject', 'setdesc', 'setdesk',
        'getpp', 'setppgroup', 'setgcpp', 'setgrouppp',
        'deleteppgroup', 'delppgc', 'deleteppgc', 'delppgroup',
        'deleteppbot', 'delppbot',
        'linkgc', 'linkgroup', 'gclink', 'grouplink',
        'sider', 'siders',
        'domain20'
    ],
    category: 'group',
    desc: 'Fitur administrasi grup lanjutan (Admin/Owner only)',
    async run(LilyBot, m, { command, text, q, args, prefix, from, mess,
        DinzTheCreator, isBotAdmins, isAdmins, isGroupOwner,
        groupMetadata, participants, quoted, mime, reply, replyviex,
        generateProfilePicture, WA_DEFAULT_EPHEMERAL, fs }) {

        // Require WA_DEFAULT_EPHEMERAL dari baileys jika tidak tersedia di ctx
        const baileys = require('lily-baileys');
        const ephemeralVal = (typeof WA_DEFAULT_EPHEMERAL !== 'undefined') ? WA_DEFAULT_EPHEMERAL : baileys.WA_DEFAULT_EPHEMERAL;
        const genPP = (typeof generateProfilePicture === 'function') ? generateProfilePicture : require('../lib/myfunc').generateProfilePicture;
        const fsModule = fs || require('fs');

        switch (command) {

            // === BLOCK / BAN ===
            case 'block':
            case 'ban': {
                if (!DinzTheCreator) return replyviex(mess.only.owner);
                const users = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
                await LilyBot.updateBlockStatus(users, 'block');
                replyviex('✅ Berhasil blokir pengguna');
                break;
            }
            case 'unblock':
            case 'unban': {
                if (!DinzTheCreator) return replyviex(mess.only.owner);
                const users = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
                await LilyBot.updateBlockStatus(users, 'unblock');
                replyviex('✅ Berhasil unblokir pengguna');
                break;
            }
            case 'listblock':
            case 'listban':
            case 'blocklist':
            case 'banlist': {
                if (!DinzTheCreator) return replyviex(mess.only.owner);
                try {
                    const blocked = await LilyBot.fetchBlocklist();
                    replyviex(`*DAFTAR BLOCK*\n\nTotal: ${blocked.length}\n\n${blocked.map((b, i) => `${i + 1}. @${b.split('@')[0]}`).join('\n')}`);
                } catch (e) {
                    replyviex('Gagal mengambil daftar block');
                }
                break;
            }

            // === RESET LINK ===
            case 'resetlinkgc':
            case 'resetlinkgroup':
            case 'resetlinkgrup':
            case 'revoke':
            case 'resetlink':
            case 'resetgrouplink':
            case 'resetgclink':
            case 'resetgruplink': {
                if (!m.isGroup) return replyviex(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return replyviex('Bot harus menjadi admin terlebih dahulu!');
                await LilyBot.groupRevokeInvite(m.chat);
                replyviex('✅ Link grup berhasil direset');
                break;
            }

            // === LEAVE GC ===
            case 'leavegc': {
                if (!DinzTheCreator) return reply(mess.only.owner);
                await LilyBot.groupLeave(m.chat);
                break;
            }

            // === KICK ALL ===
            case 'kickall': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins && !DinzTheCreator) return reply('Khusus Admin!!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                const memberIds = participants.filter(p => !p.admin).map(p => p.id);
                if (memberIds.length === 0) return replyviex('Tidak ada member yang bisa di-kick');
                await LilyBot.groupParticipantsUpdate(m.chat, memberIds, 'remove');
                replyviex(`✅ Berhasil kick ${memberIds.length} member`);
                break;
            }

            // === KUDETA ===
            case 'kudetagc':
            case 'kudeta': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                if (!DinzTheCreator && !isAdmins) return reply('Khusus Admin!!');
                const adminIds = participants.filter(p => p.admin && p.id !== m.sender).map(p => p.id);
                if (adminIds.length === 0) return replyviex('Tidak ada admin lain!');
                for (const id of adminIds) {
                    try {
                        await LilyBot.groupParticipantsUpdate(m.chat, [id], 'demote');
                    } catch {}
                }
                replyviex('✅ Kudeta berhasil! Semua admin lain sudah di-demote');
                break;
            }

            // === DELETE MESSAGE ===
            case 'delete':
            case 'del': {
                if (!DinzTheCreator && !isAdmins) return reply(mess.only.owner);
                if (!m.quoted) return replyviex('Reply pesan yang ingin dihapus!');
                await LilyBot.sendMessage(m.chat, {
                    delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender }
                });
                break;
            }
            case 'd': {
                if (!m.quoted) return replyviex('Reply pesan bot yang ingin dihapus!');
                if (!m.quoted.isBaileys) return replyviex('Pesan bukan dari bot!');
                await LilyBot.sendMessage(m.chat, {
                    delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender }
                });
                break;
            }
            case '>l': {
                if (!m.quoted) return;
                await LilyBot.sendMessage(m.chat, {
                    delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender }
                });
                break;
            }

            // === EPHEMERAL ===
            case 'ephemeral': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                if (!text) return replyviex('Gunakan: enable / disable');
                if (args[0] === 'enable') {
                    await LilyBot.sendMessage(m.chat, { disappearingMessagesInChat: ephemeralVal });
                    replyviex('✅ Pesan menghilang diaktifkan');
                } else if (args[0] === 'disable') {
                    await LilyBot.sendMessage(m.chat, { disappearingMessagesInChat: false });
                    replyviex('✅ Pesan menghilang dinonaktifkan');
                } else {
                    replyviex('Gunakan: enable / disable');
                }
                break;
            }

            // === CLOSETIME / OPENTIME ===
            case 'closetime': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                const timeMap = { second: 1000, minute: 60000, hour: 3600000, day: 86400000 };
                if (!args[0] || !timeMap[args[1]]) return replyviex('*Format:* .closetime [angka] [second/minute/hour/day]\nContoh: .closetime 10 minute');
                const timer = args[0] * timeMap[args[1]];
                replyviex(`⏰ Grup akan ditutup dalam ${q}`);
                setTimeout(() => {
                    LilyBot.groupSettingUpdate(m.chat, 'announcement');
                    LilyBot.sendMessage(m.chat, { text: '*Waktu habis!* Grup ditutup otomatis oleh Admin' });
                }, timer);
                break;
            }
            case 'opentime': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                const timeMap = { second: 1000, minute: 60000, hour: 3600000, day: 86400000 };
                if (!args[0] || !timeMap[args[1]]) return replyviex('*Format:* .opentime [angka] [second/minute/hour/day]\nContoh: .opentime 10 minute');
                const timer = args[0] * timeMap[args[1]];
                replyviex(`⏰ Grup akan dibuka dalam ${q}`);
                setTimeout(() => {
                    LilyBot.groupSettingUpdate(m.chat, 'not_announcement');
                    LilyBot.sendMessage(m.chat, { text: '*Waktu habis!* Grup dibuka otomatis oleh Admin' });
                }, timer);
                break;
            }

            // === SET GROUP NAME / DESC ===
            case 'setnamegc':
            case 'setgroupname':
            case 'setsubject': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                if (!text) return replyviex('Masukkan nama grup baru!');
                await LilyBot.groupUpdateSubject(m.chat, text);
                replyviex('✅ Nama grup berhasil diubah');
                break;
            }
            case 'setdesc':
            case 'setdesk': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                if (!text) return replyviex('Masukkan deskripsi grup baru!');
                await LilyBot.groupUpdateDescription(m.chat, text);
                replyviex('✅ Deskripsi grup berhasil diubah');
                break;
            }

            // === PP COMMANDS ===
            case 'getpp': {
                const users = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
                let ppUrl;
                try {
                    ppUrl = await LilyBot.profilePictureUrl(users, 'image');
                } catch {
                    ppUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
                }
                await LilyBot.sendMessage(m.chat, { image: { url: ppUrl } }, { quoted: m });
                break;
            }
            case 'setppgroup':
            case 'setgcpp':
            case 'setgrouppp': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                if (!quoted || !/image/.test(mime) || /webp/.test(mime)) {
                    return replyviex(`Kirim/Reply gambar dengan caption ${prefix}${command}`);
                }
                try {
                    const mediz = await LilyBot.downloadAndSaveMediaMessage(quoted, 'ppgc.jpeg');
                    if (args[0] === 'full') {
                        const { img } = await genPP(mediz);
                        await LilyBot.query({
                            tag: 'iq',
                            attrs: { to: m.chat, type: 'set', xmlns: 'w:profile:picture' },
                            content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]
                        });
                    } else {
                        await LilyBot.updateProfilePicture(m.chat, { url: mediz });
                    }
                    try { fsModule.unlinkSync(mediz); } catch {}
                    replyviex('✅ Foto profil grup berhasil diubah');
                } catch (e) {
                    console.error('[admin:setppgroup]', e);
                    replyviex('Gagal mengubah foto profil grup');
                }
                break;
            }
            case 'deleteppgroup':
            case 'delppgc':
            case 'deleteppgc':
            case 'delppgroup': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                await LilyBot.removeProfilePicture(m.chat);
                replyviex('✅ Foto profil grup berhasil dihapus');
                break;
            }
            case 'deleteppbot':
            case 'delppbot': {
                if (!DinzTheCreator) return reply(mess.only.owner);
                await LilyBot.removeProfilePicture(LilyBot.user.id);
                replyviex('✅ Foto profil bot berhasil dihapus');
                break;
            }

            // === LINK GC ===
            case 'linkgc':
            case 'linkgroup':
            case 'gclink':
            case 'grouplink': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!isBotAdmins) return reply('Bot harus menjadi admin!');
                try {
                    const code = await LilyBot.groupInviteCode(m.chat);
                    LilyBot.sendMessage(m.chat, {
                        text: `🔗 *Link Grup: ${groupMetadata.subject || ''}*\n\nhttps://chat.whatsapp.com/${code}`,
                    }, { quoted: m });
                } catch (e) {
                    replyviex('Gagal mengambil link grup. Bot harus admin!');
                }
                break;
            }

            // === SIDER (deteksi member tidak aktif) ===
            case 'sider':
            case 'siders': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                const lama = 604800000; // 7 hari
                const now = Date.now();
                const pesan = text || 'Harap aktif di grup!';
                const member = participants.map(v => v.id);
                let siderList = [];
                for (let id of member) {
                    const userData = global.db?.users?.[id];
                    const p = participants.find(u => u.id === id);
                    const isAdm = p?.admin === 'admin' || p?.admin === 'superadmin';
                    if (isAdm) continue;
                    if (!userData || now - (userData.lastseen || 0) > lama) {
                        siderList.push(id);
                    }
                }
                if (siderList.length === 0) return reply('✅ Tidak ada member sider di grup ini!');
                const teks = `*${siderList.length}/${member.length}* Member sider di grup ini!\n\n*Pesan:* _"${pesan}"_\n\n${siderList.map(v => `• @${v.split('@')[0]}`).join('\n')}`;
                await LilyBot.sendMessage(m.chat, { text: teks, mentions: siderList }, { quoted: m });
                break;
            }

            // === DOMAIN 20 ===
            case 'domain20': {
                if (!DinzTheCreator) return replyviex(mess.only.owner);
                replyviex('Fitur domain20 sedang dalam pengembangan.');
                break;
            }
        }
    }
};
