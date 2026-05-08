require('dotenv').config();
const fs = require('fs');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function runMigration() {
    console.log('🔄 Memulai proses migrasi dari database.json ke Supabase (PostgreSQL)...');

    // 1. Baca database lokal
    if (!fs.existsSync('./database/database.json')) {
        console.error('❌ File database.json tidak ditemukan! Pastikan file ada di ./database/database.json');
        process.exit(1);
    }

    const rawData = fs.readFileSync('./database/database.json', 'utf-8');
    const db = JSON.parse(rawData);

    // 2. Migrasi Users
    if (db.users) {
        const users = Object.entries(db.users);
        console.log(`\n👥 Memigrasikan ${users.length} Users...`);
        let count = 0;

        for (const [jid, data] of users) {
            // Ekstrak properti utama
            const {
                registered = false,
                banned = false,
                bannedTime = 0,
                premium = false,
                premiumTime = 0,
                role = "Beginner",
                warning = 0,
                limit = 20,
                money = 0,
                bank = 0,
                exp = 0,
                level = 1,
                health = 1000,
                _id, // Buang _id bawaan MongoDB
                ...rpgProperties // Sisanya (wood, iron, lastclaim, dll)
            } = data;

            // Pastikan BigInt aman
            const cleanData = {
                registered, banned, bannedTime: BigInt(bannedTime),
                premium, premiumTime: BigInt(premiumTime),
                role, warning, limit,
                money: BigInt(money), bank: BigInt(bank),
                exp: BigInt(exp), level: level || 1, health,
            };

            // Masukkan semua properti RPG yang ada di schema
            const schemaFields = [
                'chip', 'pickaxe', 'sword', 'fishingrod', 'armor', 'atm', 'fullatm',
                'rock', 'iron', 'gold', 'diamond', 'emerald', 'wood', 'string',
                'potion', 'umpan', 'petfood', 'makanan',
                'pisang', 'anggur', 'mangga', 'jeruk', 'apel',
                'bibitpisang', 'bibitanggur', 'bibitmangga', 'bibitjeruk', 'bibitapel',
                'ayam', 'kambing', 'sapi', 'babi', 'harimau', 'gajah',
                'lastrampok', 'lastclaim', 'lastbansos', 'lastkerja', 'lastnebang', 'lastmining', 'lasthunt', 'lastberkebon',
                'afkTime', 'afkReason'
            ];

            for (const field of schemaFields) {
                if (rpgProperties[field] !== undefined) {
                    if (['lastrampok', 'lastclaim', 'lastbansos', 'lastkerja', 'lastnebang', 'lastmining', 'lasthunt', 'lastberkebon', 'afkTime', 'chip', 'fullatm'].includes(field)) {
                        cleanData[field] = BigInt(rpgProperties[field] || 0);
                    } else {
                        cleanData[field] = rpgProperties[field];
                    }
                    delete rpgProperties[field];
                }
            }

            // Sisa yang tidak ada di schema masuk ke extraData
            cleanData.extraData = rpgProperties;

            try {
                await prisma.user.upsert({
                    where: { id: jid },
                    update: cleanData,
                    create: { id: jid, ...cleanData }
                });
                count++;
            } catch (err) {
                console.error(`Gagal migrasi user ${jid}:`, err.message);
            }
        }
        console.log(`✅ Berhasil migrasi ${count} Users.`);
    }

    // 3. Migrasi Groups
    if (db.groups) {
        const groups = Object.entries(db.groups);
        console.log(`\n🏘️ Memigrasikan ${groups.length} Groups...`);
        let count = 0;

        for (const [jid, data] of groups) {
            const {
                name = "", welcome = false, left = false, proses = false,
                done = false, mute = false, nsfw = false, antitoxic = false,
                antivirus = false, antiwame = false, antilink = false,
                openaigc = false, chatDinzID = false, autosticker = false,
                _id,
                ...extraSettings
            } = data;

            try {
                await prisma.group.upsert({
                    where: { id: jid },
                    update: {
                        name, welcome, left, proses, done, mute, nsfw,
                        antitoxic, antivirus, antiwame, antilink,
                        openaigc, chatDinzID, autosticker, extraSettings
                    },
                    create: {
                        id: jid,
                        name, welcome, left, proses, done, mute, nsfw,
                        antitoxic, antivirus, antiwame, antilink,
                        openaigc, chatDinzID, autosticker, extraSettings
                    }
                });
                count++;
            } catch (err) {
                console.error(`Gagal migrasi grup ${jid}:`, err.message);
            }
        }
        console.log(`✅ Berhasil migrasi ${count} Groups.`);
    }

    // 4. Migrasi Chats
    if (db.chats) {
        const chats = Object.entries(db.chats);
        console.log(`\n💬 Memigrasikan ${chats.length} Chats...`);
        let count = 0;

        for (const [jid, data] of chats) {
            const { name = "", totalChat = {}, _id, ...rest } = data;

            try {
                await prisma.chat.upsert({
                    where: { id: jid },
                    update: { name, totalChat },
                    create: { id: jid, name, totalChat }
                });
                count++;
            } catch (err) {
                console.error(`Gagal migrasi chat ${jid}:`, err.message);
            }
        }
        console.log(`✅ Berhasil migrasi ${count} Chats.`);
    }

    // 5. Migrasi Settings
    if (db.settings) {
        const settings = Object.entries(db.settings);
        console.log(`\n⚙️ Memigrasikan ${settings.length} Bot Settings...`);
        let count = 0;

        for (const [jid, data] of settings) {
            try {
                await prisma.botSetting.upsert({
                    where: { id: jid },
                    update: { ...data },
                    create: { id: jid, ...data }
                });
                count++;
            } catch (err) {
                console.error(`Gagal migrasi setting ${jid}:`, err.message);
            }
        }
        console.log(`✅ Berhasil migrasi ${count} Settings.`);
    }

    console.log('\n🎉 MIGRASI SELESAI! Anda sekarang bisa menghapus folder database dan menjalankan bot murni dari Supabase.');
    process.exit(0);
}

runMigration().catch(e => {
    console.error(e);
    process.exit(1);
});
