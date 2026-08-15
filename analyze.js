const fs = require('fs');
const src = fs.readFileSync('club-gaming.root.js','utf8');
// Quote-aware string literal scanner
const strings = [];
let i = 0;
const n = src.length;
while (i < n) {
  const c = src[i];
  if (c === '"' || c === "'" || c === '`') {
    const q = c; let j = i+1; let buf = ''; let ok = false;
    while (j < n) {
      const d = src[j];
      if (d === '\\') { buf += d + src[j+1]; j += 2; continue; }
      if (d === q) { ok = true; j++; break; }
      buf += d; j++;
    }
    if (ok) strings.push(buf);
    i = j;
  } else { i++; }
}
// Classify UI candidates
const stop = new Set(['function','return','var','let','const','if','else','for','while','true','false','null','undefined','this','new','typeof','void','delete','in','of','do','switch','case','break','continue','typeof','catch','throw','await','async','class','extends','import','export','default','yield','window','document','Player','Character','Dialog','Server','Asset','Activity']);
function isUICandidate(s){
  if (s.length < 3 || s.length > 140) return false;
  if (/^[a-z]+$/.test(s) && s.length < 6) return false; // short keywords/identifiers
  // must contain at least one letter
  if (!/[A-Za-z]/.test(s)) return false;
  // exclude pure code tokens
  if (stop.has(s)) return false;
  // exclude things that look like code/paths/css/hex
  if (/^[#.]?[a-zA-Z-]+\s*[:{;(]/.test(s)) return false;
  if (/^[0-9.]+$/.test(s)) return false;
  if (/^[a-z][a-zA-Z0-9_]*$/.test(s) && !/\s/.test(s) && s.length < 16) return false; // identifiers
  // UI text heuristic: has space, or sentence punctuation, or is capitalized multiword
  const hasSpace = /\s/.test(s);
  const hasPunct = /[.!?:;,]/.test(s);
  const hasUpper = /[A-Z]/.test(s) && /[a-z]/.test(s);
  if (!(hasSpace || hasPunct)) {
    // single word but maybe a UI label like "Level" "Score" -> include if capitalized and len>=4 and not pure camel identifier
    if (!/^[A-Z][a-z]{2,}$/.test(s)) return false;
  }
  // exclude CSS/units
  if (/\b(px|em|rgb|rgba|translate|rotate|scale|helvetica|arial|sans-serif)\b/i.test(s)) return false;
  return true;
}
const cand = strings.filter(isUICandidate);
const uniq = [...new Set(cand)];
fs.writeFileSync('strings-candidates.txt', uniq.join('\n'));
console.log('Total string literals:', strings.length);
console.log('UI candidates (raw):', cand.length);
console.log('UI candidates (unique):', uniq.length);
// Sample
console.log('--- first 60 candidates ---');
console.log(uniq.slice(0,60).join('\n'));
