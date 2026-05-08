const { supabase } = require('./supabase');

/**
 * CloudDBAdapter Replacement
 * Now uses direct Supabase SQL queries for better performance and lower bandwidth.
 */
class CloudDBAdapter {
    constructor(tableName = 'User') {
        this.tableName = tableName;
    }

    async read() {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*');
            
            if (error) throw error;
            
            // Transform array to object indexed by ID (common pattern for global.db)
            return data.reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {});
        } catch (e) {
            console.error(`[CloudDBAdapter] Read Error:`, e.message);
            return null;
        }
    }

    async write(obj) {
        // obj is usually global.db.users or similar
        // For efficiency, we should ideally upsert only changed rows,
        // but for a full write replacement:
        const rows = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));

        try {
            const { error } = await supabase
                .from(this.tableName)
                .upsert(rows, { onConflict: 'id' });
            
            if (error) throw error;
            return true;
        } catch (e) {
            console.error(`[CloudDBAdapter] Write Error:`, e.message);
            return false;
        }
    }

    /**
     * Optimized: Update a single record
     */
    async updateOne(id, data) {
        try {
            const { error } = await supabase
                .from(this.tableName)
                .upsert({ id, ...data }, { onConflict: 'id' });
            if (error) throw error;
            return true;
        } catch (e) {
            console.error(`[CloudDBAdapter] updateOne Error:`, e.message);
            return false;
        }
    }
}

module.exports = CloudDBAdapter;
