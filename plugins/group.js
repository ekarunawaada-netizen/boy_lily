module.exports = {
    name: 'group',
    command: ['hidetag', 'ht', 'ht2', 'everyone', 'totag', 'tagall', 'promote', 'demote', 'kick', 'kickall', 'add', 'setnamegc', 'setgroupname', 'setsubject', 'setdesc', 'setdesk', 'group', 'linkgc', 'resetlink'],
    category: 'group',
    desc: 'Fitur manajemen grup (Admin only)',
    async run(DinzBotz, m, { command, text, q, isRegistered, isBotAdmins, DinzTheCreator, groupMetadata, participants, mess, reply, replyviex, prefix }) {
        if (!m.isGroup) return reply(mess.group);
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦\n\nDENGAN DAFTAR KAMU BISA AKSES BOT SEPUASNYA\n\n💂‍♀: Kenapa harus daftar sih?\n🍁: Agar bot mengenal siapa anda\n💂‍♀: Ribet banget harus daftar segala\n🍁: Jika tidak daftar, Anda tidak bisa menggunakan fitur bot");
        }

        const isAdmins = participants.filter(v => v.admin !== null).map(v => v.id).includes(m.sender);
        if (!isAdmins && !DinzTheCreator) return reply(mess.only.admin);

        switch (command) {
            case 'hidetag':
            case 'everyone':
            case 'ht': {
                let mem = participants.map(a => a.id);
                DinzBotz.sendMessage(m.chat, {
                    text: `@${m.chat}\n${text || ''}`,
                    contextInfo: {
                        mentionedJid: mem,
                        groupMentions: [{ groupSubject: 'everyone', groupJid: m.chat }]
                    }
                });
                break;
            }
            case 'ht2': {
                DinzBotz.sendMessage(m.chat, {
                    text: q ? q : "",
                    mentions: participants.map(a => a.id)
                }, { quoted: m });
                break;
            }
            case 'totag': {
                if (!m.quoted) return replyviex(`Reply message with caption ${prefix + command}`);
                DinzBotz.sendMessage(m.chat, {
                    forward: m.quoted.fakeObj,
                    mentions: participants.map(a => a.id)
                });
                break;
            }
            case 'tagall': {
                let teks = `*TAG ALL*\n\nMessage: ${text || 'No Message'}\n\n`;
                for (let mem of participants) {
                    teks += `○ @${mem.id.split('@')[0]}\n`;
                }
                DinzBotz.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m });
                break;
            }
            case 'promote': {
                if (!isBotAdmins) return reply(mess.only.Badmin);
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await DinzBotz.groupParticipantsUpdate(m.chat, [users], 'promote');
                reply('Success Promote');
                break;
            }
            case 'demote': {
                if (!isBotAdmins) return reply(mess.only.Badmin);
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await DinzBotz.groupParticipantsUpdate(m.chat, [users], 'demote');
                reply('Success Demote');
                break;
            }
            case 'kick': {
                if (!isBotAdmins) return reply(mess.only.Badmin);
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await DinzBotz.groupParticipantsUpdate(m.chat, [users], 'remove');
                break;
            }
            case 'add': {
                if (!isBotAdmins) return reply(mess.only.Badmin);
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await DinzBotz.groupParticipantsUpdate(m.chat, [users], 'add');
                break;
            }
            case 'group': {
                if (!isBotAdmins) return reply(mess.only.Badmin);
                if (text === 'open') {
                    await DinzBotz.groupSettingUpdate(m.chat, 'not_announcement');
                    reply('Grup Dibuka');
                } else if (text === 'close') {
                    await DinzBotz.groupSettingUpdate(m.chat, 'announcement');
                    reply('Grup Ditutup');
                } else {
                    reply(`Format salah! Contoh: ${prefix + command} open/close`);
                }
                break;
            }
        }
    }
}
