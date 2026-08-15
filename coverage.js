const fs=require('fs');
const src=JSON.parse(fs.readFileSync('source.json','utf8'));
const all=JSON.parse(fs.readFileSync('i18n/all.json','utf8'));
// rebuild DYNAMIC regexes (must mirror the userscript)
function rb(s){ return new RegExp(s); }
const DYN=[
 rb('^Total (\\d+)$'),
 rb('^Showdown · (\\d+)s$'),
 rb('^MIN \\$([\\d]+)  MAX \\$([\\d]+)$'),
 rb('^TARGET \\$([\\d]+)$'),
 rb('^Current Bet: \\$([\\d]+)$'),
 rb('^(.+?)\'s fleet$'),
 rb('^(.+?)\'s turn$'),
 rb('^Place your fleet \\((.+)\\)$'),
 rb('^TOP Score: (.+)$'),
 rb('^BALANCE (.+)\\$$'),
 rb('^CREDITS (.+)$'),
 rb('^(\\d+) coins$'),
 rb('^Your balance: (.+) coins$'),
 rb('^Bet amount set: (.+)$'),
 rb('^Invitation from: (.+)$'),
 rb('^Time left: (\\d+)s$'),
 rb('^Invitation sent to: (.+)$'),
 rb('^(.+) Lobby$'),
 rb('^(.+) wants to challenge you again$'),
 rb('^Declared (\\d+) (.+)$'),
 rb('^Declare exactly (\\d+) dice\\.$'),
 rb('^Declare exactly (\\d+) (.+)$'),
 rb("^Liar's Dice stand claim prepared: (.+)$"),
 rb('^(.+) believed (.+) and didn\'t roll\\.$'),
 rb('^(.+) wins the match\\.$'),
 rb('^(.+) lied\\. Point to (.+)$'),
 rb('^(.+) was wrong\\. Point to (.+)$'),
 rb('^Best real: (\\d+) (.+)$'),
 rb('^Permanently ghosted (.+)$'),
 rb('^Ghosted (.+) for (\\d+)h$'),
 rb('^Ignoring all invitations for (\\d+)h$'),
 rb('^Unghosted (.+)$'),
 rb('^Version (\\d+\\.\\d+\\.\\d+)$'),
 rb('^JACKPOT (.+)$')
];
const keys=Object.keys(src);
const dictStatic=new Set(keys);
// static keys (no placeholder) and dynamic keys (with {0}) both in dict
function isStaticKey(s){ return dictStatic.has(s); }
function dynMatch(str){
  for(const r of DYN){ if(r.test(str)) return true; }
  return false;
}
const lines=fs.readFileSync('strings-candidates.txt','utf8').split('\n').map(s=>s.replace(/\r/g,'')).filter(s=>s.length);
let covered=0, gapStatic=[], gapDyn=[];
for(const raw of lines){
  const s=raw;
  if(isStaticKey(s)){ covered++; continue; }
  if(s.includes('${')){
    // build test variants: replace ${...} with digit '9' and with word 'X'
    const num=s.replace(/\$\{[^}]*\}/g,'9');
    const word=s.replace(/\$\{[^}]*\}/g,'X');
    if(dynMatch(num)||dynMatch(word)){ covered++; continue; }
    gapDyn.push(s); continue;
  }
  gapStatic.push(s);
}
console.log('Candidate strings:', lines.length);
console.log('Covered (static key or dynamic pattern):', covered);
console.log('GAP static (not a dict key):', gapStatic.length);
gapStatic.forEach(s=>console.log('  STATIC-GAP:', JSON.stringify(s)));
console.log('GAP dynamic (no matching pattern):', gapDyn.length);
gapDyn.forEach(s=>console.log('  DYN-GAP:', JSON.stringify(s)));
