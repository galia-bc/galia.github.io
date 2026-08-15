const fs=require('fs');
const all=JSON.parse(fs.readFileSync('i18n/all.json','utf8'));
const dictJSON=JSON.stringify(all);
const tpl=`// ==UserScript==
// @name         Galia's Gambling Club - i18n (Multi-language)
// @namespace    https://github.com/galia-bc/galia.github.io
// @version      1.0.0
// @description  Full i18n for Galia's Gambling Club (GGC) mod: translates all user-visible UI text and adds a language switcher to the mod's settings screen. Supports EN/CN/TW/DE/FR/RU/UA.
// @match        https://bondageclub.com/*
// @match        https://beta.bondageclub.com/*
// @match        https://www.bondageclub.com/*
// @match        https://bondage-project.com/*
// @match        https://www.bondage-project.com/*
// @grant        none
// @author       WorkBuddy i18n
// ==/UserScript==

(function () {
  'use strict';

  // ---- Translation dictionary (source language = en; keys are English strings) ----
  var DICT = __DICT__;

  var LANGS = ['en', 'cn', 'tw', 'de', 'fr', 'ru', 'ua'];
  var LANG_NAMES = {
    en: 'English', cn: '简体中文', tw: '繁體中文',
    de: 'Deutsch', fr: 'Français', ru: 'Русский', ua: 'Українська'
  };

  // Dynamic (interpolated) string patterns -> dictionary key with {0},{1} placeholders.
  var DYNAMIC = [
    { re: /^Total (\\d+)$/, key: 'Total {0}' },
    { re: /^Showdown · (\\d+)s$/, key: 'Showdown · {0}s' },
    { re: /^MIN \\$([\\d]+)  MAX \\$([\\d]+)$/, key: 'MIN {0}  MAX {1}' },
    { re: /^TARGET \\$([\\d]+)$/, key: 'TARGET {0}' },
    { re: /^Current Bet: \\$([\\d]+)$/, key: 'Current Bet: {0}' },
    { re: /^(.+?)'s fleet$/, key: "{0}'s fleet" },
    { re: /^(.+?)'s turn$/, key: "{0}'s turn" },
    { re: /^Place your fleet \\\\((.+)\\\\)\\)?$/, key: 'Place your fleet ({0})' },
    { re: /^TOP Score: (.+)$/, key: 'TOP Score: {0}' },
    { re: /^BALANCE (.+)\\$$/, key: 'BALANCE {0}' },
    { re: /^CREDITS (.+)$/, key: 'CREDITS {0}' },
    { re: /^(\\d+) coins$/, key: '{0} coins' },
    { re: /^Your balance: (.+) coins$/, key: 'Your balance: {0} coins' },
    { re: /^Bet amount set: (.+)$/, key: 'Bet amount set: {0}' },
    { re: /^Invitation from: (.+)$/, key: 'Invitation from: {0}' },
    { re: /^Time left: (\\d+)s$/, key: 'Time left: {0}s' },
    { re: /^Invitation sent to: (.+)$/, key: 'Invitation sent to: {0}' },
    { re: /^(.+) Lobby$/, key: '{0} Lobby' },
    { re: /^(.+) wants to challenge you again$/, key: '{0} wants to challenge you again' },
    { re: /^Declared (\\d+) (.+)$/, key: 'Declared {0} {1}' },
    { re: /^Declare exactly (\\d+) dice\\.$/, key: 'Declare exactly {0} dice.' },
    { re: /^Declare exactly (\\d+) (.+)$/, key: 'Declare exactly {0} {1}' },
    { re: /^Liar's Dice stand claim prepared: (.+)$/, key: "Liar's Dice stand claim prepared: {0}" },
    { re: /^(.+) believed (.+) and didn't roll\\.$/, key: "{0} believed {1} and didn't roll." },
    { re: /^(.+) wins the match\\.$/, key: '{0} wins the match.' },
    { re: /^(.+) lied\\. Point to (.+)$/, key: '{0} lied. Point to {1}' },
    { re: /^(.+) was wrong\\. Point to (.+)$/, key: '{0} was wrong. Point to {1}' },
    { re: /^Best real: (\\d+) (.+)$/, key: 'Best real: {0} {1}' },
    { re: /^Permanently ghosted (.+)$/, key: 'Permanently ghosted {0}' },
    { re: /^Ghosted (.+) for (\\d+)h$/, key: 'Ghosted {0} for {1}h' },
    { re: /^Ignoring all invitations for (\\d+)h$/, key: 'Ignoring all invitations for {0}h' },
    { re: /^Unghosted (.+)$/, key: 'Unghosted {0}' },
    { re: /^Version (\\d+\\.\\d+\\.\\d+)$/, key: 'Version {0}' },
    { re: /^JACKPOT (.+)$/, key: 'JACKPOT' }
  ];

  // ---- State ----
  var STORE_KEY = 'ggc_i18n_lang';
  var current = (function () {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  })() || window.TranslationLanguage || 'en';
  if (LANGS.indexOf(current) < 0) current = 'en';
  var dropdownOpen = false;

  function fmt(tmpl, args) {
    return String(tmpl).replace(/\\{(\\d+)\\}/g, function (m, i) {
      return args[+i] !== undefined ? String(args[+i]) : m;
    });
  }

  // Core translate function (used by hooks)
  function t(str) {
    if (typeof str !== 'string' || !str) return str;
    var d = DICT[current] || DICT.en;
    if (d && d[str] !== undefined) return d[str];
    if (DICT.en[str] !== undefined) return DICT.en[str];
    for (var i = 0; i < DYNAMIC.length; i++) {
      var m = str.match(DYNAMIC[i].re);
      if (m) {
        var key = DYNAMIC[i].key;
        var tmpl = (d && d[key] !== undefined) ? d[key]
                 : (DICT.en[key] !== undefined ? DICT.en[key] : key);
        return fmt(tmpl, m.slice(1));
      }
    }
    return str;
  }

  // ---- Hook rendering functions (bare global calls used by the mod) ----
  var origDrawText = window.DrawText, origDrawTextFit = window.DrawTextFit, origDrawButton = window.DrawButton;
  function installHook(name, idx, orig) {
    if (typeof orig !== 'function') return;
    window[name] = function () {
      if (idx != null && typeof arguments[idx] === 'string') arguments[idx] = t(arguments[idx]);
      return orig.apply(null, arguments);
    };
  }
  installHook('DrawText', 0, origDrawText);
  installHook('DrawTextFit', 0, origDrawTextFit);
  installHook('DrawButton', 4, origDrawButton);

  // ---- Settings-screen language switcher (injected into ClubGamingSettingsMenu) ----
  var langBtn = { x: 1690, y: 50, w: 210, h: 54 };
  function inRect(mx, my, r) {
    return mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h;
  }
  function isHover(r) {
    return inRect(window.MouseX || 0, window.MouseY || 0, r);
  }
  function setLang(l) {
    current = l;
    try { localStorage.setItem(STORE_KEY, l); } catch (e) {}
  }
  function drawLangBar() {
    var y0 = langBtn.y + langBtn.h + 8;
    origDrawButton(langBtn.x, langBtn.y, langBtn.w, langBtn.h,
      '🌐 ' + LANG_NAMES[current], isHover(langBtn) ? '#d7a341' : 'White');
    if (dropdownOpen) {
      for (var i = 0; i < LANGS.length; i++) {
        var r = { x: langBtn.x, y: y0 + i * 44, w: langBtn.w, h: 40 };
        var active = LANGS[i] === current;
        var hov = isHover(r);
        origDrawButton(r.x, r.y, r.w, r.h, LANG_NAMES[LANGS[i]],
          active ? '#7B2CBF' : (hov ? '#d7a341' : 'White'));
      }
    }
  }
  function handleLangBarClick(mx, my) {
    if (inRect(mx, my, langBtn)) { dropdownOpen = !dropdownOpen; return true; }
    if (dropdownOpen) {
      var y0 = langBtn.y + langBtn.h + 8;
      for (var i = 0; i < LANGS.length; i++) {
        var r = { x: langBtn.x, y: y0 + i * 44, w: langBtn.w, h: 40 };
        if (inRect(mx, my, r)) { setLang(LANGS[i]); dropdownOpen = false; return true; }
      }
      dropdownOpen = false; // clicked outside panel: close, let settings click through
    }
    return false;
  }
  function hookSettingsMenu() {
    var menu = window.ClubGamingSettingsMenu;
    if (!menu || typeof menu.run !== 'function') return false;
    if (menu.__ggcI18nHooked) return true;
    var _run = menu.run.bind(menu);
    var _click = (typeof menu.click === 'function') ? menu.click.bind(menu) : null;
    menu.run = function () { _run(); drawLangBar(); };
    menu.click = function () {
      var mx = window.MouseX || 0, my = window.MouseY || 0;
      if (handleLangBarClick(mx, my)) return;
      if (_click) _click();
    };
    menu.__ggcI18nHooked = true;
    return true;
  }
  var iv = setInterval(function () { if (hookSettingsMenu()) clearInterval(iv); }, 400);

  console.log('[GGC i18n] loaded. language =', current);
})();
`;
const out=tpl.replace('__DICT__', dictJSON);
fs.writeFileSync('galia-i18n.user.js', out);
console.log('Wrote galia-i18n.user.js ('+out.length+' bytes)');
