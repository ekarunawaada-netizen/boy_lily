const fs = require('fs');
const code = fs.readFileSync('Furina.js', 'utf8').split('\n');

const toFind = [
  // group
  'setnamegc','setgroupname','setsubject','setdesc','setdesk',
  'getpp','setppgroup','setgcpp','setgrouppp',
  'deleteppgroup','delppgc','deleteppgc','delppgroup',
  'deleteppbot','delppbot',
  'linkgc','linkgroup','gclink','grouplink',
  'kickall','leavegc','closetime','opentime',
  'delete','del','ephemeral','resetlink','revoke','resetlinkgc',
  // owner
  'jadibot','listjadibot','delsesi','clearsession',
  'amountbug','xandroid','xios','xios2','xandroid2','xgc',
  // broadcast
  'bctext','broadcasttext','broadcast','broadcastimage','bcimage','bcvideo',
  // admin/block
  'block','ban','unblock','unban','listblock','listban',
  // sewa
  'addsewa','delsewa','delwa','listsewa','ceksewa','sewa','sewabot',
  // moderation
  'autostickergc','autosticker','antivirus','antivirtex',
  'antilinkytvid','antilinkytch','antilinkinstagram','antilinkfacebook',
  'antilinktwitter','antilinktwt','antilinkall','antitoxic','antibadword',
  'antiwame','antilinkch','antilink','antilinkgc','antilinktt','antilinkig','antilinkfb'
];

const results = {};
toFind.forEach(k => {
  code.forEach((line, i) => {
    if (line.toLowerCase().includes(`case "${k}"`) || line.toLowerCase().includes(`case '${k}'`)) {
      if (!results[k]) results[k] = [];
      results[k].push(i + 1);
    }
  });
});

Object.entries(results).forEach(([k, lines]) => {
  console.log(`[${k}] -> baris: ${lines.join(', ')}`);
});
