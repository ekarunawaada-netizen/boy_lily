require('dotenv').config();
const { proto, initAuthCreds, BufferJSON } = require('lily-baileys');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const usePrismaAuthState = async (sessionId) => {
    const writeData = async (data, id) => {
        const informationToStore = JSON.parse(JSON.stringify(data, BufferJSON.replacer));
        const idStr = String(id);
        
        await prisma.sessionInfo.upsert({
            where: { sessionId: `${sessionId}-${idStr}` },
            update: { sessionData: JSON.stringify(informationToStore) },
            create: { sessionId: `${sessionId}-${idStr}`, sessionData: JSON.stringify(informationToStore) }
        });
    };

    const readData = async (id) => {
        const idStr = String(id);
        try {
            const data = await prisma.sessionInfo.findUnique({
                where: { sessionId: `${sessionId}-${idStr}` }
            });
            if (data && data.sessionData) {
                return JSON.parse(data.sessionData, BufferJSON.reviver);
            }
            return null;
        } catch (error) {
            console.error(`Error reading session data for ${idStr}:`, error);
            return null;
        }
    };

    const removeData = async (id) => {
        const idStr = String(id);
        try {
            await prisma.sessionInfo.delete({
                where: { sessionId: `${sessionId}-${idStr}` }
            });
        } catch (error) {
            // Ignore error if not found
        }
    };

    const creds = await readData('creds') || initAuthCreds();

    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    await Promise.all(
                        ids.map(async (id) => {
                            let value = await readData(`${type}-${id}`);
                            if (type === 'app-state-sync-key' && value) {
                                value = proto.Message.AppStateSyncKeyData.fromObject(value);
                            }
                            data[id] = value;
                        })
                    );
                    return data;
                },
                set: async (data) => {
                    const tasks = [];
                    for (const category in data) {
                        for (const id in data[category]) {
                            const value = data[category][id];
                            const key = `${category}-${id}`;
                            tasks.push(value ? writeData(value, key) : removeData(key));
                        }
                    }
                    await Promise.all(tasks);
                }
            }
        },
        saveCreds: () => {
            return writeData(creds, 'creds');
        }
    };
};

module.exports = { usePrismaAuthState };
