const fs=require('fs');
const s=fs.readFileSync('club-gaming.root.js','utf8');
function ctx(re,before=140,after=300,max=4){
  let m,re2=new RegExp(re,'g'),c=0;
  while((m=re2.exec(s))&&c<max){c++;const i=m.index;
    console.log('--- @'+i+' ---');
    console.log(s.slice(Math.max(0,i-before),i+after).replace(/\n/g,' '));}
}
console.log('##### registerMod info #####');
ctx('registerMod\\(',120,260,3);
console.log('\n##### clubgaming_settings usage #####');
ctx('clubgaming_settings',200,200,8);
console.log('\n##### PreferenceRegisterExtension #####');
ctx('PreferenceRegisterExtension',80,200,3);
