const fs = require('fs');
const path = require('path');

const features = [
  "autoread", "upchv2", "addsewa", "delwa", "onlypc", "onlygc", "self", "clearchat", 
  "pinchat", "unpinchat", "gconly", "public", "setpppanjang", "setppgcpanjang", 
  "addcase", "join", "bctext", "poll", "bcimage", "bcvideo", "creategc", "setexif", 
  "userjid", "setbotname", "setbotbio", "delppbot", "restart", "setppbot", "addprem", 
  "delprem", "addowner", "delowner", "addvn", "delvn", "addsticker", "delsticker", 
  "addimage", "delimage", "addvideo", "delvideo", "block", "unblock", "del", "leavegc", 
  "pushkontak", "pushkontakv2", "pushkontakv3", "pushkontakv4", "savekontakv", 
  "savekontakv2", "getkontak", "sendkontak", "jpm", "jpm2",
  "list", "addlist", "dellist", "update", "jeda", "tambah", "kurang", "kali", "bagi", 
  "delsetdone", "changedone", "setdone", "delproses", "changeproses", "setproses", 
  "proses", "done"
];

const furinaPath = path.join(__dirname, 'Furina.js');
const furinaCode = fs.readFileSync(furinaPath, 'utf8');

const missingFeatures = [];
const foundFeatures = [];

features.forEach(feature => {
  const regex = new RegExp(`case\\s+['"\`]${feature}['"\`]\\s*:`, 'i');
  if (regex.test(furinaCode)) {
    foundFeatures.push(feature);
  } else {
    missingFeatures.push(feature);
  }
});

console.log("=== Found Features ===");
foundFeatures.forEach(f => console.log(`+ ${f}`));

console.log("\n=== Missing Features ===");
missingFeatures.forEach(f => console.log(`- ${f}`));
