const fs=require('fs');
const src=JSON.parse(fs.readFileSync('source.json','utf8'));
const langs=['cn','tw','de','fr','ru','ua'];
const keys=Object.keys(src);
console.log('Total source keys:', keys.length);
// validation: every key has all langs
let missing=0;
for(const k of keys){
  for(const l of langs){ if(!src[k][l] && src[k][l]!=='') { console.log('MISSING',l,'for',JSON.stringify(k)); missing++; } }
}
console.log('Missing translations:', missing);
fs.mkdirSync('i18n',{recursive:true});
// en.json identity
const en={}; for(const k of keys) en[k]=k;
fs.writeFileSync('i18n/en.json', JSON.stringify(en,null,2));
for(const l of langs){
  const o={}; for(const k of keys) o[k]=src[k][l];
  fs.writeFileSync('i18n/'+l+'.json', JSON.stringify(o,null,2));
}
console.log('Wrote i18n/en.json +', langs.map(l=>l+'.json').join(', '));
// also a combined file for convenience
const all={en}; for(const l of langs) all[l]=JSON.parse(fs.readFileSync('i18n/'+l+'.json','utf8'));
fs.writeFileSync('i18n/all.json', JSON.stringify(all,null,2));
console.log('Wrote i18n/all.json (combined)');
