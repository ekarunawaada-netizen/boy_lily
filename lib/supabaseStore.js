const { supabase } = require('./supabase');

/**
 * Supabase-backed store for Baileys
 * This persists contacts, chats, and messages to Supabase.
 */
function useSupabaseStore(store) {
  const saveToSupabase = async (key, value) => {
    try {
      const { error } = await supabase
        .from('BaileysStore')
        .upsert({ 
          key, 
          value: JSON.parse(JSON.stringify(value)), // Ensure it's serializable
          updatedAt: new Date().toISOString()
        }, { onConflict: 'key' });
      if (error) throw error;
    } catch (e) {
      console.error(`[Store Sync Error] Key ${key}:`, e.message);
    }
  };

  const loadFromSupabase = async (key) => {
    try {
      const { data, error } = await supabase
        .from('BaileysStore')
        .select('value')
        .eq('key', key)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is not found
      return data?.value || null;
    } catch (e) {
      console.error(`[Store Load Error] Key ${key}:`, e.message);
      return null;
    }
  };

  return {
    async load() {
      const contacts = await loadFromSupabase('contacts');
      const chats = await loadFromSupabase('chats');
      if (contacts) Object.assign(store.contacts, contacts);
      if (chats) store.chats.insertIfAbsent(...chats);
      console.log('✅ Baileys store loaded from Supabase');
    },
    bind(ev) {
      ev.on('contacts.upsert', async (contacts) => {
        // Sync contacts
        await saveToSupabase('contacts', store.contacts);
      });

      ev.on('chats.upsert', async () => {
        // Sync chats
        await saveToSupabase('chats', store.chats.all());
      });

      // We can also sync messages if needed, but it might be heavy.
      // Usually contacts and chats are enough for "memory".
    }
  };
}

module.exports = { useSupabaseStore };
