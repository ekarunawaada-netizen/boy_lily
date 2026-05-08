const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('⚠️ SUPABASE_URL or SUPABASE_ANON_KEY is missing in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Whitelist of valid columns in Supabase 'User' table
const USER_COLUMNS = [
  'id', 'name', 'registered', 'banned', 'bannedTime', 'premium', 'premiumTime', 
  'role', 'warning', 'limit', 'age', 'registeredAt', 'money', 'bank', 'exp', 
  'level', 'health', 'chip', 'pickaxe', 'sword', 'fishingrod', 'armor', 'atm', 
  'fullatm', 'rock', 'iron', 'gold', 'diamond', 'emerald', 'wood', 'string', 
  'trash', 'botol', 'kardus', 'kaleng', 'gelas', 'plastik', 'potion', 'umpan', 
  'petfood', 'makanan', 'common', 'uncommon', 'mythic', 'legendary', 'pet', 
  'pisang', 'anggur', 'mangga', 'jeruk', 'apel', 'bibitpisang', 'bibitanggur', 
  'bibitmangga', 'bibitjeruk', 'bibitapel', 'ayam', 'kambing', 'sapi', 'babi', 
  'harimau', 'gajah', 'paus', 'kepiting', 'gurita', 'cumi', 'buntal', 'dory', 
  'lumba', 'lobster', 'hiu', 'udang', 'orca', 'banteng', 'panda', 'buaya', 
  'kerbau', 'monyet', 'babihutan', 'horse', 'cat', 'dog', 'fox', 'robo', 
  'horseexp', 'catexp', 'dogexp', 'foxexp', 'roboexp', 'horselastfeed', 
  'catlastfeed', 'doglastfeed', 'foxlastfeed', 'robolastfeed', 'robodurability', 
  'armordurability', 'sworddurability', 'pickaxedurability', 
  'fishingroddurability', 'lastrampok', 'lastclaim', 'lastbansos', 'lastkerja', 
  'lastnebang', 'lastmining', 'lasthunt', 'lastberkebon', 'lastadventure', 
  'lastkill', 'lastmisi', 'lastdungeon', 'lastwar', 'lastsda', 'lastduel', 
  'afkTime', 'afkReason', 'extraData'
];

// Whitelist of valid columns in Supabase 'Group' table
const GROUP_COLUMNS = [
  'id', 'name', 'welcome', 'left', 'proses', 'done', 'mute', 'nsfw', 
  'antitoxic', 'antivirus', 'antiwame', 'antilink', 'openaigc', 
  'chatDinzID', 'autosticker', 'extraSettings'
];

/**
 * Sanitize data for Supabase (handles BigInt, filtering unknown columns)
 */
function sanitizeData(obj, allowedColumns) {
  const sanitized = {};
  for (const key in obj) {
    // Only include keys that exist in the database schema
    if (allowedColumns && !allowedColumns.includes(key)) continue;

    if (typeof obj[key] === 'bigint') {
      sanitized[key] = Number(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitized[key] = JSON.parse(JSON.stringify(obj[key], (k, v) => typeof v === 'bigint' ? v.toString() : v));
    } else {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
}

/**
 * Real-time User Upsert
 */
async function upsertUser(id, data) {
  try {
    const cleanData = sanitizeData(data, USER_COLUMNS);
    const { error } = await supabase
      .from('User')
      .upsert({ id, ...cleanData }, { onConflict: 'id' });

    if (error) throw error;
  } catch (e) {
    console.error(`[Supabase Error] User Upsert (${id}):`, e.message);
  }
}

/**
 * Real-time Group Upsert
 */
async function upsertGroup(id, data) {
  try {
    const cleanData = sanitizeData(data, GROUP_COLUMNS);
    const { error } = await supabase
      .from('Group')
      .upsert({ id, ...cleanData }, { onConflict: 'id' });
    if (error) throw error;
  } catch (e) {
    console.error(`[Supabase Error] Group Upsert (${id}):`, e.message);
  }
}

module.exports = { supabase, upsertUser, upsertGroup };
