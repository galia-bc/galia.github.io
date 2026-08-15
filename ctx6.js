const fs=require('fs');
const s=fs.readFileSync('club-gaming.root.js','utf8');
let k=s.indexOf('getToggleRows(){');
let seg=s.slice(k, k+3000);
// print only label/description pairs
let re=/label:`([^`]*)`[^}]*?description:`([^`]*)`/g, m;
while((m=re.exec(seg))){ console.log('LABEL:', m[1]); console.log('  DESC:', m[2]); }
console.log('\n=== drawSoundVolumeSlider body ===');
let i=s.indexOf('drawSoundVolumeSlider(');
// find the method: drawSoundVolumeSlider(e){...}
let j=s.indexOf('drawSoundVolumeSlider(e)');
if(j<0) j=s.indexOf('drawSoundVolumeSlider(e=');
if(j<0) j=s.indexOf('drawSoundVolumeSlider(');
console.log(s.slice(j, j+360).replace(/\n/g,' '));
console.log('\n=== search Sound Volume label ===');
let m2=/Sound Volume|Volume/.exec(s); console.log('found at', m2?.index);
