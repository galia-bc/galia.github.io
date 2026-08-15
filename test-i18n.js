const fs=require('fs');
// ---- Mock BC environment ----
global.window = global;
const _store={}; global.localStorage={ getItem:k=>(k in _store?_store[k]:null), setItem:(k,v)=>{_store[k]=String(v);} };
global.TranslationLanguage='en';
global.MouseX=0; global.MouseY=0;
const calls=[];
global.DrawText=(...a)=>calls.push(['DrawText',...a]);
global.DrawTextFit=(...a)=>calls.push(['DrawTextFit',...a]);
global.DrawButton=(...a)=>calls.push(['DrawButton',...a]);
// preselect chinese
localStorage.setItem('ggc_i18n_lang','cn');

// load the userscript
const code=fs.readFileSync('galia-i18n.user.js','utf8');
eval(code);

function lastDrawText(){ for(let i=calls.length-1;i>=0;i--) if(calls[i][0]==='DrawText') return calls[i][1]; return null; }
function lastDrawButtonLabel(){ for(let i=calls.length-1;i>=0;i--) if(calls[i][0]==='DrawButton') return calls[i][5]; return null; }

let pass=0, fail=0;
function check(name, got, want){ if(got===want){pass++; /*console.log('OK',name)*/} else {fail++; console.log('FAIL',name,'\n  got :',JSON.stringify(got),'\n  want:',JSON.stringify(want));} }

// 1. static translation
calls.length=0; DrawText('Place your bet'); check('static cn', lastDrawText(), '请下注');
calls.length=0; DrawText('You won'); check('static cn2', lastDrawText(), '你赢了');
// 2. DrawButton label
calls.length=0; DrawButton(0,0,100,40,'Play','White'); check('button cn', lastDrawButtonLabel(), '开始');
// 3. dynamic patterns
calls.length=0; DrawText('Total 19'); check('dyn total', lastDrawText(), '总计 19');
calls.length=0; DrawText('MIN $50  MAX $500'); check('dyn minmax', lastDrawText(), '最小 50  最大 500');
calls.length=0; DrawText('Current Bet: $0'); check('dyn bet', lastDrawText(), '当前下注：0');
calls.length=0; DrawText("Galia's turn"); check('dyn turn', lastDrawText(), '轮到 Galia');
calls.length=0; DrawText('Version 0.4.13'); check('dyn ver', lastDrawText(), '版本 0.4.13');
calls.length=0; DrawText('Invitation from: Galia (12345)'); check('dyn inv', lastDrawText(), '来自 Galia (12345) 的邀请');
// 4. unknown string passes through
calls.length=0; DrawText('Some BC string'); check('passthrough', lastDrawText(), 'Some BC string');

// 5. settings menu hook + language switcher
window.ClubGamingSettingsMenu = {
  __ggcI18nHooked:false,
  run(){ calls.push(['run']); },
  click(){ calls.push(['click-orig']); }
};
// trigger the poll manually (interval uses setInterval; emulate by calling the same check)
// The script's interval will fire; but to be deterministic, just wait a tick:
setTimeout(()=>{
  check('menu hooked', window.ClubGamingSettingsMenu.__ggcI18nHooked, true);
  calls.length=0;
  window.ClubGamingSettingsMenu.run();
  check('run overlay label', lastDrawButtonLabel(), '🌐 简体中文');
  // open dropdown
  global.MouseX=1750; global.MouseY=70; // inside langBtn
  calls.length=0; window.ClubGamingSettingsMenu.click(); // toggles open
  // select German (index 3): y0=112 + 3*44 = 244
  global.MouseX=1750; global.MouseY=244;
  calls.length=0; window.ClubGamingSettingsMenu.click();
  // now language should be de
  calls.length=0; DrawText('Place your bet'); check('after switch de', lastDrawText(), 'Setze deinen Einsatz');
  check('persisted', localStorage.getItem('ggc_i18n_lang'), 'de');

  console.log('\nPASS:',pass,' FAIL:',fail);
  process.exit(fail?1:0);
}, 700);
