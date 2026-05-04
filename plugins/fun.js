module.exports = {
    name: 'fun',
    command: ['can', 'is', 'when', 'where', 'what', 'how', 'rate', 'cekkhodam', 'khodam', 'akankah', 'akan', 'will', 'apakah', 'apa', 'bisakah', 'bisa'],
    category: 'fun',
    desc: 'Fitur hiburan dan ramalan lucu',
    async run(DinzBotz, m, { command, text, prefix }) {
        if (!text) return m.reply(`Masukkan pertanyaan/teks!\nContoh: *${prefix}${command} apakah lily cantik?*`)

        const khodamList = ['Macan Kemayoran', 'Tuyul Jabrik', 'Kuntilanak Merah', 'Nyi Roro Kidul', 'Genderuwo Galau', 'Pocong Lari', 'Buaya Darat', 'Kadal Bintit', 'Semut Genit'];
        const genericAnswers = ['Iya', 'Tidak', 'Mungkin', 'Bisa jadi', 'Coba tanya lagi nanti', 'Lily rasa tidak', 'Tentu saja!'];
        
        switch (command) {
            case 'can':
            case 'is':
                m.reply(`*PERTANYAAN:* ${text}\n*JAWABAN:* ${genericAnswers[Math.floor(Math.random() * genericAnswers.length)]}`)
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
            case 'akankah':
            case 'akan':
            case 'will': {
                const answers = [
                    'Ya, pasti akan terjadi!', 'Tidak, sepertinya tidak akan.', 'Mungkin akan, mungkin tidak.',
                    'InsyaAllah akan terjadi!', 'Hmm, sulit diprediksi.', 'Pasti! Yakin saja!',
                    'Kayaknya nggak deh.', 'Akan terjadi kalau kamu mau berusaha.', 'Suatu saat nanti, pasti.',
                    'Nggak akan, maaf.', 'Tentu akan! Tunggu saja!', 'Hmm, aku ragu.',
                    'Akan! Percaya sama proses!', 'Kemungkinannya kecil.', 'Pasti akan, aku yakin!',
                    'Nggak akan, cari yang lain aja.', 'Akan, tapi butuh waktu.', 'InsyaAllah!',
                    'Kalau jodoh, pasti akan.', 'Akan terjadi di saat yang tepat!'
                ];
                m.reply(`🔮 *AKANKAH*\n\n*Pertanyaan:* ${text}\n*Jawaban:* ${answers[Math.floor(Math.random() * answers.length)]}`)
                break;
            }
            case 'apakah':
            case 'apa': {
                const answers = [
                    'Ya, tentu saja!', 'Tidak, sepertinya tidak.', 'Mungkin saja, coba lagi nanti.',
                    'Hmm... aku rasa iya.', 'Aku ragu, tapi bisa jadi.', 'Pasti! 100%!',
                    'Tidak mungkin.', 'Bisa jadi, siapa yang tau?', 'Menurutku sih iya.',
                    'Wah, kayaknya nggak deh.', 'Tentu, kenapa tidak?', 'Aku nggak tau, coba tanya yang lain.',
                    'Ya ampun, pasti lah!', 'Hmm... sepertinya tidak.', 'Aku yakin iya!',
                    'Nggak mungkin banget.', 'Mungkin, tapi jangan berharap terlalu tinggi.', 'Iya dong!',
                    'Nggak, maaf ya.', 'Bisa! Semangat!'
                ];
                m.reply(`❓ *APAKAH*\n\n*Pertanyaan:* ${text}\n*Jawaban:* ${answers[Math.floor(Math.random() * answers.length)]}`)
                break;
            }
            case 'bisakah':
            case 'bisa': {
                const answers = [
                    'Bisa banget! Percaya diri aja!', 'Hmm, kayaknya susah deh.', 'Tentu bisa! Semangat!',
                    'Nggak bisa, maaf.', 'Mungkin bisa, kalau usaha keras.', 'Pasti bisa! Jangan menyerah!',
                    'Agak susah sih, tapi bisa dicoba.', 'Bisa kok! Yakin deh!', 'Kayaknya nggak deh.',
                    'Bisa! Ayo buktikan!', 'Hmm... aku ragu.', 'Bisa banget! Gas terus!',
                    'Nggak bisa, coba yang lain.', 'Bisa! Percaya sama diri sendiri!',
                    'Susah, tapi bukan berarti nggak mungkin.', 'Absolutely! Kamu pasti bisa!',
                    'Kayaknya perlu usaha ekstra nih.', 'Bisa! Jangan ragukan dirimu!',
                    'Hmm, coba lagi nanti deh.', 'Bisa! Aku percaya kamu!'
                ];
                m.reply(`💪 *BISAKAH*\n\n*Pertanyaan:* ${text}\n*Jawaban:* ${answers[Math.floor(Math.random() * answers.length)]}`)
                break;
            }
        }
    }
}
