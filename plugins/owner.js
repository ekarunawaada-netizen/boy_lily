const { exec } = require('child_process');
const fs = require('fs');
const { upsertUser } = require('../lib/supabase');

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
        'amountbug', 'addprem', 'delprem', 'addowner', 'delowner', 'adddev', 'deldev'
    ],
    category: 'owner',
    desc: 'Fitur khusus untuk owner bot',
    async run(LilyBot, m, { command, q, text, args, prefix, from,
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
                LilyBot.public = true;
                replyviex('✅ Bot diubah ke mode *PUBLIC*');
                break;

            case 'self':
                LilyBot.public = false;
                replyviex('✅ Bot diubah ke mode *SELF*');
                break;

            case 'clearall':
                await LilyBot.chatModify({
                    delete: true,
                    lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]
                }, m.chat);
                break;

            case 'pinchat':
                await LilyBot.chatModify({ pin: true }, m.chat);
                replyviex('📌 Berhasil Pin Chat');
                break;

            case 'unpinchat':
                await LilyBot.chatModify({ pin: false }, m.chat);
                replyviex('📌 Berhasil Unpin Chat');
                break;

            case 'owner':
            case 'developer':
            case 'dev': {
                const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:DinzID\nORG:DinzID;\nTEL;type=CELL;type=VOICE;waid=6289523888644:+62 895-2388-8644\nEND:VCARD';
                LilyBot.sendMessage(m.chat, {
                    contacts: { displayName: 'DinzID', contacts: [{ vcard }] }
                }, { quoted: m });
                break;
            }

            case 'setbotname':
                if (!text) return replyviex(`Contoh: ${prefix}${command} LilyMD`);
                await LilyBot.updateProfileName(text);
                replyviex('✅ Nama bot berhasil diubah');
                break;

            case 'setbotbio':
                if (!text) return replyviex(`Contoh: ${prefix}${command} I am a bot`);
                await LilyBot.updateProfileStatus(text);
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
                        const y = await LilyBot.decodeJid(i.id);
                        te += ` • @${y.split('@')[0]} (${i.name})\n`;
                    }
                    LilyBot.sendMessage(from, { text: te }, { quoted: m });
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

            case 'addprem': {
                if (!args[0]) return replyviex(`Penggunaan: ${prefix}${command} @user / nomor\nContoh: ${prefix}${command} 628xxx`);
                let jid = m.mentionedJid[0] ? m.mentionedJid[0] : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                if (!global.db.users[jid]) global.db.users[jid] = { premium: false, role: 'Beginner' };
                global.db.users[jid].premium = true;
                global.db.users[jid].role = 'Premium';
                await upsertUser(jid, global.db.users[jid]);
                replyviex(`✅ @${jid.split('@')[0]} sekarang adalah user Premium!`);
                break;
            }

            case 'delprem': {
                if (!args[0]) return replyviex(`Penggunaan: ${prefix}${command} @user / nomor\nContoh: ${prefix}${command} 628xxx`);
                let jid = m.mentionedJid[0] ? m.mentionedJid[0] : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                if (!global.db.users[jid]) return replyviex('User tidak ditemukan di database!');
                global.db.users[jid].premium = false;
                global.db.users[jid].role = 'Beginner';
                await upsertUser(jid, global.db.users[jid]);
                replyviex(`✅ @${jid.split('@')[0]} sekarang bukan user Premium lagi.`);
                break;
            }

            case 'addowner': {
                if (!args[0]) return replyviex(`Penggunaan: ${prefix}${command} @user / nomor\nContoh: ${prefix}${command} 628xxx`);
                let jid = m.mentionedJid[0] ? m.mentionedJid[0] : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                if (!global.db.users[jid]) global.db.users[jid] = { role: 'Beginner' };
                global.db.users[jid].role = 'Owner';
                await upsertUser(jid, global.db.users[jid]);
                replyviex(`✅ @${jid.split('@')[0]} sekarang memiliki role Owner di database!`);
                break;
            }

            case 'delowner': {
                if (!args[0]) return replyviex(`Penggunaan: ${prefix}${command} @user / nomor\nContoh: ${prefix}${command} 628xxx`);
                let jid = m.mentionedJid[0] ? m.mentionedJid[0] : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                if (!global.db.users[jid]) return replyviex('User tidak ditemukan di database!');
                global.db.users[jid].role = 'Beginner';
                await upsertUser(jid, global.db.users[jid]);
                replyviex(`✅ Role Owner @${jid.split('@')[0]} telah dihapus.`);
                break;
            }

            case 'adddev': {
                if (!args[0]) return replyviex(`Penggunaan: ${prefix}${command} @user / nomor\nContoh: ${prefix}${command} 628xxx`);
                let jid = m.mentionedJid[0] ? m.mentionedJid[0] : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                if (!global.db.users[jid]) global.db.users[jid] = { registered: true, role: 'Beginner' };
                global.db.users[jid].role = 'Developer';
                global.db.users[jid].registered = true;
                
                // Directly adapting the user's requested logic using the project's helper
                await upsertUser(jid, global.db.users[jid]);
                
                replyviex(`✅ @${jid.split('@')[0]} sekarang terdaftar sebagai Developer di database!`);
                break;
            }

            case 'deldev': {
                if (!args[0]) return replyviex(`Penggunaan: ${prefix}${command} @user / nomor\nContoh: ${prefix}${command} 628xxx`);
                let jid = m.mentionedJid[0] ? m.mentionedJid[0] : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                if (!global.db.users[jid]) return replyviex('User tidak ditemukan di database!');
                global.db.users[jid].role = 'Beginner';
                await upsertUser(jid, global.db.users[jid]);
                replyviex(`✅ Role Developer @${jid.split('@')[0]} telah dihapus.`);
                break;
            }
        }
    }
};

