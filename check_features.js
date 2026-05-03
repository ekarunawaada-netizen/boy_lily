const fs = require('fs');

const featuresToCheck = [
    "autoread", "upchv2", "addsewa", "delwa", "onlypc", "onlygc", "self", "clearchat", 
    "pinchat", "unpinchat", "gconly", "public", "setpppanjang", "setppgcpanjang", "addcase", 
    "join", "bctext", "poll", "bcimage", "bcvideo", "creategc", "setexif", "userjid", 
    "setbotname", "setbotbio", "delppbot", "restart", "setppbot", "addprem", "delprem", 
    "addowner", "delowner", "addvn", "delvn", "addsticker", "delsticker", "addimage", 
    "delimage", "addvideo", "delvideo", "block", "unblock", "del", "leavegc", "pushkontak", 
    "pushkontakv2", "pushkontakv3", "pushkontakv4", "savekontakv", "savekontakv2", 
    "getkontak", "sendkontak", "jpm", "jpm2"
];

try {
    const code = fs.readFileSync('Furina.js', 'utf8');
    const regex = /case\s+['"]([^'"]+)['"]:/g;
    let match;
    const foundFeatures = new Set();
    
    while ((match = regex.exec(code)) !== null) {
        foundFeatures.add(match[1].toLowerCase());
    }
    
    const missingFeatures = [];
    const workingFeatures = [];
    
    for (const feature of featuresToCheck) {
        if (foundFeatures.has(feature.toLowerCase())) {
            workingFeatures.push(feature);
        } else {
            missingFeatures.push(feature);
        }
    }
    
    console.log("=== HASIL CEK FITUR DI FURINA.JS ===\n");
    console.log(`✅ Fitur yang ADA (${workingFeatures.length}):`);
    console.log(workingFeatures.length > 0 ? workingFeatures.join(', ') : "Tidak ada");
    console.log(`\n❌ Fitur yang TIDAK ADA / MUNGKIN BUG (${missingFeatures.length}):`);
    console.log(missingFeatures.length > 0 ? missingFeatures.join(', ') : "Tidak ada");
    
} catch (e) {
    console.error("Error membaca Furina.js:", e.message);
}
