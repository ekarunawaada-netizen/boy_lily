const { exec } = require('child_process');

module.exports = {
    name: 'owner',
    alias: ['eval', 'exec', 'restart', 'update'],
    category: 'owner',
    desc: 'Fitur khusus untuk owner bot',
    async run(DinzBotz, m, { command, q, isOwner, mess, replyviex }) {
        if (!isOwner) return m.reply(mess.only.owner);

        try {
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
                default:
                    m.reply('Perintah owner tidak ditemukan di plugin ini.');
            }
        } catch (error) {
            console.error(error);
            m.reply('Terjadi kesalahan pada perintah owner.');
        }
    }
}
