const fs=require('fs');
const s=fs.readFileSync('club-gaming.root.js','utf8');
function ctx(re,before=120,after=220,max=6){
  let m,re2=new RegExp(re,'g'),c=0;
  while((m=re2.exec(s))&&c<max){c++;
    const i=m.index;
    console.log('--- @'+i+' ---');
    console.log(s.slice(Math.max(0,i-before),i+after).replace(/\n/g,' '));
  }
}
console.log('##### /club #####');
ctx('/club',80,160,8);
console.log('\n##### Command (case-sensitive) #####');
ctx('Command',60,160,8);
