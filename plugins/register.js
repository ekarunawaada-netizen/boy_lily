module.exports = {
    name: 'register',
    command: ['daftar', 'register'],
    category: 'main',
    desc: 'Mendaftar sebagai pengguna bot',
    async run(DinzBotz, m, { prefix, command, args, sender }) {
        const user = global.db.users[sender];
        
        if (user.registered) return m.reply(`Kamu sudah terdaftar sebelumnya kak! ✨\nKetik *.profile* untuk melihat data dirimu.`);
        
        if (!m.text.includes('.')) return m.reply(`Format salah!\nContoh: *${prefix}${command} Nama.Umur*\nContoh: *${prefix}${command} Lily.18*`);
        
        let [name, age] = m.text.split('.').map(v => v.trim());
        if (!name || !age) return m.reply(`Nama dan umur harus diisi kak!`);
        if (name.length > 20) return m.reply(`Nama kepanjangan kak, maksimal 20 karakter ya.`);
        if (isNaN(age)) return m.reply(`Umur harus berupa angka kak!`);
        if (age > 100 || age < 5) return m.reply(`Umur tidak masuk akal kak...`);

        // Simpan ke Database
        user.registered = true;
        user.name = name;
        user.age = parseInt(age);
        user.registeredAt = Date.now();
        user.limit = 50; // Bonus limit setelah daftar
        user.balance = 1000; // Bonus saldo awal

        const text = `🎉 *PENDAFTARAN BERHASIL* 🎉

╭──「 *DATA USER* 」──✦
│ 👤 ɴᴀᴍᴀ : ${name}
│ 🎂 ᴜᴍᴜʀ : ${age} Tahun
│ 🎫 ʟɪᴍɪᴛ : ${user.limit} (Bonus)
│ 💳 sᴀʟᴅᴏ : Rp ${user.balance.toLocaleString()}
│ 📅 ᴡᴀᴋᴛᴜ : ${new Date().toLocaleString()}
╰───────────────────✦

Ketik *.profile* untuk melihat detail profilemu.
Terima kasih sudah mendaftar di *Lily-MD*! ✨`;

        await m.reply(text);
    }
};
