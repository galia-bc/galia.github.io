const fs=require('fs');
const s=fs.readFileSync('club-gaming.root.js','utf8');
function ctx(re,before=60,after=520,max=3){
  let m,re2=new RegExp(re,'g'),c=0;
  while((m=re2.exec(s))&&c<max){c++;const i=m.index;
    console.log('--- @'+i+' ---');
    console.log(s.slice(Math.max(0,i-before),i+after).replace(/\n/g,' '));}
}
console.log('##### ClubGamingSettingsMenu run/click #####');
ctx('ClubGamingSettingsMenu',40,360,6);
