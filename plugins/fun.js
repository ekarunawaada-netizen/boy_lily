module.exports = {
    name: 'fun',
    command: ['can', 'is', 'when', 'where', 'what', 'how', 'rate', 'cekkhodam', 'khodam'],
    category: 'fun',
    desc: 'Fitur hiburan dan ramalan lucu',
    async run(DinzBotz, m, { command, text, prefix }) {
        if (!text) return m.reply(`Masukkan pertanyaan/teks!\nContoh: *${prefix}${command} apakah lily cantik?*`)

        const khodamList = ['Macan Kemayoran', 'Tuyul Jabrik', 'Kuntilanak Merah', 'Nyi Roro Kidul', 'Genderuwo Galau', 'Pocong Lari', 'Buaya Darat', 'Kadal Bintit', 'Semut Genit'];
        const answers = ['Iya', 'Tidak', 'Mungkin', 'Bisa jadi', 'Coba tanya lagi nanti', 'Lily rasa tidak', 'Tentu saja!'];
        
        switch (command) {
            case 'can':
            case 'is':
                m.reply(`*PERTANYAAN:* ${text}\n*JAWABAN:* ${answers[Math.floor(Math.random() * answers.length)]}`)
                break;
            case 'when':
                m.reply(`*PERTANYAAN:* ${text}\n*JAWABAN:* ${Math.floor(Math.random() * 10) + 1} hari lagi`)
                break;
            case 'where':
                m.reply(`*PERTANYAAN:* ${text}\n*JAWABAN:* Di hatimu ❤️`)
                break;
            case 'how':
            case 'rate':
                m.reply(`*PERTANYAAN:* ${text}\n*RATING:* ${Math.floor(Math.random() * 100)}%`)
                break;
            case 'cekkhodam':
            case 'khodam':
                m.reply(`🔮 *CEK KHODAM*\n\nNama: *${text}*\nKhodam: *${khodamList[Math.floor(Math.random() * khodamList.length)]}*`)
                break;
        }
    }
}
