const fs=require('fs');
const s=fs.readFileSync('club-gaming.root.js','utf8');
// getSections returns array; capture a big chunk after first 'getSections(){return[{'
let i=s.indexOf('getSections(){return[{');
console.log(s.slice(i, i+1400).replace(/\n/g,' '));
console.log('\n===== settings run draw text (look for DrawText/DrawTextFit in settings) =====');
// find the settings run method body
let j=s.indexOf('run(){');
// there are many run(){; find the one belonging to settings menu by proximity to getSections
let k=s.indexOf('getSections(){return[{');
// search forward for 'run(){' after k within 4000 chars
let m=/run\(\)\{/.exec(s.slice(k,k+6000));
if(m){let rs=k+m.index; console.log(s.slice(rs, rs+1200).replace(/\n/g,' '));}
