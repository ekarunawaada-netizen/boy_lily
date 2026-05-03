const { exec } = require('child_process');
const fs = require('fs');

module.exports = {
    name: 'owner',
    command: [
        'eval', 'exec', 'restart', 'update',
        'public', 'self',
        'clearall', 'pinchat', 'unpinchat',
        'owner', 'developer', 'dev',
        'setbotname', 'setbotbio',
        'jadibot', 'listjadibot',
        'totalfitur', 'delsesi', 'clearsession',
        'amountbug'
    ],
    category: 'owner',
    desc: 'Fitur khusus untuk owner bot',
    async run(DinzBotz, m, { command, q, text, args, prefix, from,
        DinzTheCreator, mess, replyviex, reply, isRegistered, replydaftar,
        totalfitur, DinzIDtotalpitur }) {

        if (!DinzTheCreator) return m.reply(mess.only.owner);

        switch (command) {
            case 'update':
                await m.reply('🔄 Memperbarui dari GitHub...');
                exec('git pull origin main', (err, stdout, stderr) => {
                    if (err) return m.reply(`❌ Error:\n${stderr}`);
                    m.reply(`✅ Update berhasil:\n${stdout}`);
                });
                break;

            case 'restart':
                await m.reply('🔄 Merestart bot...');
                process.exit(0);
                break;

            case 'eval': {
                if (!q) return replyviex('Masukkan kode yang ingin dieval!');
                const { inspect } = require('util');
                try {
                    let evaled = await eval(q);
                    if (typeof evaled !== 'string') evaled = inspect(evaled);
                    replyviex(evaled);
                } catch (e) {
                    replyviex(String(e));
                }
                break;
            }

            case 'exec': {
                if (!q) return replyviex('Masukkan perintah terminal!');
                exec(q, (err, stdout, stderr) => {
                    if (err) return replyviex(`❌ Error:\n${stderr}`);
                    replyviex(stdout || 'Selesai (no output)');
                });
                break;
            }

            case 'public':
                DinzBotz.public = true;
                replyviex('✅ Bot diubah ke mode *PUBLIC*');
                break;

            case 'self':
                DinzBotz.public = false;
                replyviex('✅ Bot diubah ke mode *SELF*');
                break;

            case 'clearall':
                await DinzBotz.chatModify({
                    delete: true,
                    lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]
                }, m.chat);
                break;

            case 'pinchat':
                await DinzBotz.chatModify({ pin: true }, m.chat);
                replyviex('📌 Berhasil Pin Chat');
                break;

            case 'unpinchat':
                await DinzBotz.chatModify({ pin: false }, m.chat);
                replyviex('📌 Berhasil Unpin Chat');
                break;

            case 'owner':
            case 'developer':
            case 'dev': {
                const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:DinzID\nORG:DinzID;\nTEL;type=CELL;type=VOICE;waid=6289523888644:+62 895-2388-8644\nEND:VCARD';
                DinzBotz.sendMessage(m.chat, {
                    contacts: { displayName: 'DinzID', contacts: [{ vcard }] }
                }, { quoted: m });
                break;
            }

            case 'setbotname':
                if (!text) return replyviex(`Contoh: ${prefix}${command} LilyMD`);
                await DinzBotz.updateProfileName(text);
                replyviex('✅ Nama bot berhasil diubah');
                break;

            case 'setbotbio':
                if (!text) return replyviex(`Contoh: ${prefix}${command} I am a bot`);
                await DinzBotz.updateProfileStatus(text);
                replyviex('✅ Bio bot berhasil diubah');
                break;

            case 'jadibot':
                replyviex('🛠️ Fitur jadibot tersedia di next update!');
                break;

            case 'listjadibot': {
                try {
                    let user = [...new Set([...(global.conns || []).filter(c => c.user).map(c => c.user)])];
                    let te = '*🤖 Rentbot List*\n\n';
                    for (let i of user) {
                        const y = await DinzBotz.decodeJid(i.id);
                        te += ` • @${y.split('@')[0]} (${i.name})\n`;
                    }
                    DinzBotz.sendMessage(from, { text: te }, { quoted: m });
                } catch {
                    replyviex('Belum ada pengguna yang menyewa bot');
                }
                break;
            }

            case 'totalfitur': {
                const total = typeof totalfitur === 'function' ? totalfitur() :
                              typeof DinzIDtotalpitur === 'function' ? DinzIDtotalpitur() : '?';
                replyviex(`📊 *Total Fitur Bot*\n\n✅ ${total} Fitur Tersedia`);
                break;
            }

            case 'delsesi':
            case 'clearsession': {
                try {
                    const sessionDir = './session';
                    const files = fs.readdirSync(sessionDir);
                    let deleted = 0;
                    for (const f of files) {
                        if (f !== 'creds.json') {
                            fs.unlinkSync(`${sessionDir}/${f}`);
                            deleted++;
                        }
                    }
                    replyviex(`✅ Berhasil hapus ${deleted} file sesi (kecuali creds.json)`);
                } catch (e) {
                    replyviex('Gagal hapus sesi: ' + e.message);
                }
                break;
            }

            case 'amountbug':
                replyviex('🐛 Fitur amountbug sedang dalam pengembangan.');
                break;
        }
    }
};

