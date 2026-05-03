const { exec } = require('child_process');

module.exports = {
    name: 'owner',
    command: ['eval', 'exec', 'restart', 'update', 'public', 'self', 'clearall', 'pinchat', 'unpinchat', 'owner', 'developer', 'dev', 'setbotname', 'setbotbio'],
    category: 'owner',
    desc: 'Fitur khusus untuk owner bot',
    async run(DinzBotz, m, { command, q, DinzTheCreator, mess, replyviex, isRegistered, replydaftar }) {
        if (!DinzTheCreator) return m.reply(mess.only.owner);

        switch (command) {
            case 'update':
                await m.reply('Memperbarui dari GitHub...');
                exec('git pull origin main', (err, stdout, stderr) => {
                    if (err) return m.reply(`Error: ${stderr}`);
                    m.reply(`Sukses:\n${stdout}`);
                });
                break;
            case 'restart':
                await m.reply('Merestart bot...');
                process.exit();
                break;
            case 'public':
                DinzBotz.public = true;
                replyviex("*Berhasil Mengubah Ke Penggunaan Publik*");
                break;
            case 'self':
                DinzBotz.public = false;
                replyviex("*Sukses*");
                break;
            case 'clearall':
                await DinzBotz.chatModify({
                    delete: true,
                    lastMessages: [{
                        key: m.key,
                        messageTimestamp: m.messageTimestamp
                    }]
                }, m.chat);
                break;
            case 'pinchat':
                await DinzBotz.chatModify({ pin: true }, m.chat);
                replyviex("*Berhasil Pin Chat*");
                break;
            case 'unpinchat':
                await DinzBotz.chatModify({ pin: false }, m.chat);
                replyviex("*Berhasil Unpin Chat*");
                break;
            case 'owner':
            case 'developer':
            case 'dev':
                const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:DinzID\n' + 'ORG:DinzID;\n' + 'TEL;type=CELL;type=VOICE;waid=6289523888644:+62 895-2388-8644\n' + 'END:VCARD';
                DinzBotz.sendMessage(m.chat, { contacts: { displayName: 'DinzID', contacts: [{ vcard }] } }, { quoted: m });
                break;
            case 'setbotname':
                if (!text) return replyviex(`Dimana namanya?\nContoh: ${prefix + command} LilyMD`);
                await DinzBotz.updateProfileName(text);
                replyviex(`Success in changing the name of bot's number`);
                break;
            case 'setbotbio':
                if (!text) return replyviex(`Dimana teksnya?\nContoh: ${prefix + command} I am a bot`);
                await DinzBotz.updateProfileStatus(text);
                replyviex(`Success in changing the bio of bot's number`);
                break;
        }
    }
}
