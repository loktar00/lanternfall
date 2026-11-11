/* LANTERNFALL - interface (DOM over the scene) */
LF.ui = (function () {
  const U = {}, G = LF.game, P = G.P; let root, el = {}, timer = null;
  const CSS = `
#ui{font-size:16px;color:#d9cfba}
#ui *{box-sizing:border-box}
.pe{pointer-events:auto}
.num{font-family:"Segoe UI",Tahoma,Verdana,sans-serif;font-variant-numeric:tabular-nums}
#top{position:absolute;left:0;right:0;top:0;height:2.6em;display:flex;align-items:center;gap:1.1em;padding:0 .9em;background:linear-gradient(#07080cdd,#07080c99 70%,#07080c00);text-shadow:0 1px 2px #000}
#top .stage{font-size:1.02em;letter-spacing:.14em;white-space:nowrap}
#top .stage b{color:#f0d9a8;font-weight:normal}
#danger{font-family:"Segoe UI",sans-serif;font-size:.68em;font-weight:700;letter-spacing:.12em;padding:.1em .5em;border:1px solid;border-radius:2px;display:none}
#pips{display:flex;gap:.28em;align-items:center}
#pips i{width:.62em;height:.62em;border:1px solid #8a7a5a;transform:rotate(45deg);display:block;background:#0006}
#pips i.on{background:#e0b872;border-color:#f3dcae;box-shadow:0 0 .4em #e0a04a}
#pips i.boss{width:.86em;height:.86em;margin-left:.3em;border-color:#b0503a}
#pips i.boss.on{background:#d0604a;box-shadow:0 0 .5em #d0604a}
.sp{flex:1}
.stat{display:flex;align-items:center;gap:.35em;font-size:.95em;white-space:nowrap}
.stat svg{width:1em;height:1em;flex:none}
#lvl{display:flex;align-items:center;gap:.5em;font-size:.82em;letter-spacing:.1em}
#xpbar{width:6em;height:.32em;background:#0009;border:1px solid #5a4d36}
#xpbar i{display:block;height:100%;background:#b9a36a;width:0}
#flames{display:flex;gap:.15em}
#flames svg{width:1.05em;height:1.3em}
.btn{font-family:Georgia,serif;font-size:.74em;letter-spacing:.12em;color:#cfc3a8;background:#14151acc;border:1px solid #5a4d36;padding:.34em .7em;cursor:pointer;white-space:nowrap;border-radius:1px}
.btn:hover{border-color:#c9a45a;color:#f3e6c6}
.btn.on{background:#3a2c14cc;border-color:#d0a85a;color:#ffe9b8}
.btn[disabled]{opacity:.38;cursor:default;border-color:#3a3428}
.seg{display:flex}.seg .btn{border-left-width:0}.seg .btn:first-child{border-left-width:1px}
#bot{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:flex-end;justify-content:center;gap:.55em;padding:.5em .8em .55em;background:linear-gradient(#07080c00,#07080cb0 55%,#07080ce6)}
.plate{display:flex;gap:.55em;align-items:center;background:#0c0d12cc;border:1px solid #4a3f2c;padding:.34em .6em .34em .34em;min-width:12.4em;position:relative}
.plate.low{animation:low .55s infinite alternate}
@keyframes low{from{border-color:#4a3f2c;box-shadow:none}to{border-color:#d04a34;box-shadow:0 0 .7em #b0301c88 inset}}
.plate.down{filter:grayscale(.8) brightness(.6)}
.plate canvas{width:3.5em;height:3.5em;display:block;border:1px solid #3a3226;background:#07080b}
.plate .nm{font-size:.84em;letter-spacing:.14em;color:#eadcb8;line-height:1.1}
.plate .rl{font-size:.6em;letter-spacing:.12em;color:#8f8672;font-family:"Segoe UI",sans-serif}
.hp{height:.42em;background:#000a;border:1px solid #4a4030;margin:.28em 0 .22em;width:7.6em;position:relative}
.hp i{display:block;height:100%;background:linear-gradient(#b8452f,#8a2c1e);width:100%}
.hp b{position:absolute;right:.2em;top:-.95em;font-size:.58em;color:#a99f88;font-weight:normal}
.sk{display:flex;gap:.25em}
.sk i{width:1.5em;height:.26em;background:#000a;border:1px solid #4a4030;display:block;position:relative;overflow:hidden}
.sk i u{position:absolute;left:0;top:0;bottom:0;background:#c9a45a;width:0}
.sk i.rdy u{background:#ffe2a0;box-shadow:0 0 .4em #ffd27a}
.rev{position:absolute;left:.34em;top:.34em;width:3.5em;height:3.5em;display:none;align-items:center;justify-content:center;font-family:"Segoe UI",sans-serif;font-size:1em;color:#f0d9a8;background:#000a}
.plate.down .rev{display:flex}
#flareB{width:5.2em;height:4.3em;border:1px solid #6a5630;background:#14110ccc;position:relative;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.1em;overflow:hidden;margin-left:.3em}
#flareB u{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(#e0903a66,#c0601a99);height:0;text-decoration:none}
#flareB svg{width:1.5em;height:1.8em;position:relative}
#flareB span{font-size:.56em;letter-spacing:.14em;position:relative;font-family:"Segoe UI",sans-serif;color:#cdbf9f}
#flareB.rdy{border-color:#ffd27a;box-shadow:0 0 1em #e0903a99;animation:fl 1s infinite alternate}
@keyframes fl{to{box-shadow:0 0 1.7em #ffb04acc}}
#tonics{font-size:.66em;letter-spacing:.1em;color:#9fb58f;font-family:"Segoe UI",sans-serif;align-self:center;margin-left:.4em;white-space:nowrap}
#boss{position:absolute;left:50%;top:3.2em;transform:translateX(-50%);width:min(34em,56vw);text-align:center;display:none}
#boss .t{font-size:1.02em;letter-spacing:.3em;color:#e9d3b0;text-shadow:0 1px 3px #000,0 0 .8em #000}
#boss .b{height:.5em;background:#000b;border:1px solid #6a4a3a;margin-top:.3em}
#boss .b i{display:block;height:100%;background:linear-gradient(#c0553a,#7a2418)}
#toasts{position:absolute;right:.9em;top:3.2em;display:flex;flex-direction:column;gap:.35em;align-items:flex-end}
.toast{font-size:.8em;letter-spacing:.14em;background:#0b0c11dd;border-left:2px solid #c9a45a;padding:.4em .8em;animation:tin .25s ease-out;white-space:nowrap}
.toast.bad{border-color:#d04a34;color:#f0b0a0}.toast.good{border-color:#e0b872;color:#ffe9b8}.toast.relic{border-color:#ff7a3a;color:#ffb48a}.toast.gilded{border-color:#e0a33c;color:#f0cc88}.toast.boss{border-color:#b0503a;color:#f0d0c0}
.toast.out{opacity:0;transform:translateX(1em);transition:all .3s}
@keyframes tin{from{opacity:0;transform:translateX(1.5em)}}
#veil{position:absolute;inset:0;background:#04050899;display:none;align-items:center;justify-content:center}
.panel{background:#0c0d12f2;border:1px solid #6a5a3c;box-shadow:0 0 0 1px #000,0 1em 4em #000c;padding:1.2em 1.5em 1.1em;max-width:94vw;max-height:88vh;overflow:auto;position:relative}
.panel h2{font-size:1.25em;letter-spacing:.3em;font-weight:normal;margin:0 0 .15em;color:#f0dcb0;text-align:center}
.panel .sub{font-size:.78em;letter-spacing:.12em;color:#9a917c;text-align:center;margin-bottom:1em}
.rule{height:1px;background:linear-gradient(90deg,#0000,#8a7448,#0000);margin:.5em 0 .9em}
.cards{display:flex;gap:.9em;justify-content:center;flex-wrap:wrap}
.card{width:13.5em;border:1px solid #5a4d36;background:#12131acc;padding:.9em .9em .8em;cursor:pointer;text-align:center;position:relative;transition:transform .12s,border-color .12s}
.card:hover{border-color:#e0b872;transform:translateY(-.2em)}
.card .who{font-family:"Segoe UI",sans-serif;font-size:.62em;letter-spacing:.2em;color:#9a917c}
.card .nm{font-size:1em;letter-spacing:.16em;color:#f0dcb0;margin:.45em 0 .5em}
.card .d{font-size:.82em;line-height:1.35;color:#c9bfa8;min-height:3.3em}
.card .rk{font-family:"Segoe UI",sans-serif;font-size:.62em;letter-spacing:.14em;color:#b9a36a;margin-top:.5em}
.card.rec{border-color:#b9954a}.card.rec:after{content:"STEWARD";position:absolute;right:.4em;top:.3em;font-family:"Segoe UI",sans-serif;font-size:.5em;letter-spacing:.16em;color:#d0a85a}
.card canvas{width:3.2em;height:3.2em;border:1px solid #3a3226;display:block;margin:0 auto .2em}
.cd{height:2px;background:#2a2418;margin-top:1em;position:relative}.cd i{position:absolute;left:0;top:0;bottom:0;background:#c9a45a;width:100%}
.cdn{font-family:"Segoe UI",sans-serif;font-size:.62em;letter-spacing:.12em;color:#8f8672;text-align:center;margin-top:.45em}
.big{display:flex;gap:1em;justify-content:center;margin-top:.4em;flex-wrap:wrap}
.big .btn{font-size:.95em;padding:.8em 1.5em;min-width:11em;text-align:center}
.big .btn small{display:block;font-family:"Segoe UI",sans-serif;font-size:.62em;letter-spacing:.1em;color:#9a917c;margin-top:.35em}
.big .btn.rec{border-color:#d0a85a}
.tag{font-family:"Segoe UI",sans-serif;font-size:.7em;font-weight:700;letter-spacing:.14em}
.SAFE{color:#8fc98a}.RISKY{color:#e0b85a}.DEADLY{color:#e05a44}
.tabs{display:flex;gap:0;justify-content:center;margin-bottom:1em}.tabs .btn{font-size:.8em;padding:.5em 1em}
.rows{display:flex;flex-direction:column;gap:.45em;min-width:min(38em,84vw)}
.row{display:flex;align-items:center;gap:.8em;border:1px solid #3a3226;background:#11121899;padding:.5em .7em}
.row .g{flex:1;min-width:0}.row .t{font-size:.9em;letter-spacing:.14em;color:#eadcb8}.row .s{font-size:.74em;color:#a99f88;line-height:1.35;font-family:"Segoe UI",sans-serif}
.row canvas{width:3.2em;height:3.2em;border:1px solid #3a3226;flex:none}
.row.sel{border-color:#c9a45a;background:#2a200e99}.row.lock{opacity:.5}
.slots{display:flex;gap:.5em;flex-wrap:wrap}.slot{font-family:"Segoe UI",sans-serif;font-size:.7em;border:1px solid #3a3226;padding:.3em .5em;min-width:11em;line-height:1.35}
.slot b{display:block;font-weight:600}
.kv{display:grid;grid-template-columns:auto auto;gap:.25em 1.6em;justify-content:center;font-size:.9em;margin:.6em 0 1em}.kv span:nth-child(odd){color:#9a917c;letter-spacing:.12em;font-size:.86em}.kv span:nth-child(even){text-align:right;color:#f0dcb0}
.x{position:absolute;right:.5em;top:.35em;cursor:pointer;color:#8f8672;font-family:"Segoe UI",sans-serif;font-size:.9em;padding:.2em .4em}
input[type=range]{accent-color:#c9a45a;width:12em}
#title{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:flex-start;padding:9vh 0 9vh;background:radial-gradient(ellipse at 50% 40%,#0000 30%,#04050899 100%);text-align:center}
#title h1{font-size:min(6.2em,11vw);letter-spacing:.34em;font-weight:normal;margin:0 0 .1em .34em;color:#f1dfb6;text-shadow:0 0 .5em #e0903a66,0 .05em .1em #000}
#title .tl{font-size:.92em;letter-spacing:.3em;color:#b3a88e;margin-bottom:2.4em;flex:1}
#title .best{font-family:"Segoe UI",sans-serif;font-size:.7em;letter-spacing:.14em;color:#8f8672;margin-top:1.4em}
#snd{position:absolute;left:.9em;bottom:6.4em;font-family:"Segoe UI",sans-serif;font-size:.66em;letter-spacing:.16em;color:#a99f88;background:#07080c99;padding:.3em .6em;border:1px solid #3a3226}
#stamp{position:absolute;right:.5em;bottom:.2em;font:11px 'Segoe UI',sans-serif;color:#8f8672;opacity:.75;z-index:5}
#sdbg{position:absolute;left:.6em;top:3.4em;margin:0;padding:.6em .8em;background:#000c;color:#e8e0cc;font:15px/1.35 Consolas,'Courier New',monospace;display:none;z-index:6;max-width:62em;white-space:pre}
.chk{display:inline-flex;align-items:center;gap:.35em;margin:.2em .7em .2em 0;font-family:'Segoe UI',sans-serif;font-size:.78em;letter-spacing:.06em;cursor:pointer}
#dim{position:absolute;inset:0;background:#000;opacity:0;transition:opacity .8s;pointer-events:none}
#fall{position:absolute;left:0;right:0;top:38%;text-align:center;font-size:min(7em,12vw);letter-spacing:.34em;color:#e9c08a;text-shadow:0 0 .6em #c0501a;opacity:0;transition:opacity 1.2s;pointer-events:none}
`;
  const SVG = {
    flame: (c) => `<svg viewBox="0 0 20 26"><path d="M10 1c1 5 6 7 6 14a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 3 3 3 5 1-3 0-8 1-12z" fill="${c}"/></svg>`,
    coin: '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" fill="#b8bcc4" stroke="#6a6e76" stroke-width="1.5"/><path d="M10 5.5v9M7 8h6" stroke="#6a6e76" stroke-width="1.5"/></svg>',
    ember: '<svg viewBox="0 0 20 20"><path d="M10 2l3 5 5 3-5 3-3 5-3-5-5-3 5-3z" fill="#ff8a3a" stroke="#7a2a0a" stroke-width="1"/></svg>'
  };
  const h = (html) => { const d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; };
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  U.init = function () {
    root = document.getElementById('ui'); const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    root.innerHTML = `
<div id="dim"></div><div id="stamp">build __BUILD__</div><pre id="sdbg"></pre><div id="fall">LANTERNFALL</div>
<div id="top" class="pe"><div class="stage" id="stg"></div><div id="danger"></div><div id="pips"></div><div class="sp"></div>
 <div id="lvl"><span id="lvn"></span><div id="xpbar"><i></i></div></div>
 <div class="stat" title="Silver">${SVG.coin}<span class="num" id="sil">0</span></div><div class="stat" title="Embers">${SVG.ember}<span class="num" id="emb">0</span></div>
 <div id="flames" title="Lantern flames"></div>
 <div class="seg" id="spd"><div class="btn" data-s="1">1&times;</div><div class="btn" data-s="2">2&times;</div><div class="btn" data-s="4">4&times;</div></div>
 <div class="stat pe" title="Volume"><div class="btn" id="muteB"></div><input type="range" id="volS" min="0" max="100" style="width:5em"></div>
 <div class="btn" id="pushB" title="What the party does after a waylight when you do not choose"></div><div class="btn" id="stewB" title="The Steward makes choices for you when a countdown runs out"></div><div class="btn" id="menuB">MENU</div></div>
<div id="boss"><div class="t"></div><div class="b"><i></i></div></div>
<div id="toasts"></div>
<div id="bot" class="pe"></div>
<div id="snd">CLICK FOR SOUND</div>
<div id="title" class="pe"><h1>LANTERNFALL</h1><div class="tl">CARRY THE LAST LIGHT ACROSS THE MOOR</div><div class="big"><div class="btn rec" id="beginB"></div><div class="btn" id="newB" style="display:none">NEW RUN<small>abandon the saved road</small></div></div><div class="cdn" id="tcd"></div><div class="best" id="tbest"></div></div>
<div id="veil" class="pe"></div>`;
    for (const id of ['top', 'stg', 'danger', 'pips', 'lvn', 'sil', 'emb', 'flames', 'spd', 'pushB', 'stewB', 'menuB', 'boss', 'toasts', 'bot', 'snd', 'title', 'veil', 'dim', 'beginB', 'newB', 'tcd', 'tbest']) el[id] = document.getElementById(id);
    el.xp = root.querySelector('#xpbar i'); el.muteB = document.getElementById('muteB'); el.volS = document.getElementById('volS'); if (P.vol.master === undefined) P.vol.master = 1; el.volS.value = Math.round(P.vol.master * 100);
    el.volS.addEventListener('input', e => { P.vol.master = e.target.value / 100; if (P.vol.master > 0) P.vol.mute = false; LF.audio.setVol(); U.refreshTop(); }); el.volS.addEventListener('change', () => G.save());
    el.muteB.addEventListener('click', () => { P.vol.mute = !P.vol.mute; LF.audio.setVol(); U.refreshTop(); G.save(); });
    el.spd.addEventListener('click', e => { const s = e.target.getAttribute('data-s'); if (s) { P.speed = +s; U.refreshTop(); LF.audio.play('click'); } });
    el.pushB.addEventListener('click', () => { P.push = !P.push; U.refreshTop(); LF.audio.play('click'); });
    el.stewB.addEventListener('click', () => { P.steward = !P.steward; U.refreshTop(); LF.audio.play('click'); });
    el.menuB.addEventListener('click', () => U.openMenu('party'));
    el.veil.addEventListener('mousedown', e => { if (e.target === el.veil && U.closable) U.close(); });
    el.beginB.addEventListener('click', () => LF.begin(false)); el.newB.addEventListener('click', () => LF.begin(true));
    window.addEventListener('pointerdown', () => { U.userTouched = true; }, true); window.addEventListener('keydown', () => { U.userTouched = true; }, true);
    U.resize(); U.refreshTop(); if (QS.has('sounddebug')) U.soundDebug(true);
  };
  U.resize = function () { if (!root) return; const s = clamp(Math.min(window.innerHeight / 1080, window.innerWidth / 1500), 0.62, 1.6); root.style.fontSize = (16 * s).toFixed(2) + 'px'; };
  U.refreshTop = function () {
    for (const b of el.spd.children) b.classList.toggle('on', +b.getAttribute('data-s') === P.speed);
    if (el.muteB) { el.muteB.textContent = P.vol.mute ? 'MUTED' : 'SOUND'; el.muteB.classList.toggle('on', !P.vol.mute); }
    el.pushB.textContent = P.push ? 'DEFAULT: PUSH' : 'DEFAULT: HOLD'; el.stewB.textContent = P.steward ? 'STEWARD ON' : 'STEWARD OFF'; el.stewB.classList.toggle('on', P.steward);
  };
  /* ----- HUD ----- */
  let plates = [], lastParty = '';
  U.buildPlates = function () {
    const run = G.run; el.bot.innerHTML = ''; plates = [];
    for (const hero of G.heroes) {
      const p = h(`<div class="plate"><canvas width="96" height="96"></canvas><div class="rev num"></div><div><div class="nm">${hero.C.name}</div><div class="rl">${hero.C.role}</div><div class="hp"><i></i><b class="num"></b></div><div class="sk"><i><u></u></i><i><u></u></i><i><u></u></i></div></div></div>`);
      el.bot.appendChild(p); plates.push({ p, hero, cv: p.querySelector('canvas'), hp: p.querySelector('.hp i'), hpt: p.querySelector('.hp b'), sk: [...p.querySelectorAll('.sk i')], rev: p.querySelector('.rev') });
      p.title = hero.C.skills.map(s => s.name + ': ' + s.d).join('\n');
    }
    const fb = h(`<div id="flareB" title="Lantern Flare (Space)"><u></u>${SVG.flame('#ffcf8a')}<span>FLARE</span></div>`); el.bot.appendChild(fb); el.flareB = fb; el.flareU = fb.querySelector('u'); fb.addEventListener('click', () => G.fireFlare(true));
    const tn = h('<div id="tonics"></div>'); el.bot.appendChild(tn); el.tonics = tn;
    lastParty = run.party.join();
    LF.wantPortraits = true;
  };
  U.portraitTargets = () => plates.map(p => ({ cls: p.hero.cls, cv: p.cv }));
  let hudT = 0;
  U.update = function (dt) {
    const run = G.run; hudT += dt; if (!run) { el.top.style.display = G.state === 'title' ? 'none' : 'flex'; return; }
    const ttl = G.state === 'title'; el.top.style.display = ttl ? 'none' : 'flex'; el.bot.style.display = ttl ? 'none' : 'flex'; el.snd.style.bottom = ttl ? '1em' : '6.4em';
    if (lastParty !== run.party.join() || plates.length !== G.heroes.length || (plates[0] && plates[0].hero !== G.heroes[0])) U.buildPlates();
    if (hudT < 0.1) return; hudT = 0;
    el.stg.innerHTML = `${G.stageName(run.stage)} <b>&middot; STAGE ${run.stage}</b>`;
    const dg = (G.state === 'fight' || G.state === 'boss') ? G.danger(false) : 'SAFE'; el.danger.style.display = dg === 'DEADLY' ? 'block' : 'none'; if (dg === 'DEADLY') { el.danger.textContent = 'DEADLY'; el.danger.className = 'DEADLY'; }
    let ph = ''; for (let i = 0; i < LF.PACKS; i++) ph += `<i class="${i < run.pack - (G.state === 'fight' ? 1 : 0) ? 'on' : ''}"></i>`; ph += `<i class="boss ${G.state === 'relight' || G.state === 'choice' ? 'on' : ''}"></i>`; if (el.pips._h !== ph) { el.pips.innerHTML = ph; el.pips._h = ph; }
    el.lvn.textContent = 'LEVEL ' + run.level; el.xp.style.width = (100 * run.xp / G.xpNeed(run.level)).toFixed(1) + '%';
    el.sil.textContent = fmt(run.silver); el.emb.textContent = fmt(P.embers);
    let fh = ''; for (let i = 0; i < 3; i++) fh += SVG.flame(i < run.flames ? '#ffb85a' : '#2c2a28'); if (el.flames._h !== fh) { el.flames.innerHTML = fh; el.flames._h = fh; }
    for (const pl of plates) {
      const u = pl.hero, f = clamp(u.hp / u.maxHp, 0, 1); pl.hp.style.width = (f * 100).toFixed(1) + '%'; pl.hpt.textContent = fmt(Math.max(0, u.hp)) + ' / ' + fmt(u.maxHp);
      pl.p.classList.toggle('low', !u.down && f < 0.3); pl.p.classList.toggle('down', !!u.down); if (u.down) pl.rev.textContent = Math.ceil(u.downT);
      for (let i = 0; i < 3; i++) { const s = u.C.skills[i], k = s.passive && s.id !== 'riposte' ? 1 : 1 - clamp((s.id === 'riposte' ? u.ripT : u.cd[i]) / s.cd, 0, 1); pl.sk[i].firstChild.style.width = (k * 100).toFixed(0) + '%'; pl.sk[i].classList.toggle('rdy', k >= 1); }
    }
    if (el.flareB) { el.flareU.style.height = (G.flare * 100).toFixed(0) + '%'; el.flareB.classList.toggle('rdy', G.flare >= 1); el.tonics.innerHTML = 'TONICS<br><span class="num" style="font-size:1.5em;color:#cfe3bf">' + run.tonics + '</span>'; }
    const b = G.bossRef; if (b && b.hp > 0 && b.seen) { el.boss.style.display = 'block'; el.boss.firstElementChild.textContent = b.title; el.boss.querySelector('.b i').style.width = (100 * b.hp / b.maxHp).toFixed(1) + '%'; } else el.boss.style.display = 'none';
    if (LF.audio.started && el.snd.style.display !== 'none') el.snd.style.display = 'none';
  };
  /* ----- toasts ----- */
  const tq = []; let lastToast = '', lastToastT = 0;
  U.toast = function (text, cls) {
    const now = performance.now(); if (text === lastToast && now - lastToastT < 2500) return; lastToast = text; lastToastT = now;
    while (el.toasts.children.length >= 3) el.toasts.removeChild(el.toasts.firstChild);
    const t = h(`<div class="toast ${cls || ''}">${esc(text)}</div>`); el.toasts.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 320); }, 2100);
  };
  /* ----- panels ----- */
  function show(html, closable) { el.veil.innerHTML = ''; const p = h(`<div class="panel">${closable ? '<div class="x">ESC &times;</div>' : ''}${html}</div>`); el.veil.appendChild(p); el.veil.style.display = 'flex'; U.closable = !!closable; if (closable) p.querySelector('.x').addEventListener('click', U.close); return p; }
  U.close = function () { el.veil.style.display = 'none'; el.veil.innerHTML = ''; stopTimer(); if (G.panel === 'menu' || G.panel === 'away') G.panel = null; U.closable = false; LF.wantPortraits = true; };
  function stopTimer() { if (timer) { cancelAnimationFrame(timer.raf); timer = null; } }
  // countdown bar; the Steward acts when it runs out. Any click or key inside the panel stops it.
  function countdown(panel, secs, fn, label) {
    stopTimer(); const bar = panel.querySelector('.cd i'), txt = panel.querySelector('.cdn');
    if (!P.steward) { if (bar) bar.parentNode.style.visibility = 'hidden'; if (txt) txt.textContent = 'THE STEWARD IS OFF: TAKE YOUR TIME'; return; }
    const t0 = performance.now(); timer = { raf: 0 };
    const stop = () => { stopTimer(); if (bar) bar.parentNode.style.visibility = 'hidden'; if (txt) txt.textContent = 'YOUR CHOICE'; panel.removeEventListener('pointerdown', stopIfIdle, true); };
    const stopIfIdle = (e) => { if (!e.target.closest('.card,.btn')) stop(); };
    panel.addEventListener('pointerdown', stopIfIdle, true);
    const tick = () => { if (!timer) return; const k = (performance.now() - t0) / 1000 / secs; if (bar) bar.style.width = (100 * (1 - k)).toFixed(1) + '%'; if (txt) txt.textContent = label + ' IN ' + Math.max(0, Math.ceil(secs * (1 - k))); if (k >= 1) { timer = null; fn(); return; } timer.raf = requestAnimationFrame(tick); };
    timer.raf = requestAnimationFrame(tick);
  }
  U.openCards = function (offer, rec) {
    const run = G.run;
    const p = show(`<h2>LEVEL ${run.level}</h2><div class="sub">CHOOSE ONE</div><div class="cards">${offer.map((c, i) => `<div class="card ${i === rec && P.steward ? 'rec' : ''}" data-i="${i}">${c.who === 'party' ? '' : '<canvas width="72" height="72" data-cls="' + c.who + '"></canvas>'}<div class="who">${c.who === 'party' ? 'WHOLE PARTY' : CL[c.who].name}</div><div class="nm">${c.name}</div><div class="d">${esc(c.d)}</div><div class="rk">RANK ${(run.cards[c.id] || 0) + 1} OF 3</div></div>`).join('')}</div><div class="cd"><i></i></div><div class="cdn"></div>`);
    const pick = i => { stopTimer(); G.takeCard(offer[i].id); U.toast(offer[i].name, 'good'); el.veil.style.display = 'none'; G.panel = null; if (G.pending.length) G.openPending(); };
    p.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => pick(+c.getAttribute('data-i'))));
    p.querySelectorAll('canvas').forEach(cv => LF.copyPortrait(cv.getAttribute('data-cls'), cv));
    U.keys = { '1': () => pick(0), '2': () => offer[1] && pick(1), '3': () => offer[2] && pick(2) };
    countdown(p, G.DEMO ? 3.5 : 6, () => pick(rec), 'THE STEWARD CHOOSES');
  };
  U.openChoice = function (rec) {
    const run = G.run, d = G.danger(true), def = P.steward ? rec : P.push;
    const p = show(`<h2>WAYLIGHT ${run.stage} RELIT</h2><div class="sub">${G.stageName(run.stage)} &middot; THE ROAD AHEAD LOOKS <span class="tag ${d}">${d}</span></div><div class="big"><div class="btn ${def ? 'rec' : ''}" id="cPush">PUSH ON<small>STAGE ${run.stage + 1}: HARDER, RICHER &nbsp;[1]</small></div><div class="btn ${def ? '' : 'rec'}" id="cHold">HOLD HERE<small>PICKED-OVER GROUND: 80% REWARDS &nbsp;[2]</small></div></div><div class="cd"><i></i></div><div class="cdn"></div>`);
    const go = v => { stopTimer(); el.veil.style.display = 'none'; G.choose(v); };
    p.querySelector('#cPush').addEventListener('click', () => go(true)); p.querySelector('#cHold').addEventListener('click', () => go(false));
    U.keys = { '1': () => go(true), '2': () => go(false) };
    countdown(p, 7, () => go(def), def ? 'PUSHING ON' : 'HOLDING');
  };
  U.openRunEnd = function () {
    const L = G.last, tm = Math.floor(L.time / 60) + 'm ' + Math.floor(L.time % 60) + 's';
    const render = () => {
      const p = show(`<h2>THE LANTERN FALLS</h2><div class="sub">THE MOOR TAKES BACK THE DARK</div><div class="kv"><span>FURTHEST WAYLIGHT</span><span class="num">${L.stage}</span><span>LEVEL</span><span class="num">${L.level}</span><span>TIME ON THE ROAD</span><span class="num">${tm}</span><span>FOES UNMADE</span><span class="num">${L.kills}</span><span>EMBERS GATHERED</span><span class="num">+${L.embers}</span><span>BEST EVER</span><span class="num">WAYLIGHT ${P.best.stage}</span></div><div class="rule"></div><div class="sub">SPEND EMBERS &middot; YOU HOLD <span class="num" style="color:#ffb07a">${P.embers}</span></div><div class="rows">${boonRows()}</div><div class="big" style="margin-top:1em"><div class="btn rec" id="again">LIGHT THE LANTERN AGAIN</div></div><div class="cd"><i></i></div><div class="cdn"></div>`);
      wireBoons(p, render);
      p.querySelector('#again').addEventListener('click', again);
      return p;
    };
    const again = () => { stopTimer(); el.veil.style.display = 'none'; G.panel = null; LF.restartRun(); };
    const p = render(); U.keys = { 'Enter': again };
    countdown(p, 8, () => { G.stewardBoons(); again(); }, 'A NEW RUN BEGINS');
  };
  function boonRows() { return BOONS.map(b => { const r = G.boon(b.id), max = r >= b.max || (b.unlock && P.unlocked[b.id]), cost = G.boonCost(b.id); return `<div class="row"><div class="g"><div class="t">${b.name}${b.unlock ? '' : ' <span class="num" style="color:#b9a36a;font-size:.8em">' + r + '</span>'}</div><div class="s">${esc(b.d)}</div></div><div class="btn" data-b="${b.id}" ${max || P.embers < cost ? 'disabled' : ''}>${max ? 'DONE' : cost + ' EMBERS'}</div></div>`; }).join(''); }
  function wireBoons(p, rerender) { p.querySelectorAll('[data-b]').forEach(b => b.addEventListener('click', () => { if (b.hasAttribute('disabled')) return; if (G.buyBoon(b.getAttribute('data-b'))) { stopTimer(); G.save(); rerender(); } })); }
  U.openAway = function (a, levels) {
    G.panel = 'away'; const m = Math.floor(a.dt / 60);
    const p = show(`<h2>WHILE YOU WERE AWAY</h2><div class="sub">THE PARTY HELD THE ROAD FOR ${m >= 60 ? Math.floor(m / 60) + 'H ' + (m % 60) + 'M' : m + ' MINUTES'}</div><div class="kv"><span>SILVER</span><span class="num">+${fmt(a.silver)}</span><span>LEVELS</span><span class="num">+${levels}</span></div><div class="big"><div class="btn rec" id="ok">WALK ON</div></div><div class="cd"><i></i></div><div class="cdn"></div>`, true);
    p.querySelector('#ok').addEventListener('click', U.close); countdown(p, 8, U.close, 'WALKING ON');
  };
  let tab = 'party';
  U.openMenu = function (t) {
    if (G.panel && G.panel !== 'menu') return; if (!G.run) return; G.panel = 'menu'; tab = t || tab; LF.audio.play('click');
    const run = G.run, tabs = ['party', 'gear', 'camp', 'boons', 'sound'];
    let body = '';
    if (tab === 'party') {
      body = `<div class="sub">FOUR WALK THE ROAD. A CHANGE OF PARTY BEGINS THE STAGE AGAIN.</div><div class="rows">` + LF.HERO_ORDER.map(c => { const C = CL[c], inP = U.pick.includes(c), un = P.unlocked[c]; return `<div class="row ${inP ? 'sel' : ''} ${un ? '' : 'lock'}" data-c="${c}" style="cursor:${un ? 'pointer' : 'default'}"><canvas width="72" height="72" data-cls="${c}"></canvas><div class="g"><div class="t">${C.name} <span class="s" style="letter-spacing:.14em">&nbsp;${C.role}</span></div><div class="s">${un ? C.skills.map(s => '<b style="color:#d9c9a0;font-weight:600">' + s.name + '</b> ' + s.d).join(' &middot; ') : 'JOINS AT WAYLIGHT ' + UNLOCK_AT[c] + ', OR CALL WITH EMBERS'}</div></div><div class="tag" style="color:${inP ? '#e0b872' : '#5a5448'}">${inP ? 'IN PARTY' : (un ? 'RESTING' : 'LOCKED')}</div></div>`; }).join('') + `</div><div class="big" style="margin-top:.9em"><div class="btn ${U.pick.join() !== run.party.join() && U.pick.length === 4 ? 'rec' : ''}" id="applyP" ${U.pick.length === 4 && U.pick.join() !== run.party.join() ? '' : 'disabled'}>${U.pick.length === 4 ? 'SET OUT WITH THIS PARTY' : 'CHOOSE ' + (4 - U.pick.length) + ' MORE'}</div></div>`;
    } else if (tab === 'gear') {
      body = '<div class="rows">' + G.heroes.map(u => { const g = run.gear[u.cls] || {}; return `<div class="row"><canvas width="72" height="72" data-cls="${u.cls}"></canvas><div class="g"><div class="t">${u.C.name} <span class="s num">&nbsp; ${fmt(u.maxHp)} life &middot; ${u.dmg.toFixed(0)} damage &middot; ${(1 / u.atk).toFixed(2)}/s</span></div><div class="slots">${['weapon', 'armour', 'trinket'].map(sl => { const it = g[sl]; return `<div class="slot" style="${it ? 'border-color:' + GRADES[it.g].c + '66' : ''}"><b style="color:${it ? GRADES[it.g].c : '#5a5448'}">${it ? esc(it.name) : sl.toUpperCase() + ': NONE'}</b>${it ? GRADES[it.g].n + ' &middot; +' + it.pow + '% ' + (sl === 'weapon' ? 'damage' : sl === 'armour' ? 'life' : 'skill power') + (it.spT ? '<br><span style="color:#ffb07a">' + it.spT + '</span>' : '') : 'nothing found yet'}</div>`; }).join('')}</div></div></div>`; }).join('') + '</div><div class="sub" style="margin-top:.8em">BETTER GEAR IS WORN AT ONCE. THE REST IS BROKEN DOWN FOR SILVER.</div>';
      const cards = Object.keys(run.cards); if (cards.length) body += '<div class="rule"></div><div class="sub">CARDS TAKEN</div><div class="slots" style="justify-content:center">' + cards.map(id => { const c = CARDS.find(q => q.id === id); return `<div class="slot"><b style="color:#eadcb8">${c.name} ${'I'.repeat(run.cards[id])}</b>${esc(c.d)}</div>`; }).join('') + '</div>';
    } else if (tab === 'camp') {
      body = `<div class="sub">SILVER IN HAND: <span class="num" style="color:#e8e4dc">${fmt(run.silver)}</span></div><div class="rows">` + CAMP.map(c => { const n = run.camp[c.id], cost = G.campCost(c.id), cur = c.id === 'tonic' ? (2 + Math.floor((n + 1) / 2)) + ' carried' : '+' + n * c.per + '%', nx = c.id === 'tonic' ? (2 + Math.floor((n + 2) / 2)) + ' carried' : '+' + (n + 1) * c.per + '%'; return `<div class="row"><div class="g"><div class="t">${c.name} <span class="num" style="color:#b9a36a;font-size:.8em">${n}</span></div><div class="s">${c.d}: ${cur} &rarr; <b style="color:#d9c9a0">${nx}</b></div></div><div class="btn" data-k="${c.id}" ${run.silver < cost ? 'disabled' : ''}>${fmt(cost)} SILVER</div></div>`; }).join('') + '</div>';
    } else if (tab === 'boons') {
      body = `<div class="sub">EMBERS ARE GATHERED WHEN THE LANTERN FALLS. YOU HOLD <span class="num" style="color:#ffb07a">${P.embers}</span>. THIS RUN WOULD PAY <span class="num" style="color:#ffb07a">${G.emberGain()}</span>.</div><div class="rows">${boonRows()}</div><div class="big" style="margin-top:1em"><div class="btn" id="giveUp">LET THE LANTERN FALL<small>END THIS RUN NOW AND TAKE THE EMBERS</small></div></div>`;
    } else {
      body = `<div class="rows"><div class="row"><div class="g"><div class="t">MUSIC</div></div><input type="range" min="0" max="100" value="${Math.round(P.vol.music * 100)}" id="vm"></div><div class="row"><div class="g"><div class="t">EFFECTS</div></div><input type="range" min="0" max="100" value="${Math.round(P.vol.sfx * 100)}" id="vs"></div><div class="row"><div class="g"><div class="t">MUTE</div></div><div class="btn ${P.vol.mute ? 'on' : ''}" id="vmute">${P.vol.mute ? 'MUTED' : 'SOUND ON'}</div></div><div class="row"><div class="g"><div class="t">SILENCE A GROUP</div><div>${LF.audio.CATS.map(c => `<label class="chk"><input type="checkbox" data-off="${c}" ${(P.vol.off || {})[c] ? 'checked' : ''}>${({ arrowhits: 'arrow and weapon impacts', spellcasts: 'spell casts', spellhits: 'spell hits' })[c] || c}</label>`).join('')}</div><div class="s">Tick a group to silence it. F8 shows a live list of every sound as it plays.</div></div></div></div><div class="sub" style="margin-top:1em">SPACE: LANTERN FLARE &middot; CLICK A FOE: FOCUS IT &middot; CLICK THE GROUND: MOVE THERE<br>1 2 3: CHOICES &middot; M: MENU &middot; C: CLOSE VIEW &middot; ESC: CLOSE</div>`;
    }
    const p = show(`<h2>${tab === 'party' ? 'THE PARTY' : tab === 'gear' ? 'GEAR' : tab === 'camp' ? 'CAMP' : tab === 'boons' ? 'BOONS' : 'SOUND'}</h2><div class="rule"></div><div class="tabs seg">${tabs.map(t2 => `<div class="btn ${t2 === tab ? 'on' : ''}" data-t="${t2}">${t2.toUpperCase()}</div>`).join('')}</div>${body}`, true);
    p.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => U.openMenu(b.getAttribute('data-t'))));
    p.querySelectorAll('canvas').forEach(cv => LF.copyPortrait(cv.getAttribute('data-cls'), cv));
    if (tab === 'party') {
      p.querySelectorAll('[data-c]').forEach(r => r.addEventListener('click', () => { const c = r.getAttribute('data-c'); if (!P.unlocked[c]) return; const i = U.pick.indexOf(c); if (i >= 0) U.pick.splice(i, 1); else if (U.pick.length < 4) U.pick.push(c); U.openMenu('party'); }));
      p.querySelector('#applyP').addEventListener('click', e => { if (e.target.closest('.btn').hasAttribute('disabled')) return; const order = LF.HERO_ORDER.filter(c => U.pick.includes(c)); G.run.party = order; P.lastParty = order.slice(); U.close(); LF.reparty(); });
    }
    if (tab === 'camp') p.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => { if (!b.hasAttribute('disabled') && G.buyCamp(b.getAttribute('data-k'))) U.openMenu('camp'); }));
    if (tab === 'boons') { wireBoons(p, () => U.openMenu('boons')); p.querySelector('#giveUp').addEventListener('click', () => { U.close(); G.panel = null; G.run.flames = 0; G.endRun(); }); }
    if (tab === 'sound') { p.querySelectorAll('[data-off]').forEach(c => c.addEventListener('change', () => { P.vol.off = P.vol.off || {}; P.vol.off[c.getAttribute('data-off')] = c.checked; G.save(); })); p.querySelector('#vm').addEventListener('input', e => { P.vol.music = e.target.value / 100; LF.audio.setVol(); }); p.querySelector('#vs').addEventListener('input', e => { P.vol.sfx = e.target.value / 100; LF.audio.setVol(); LF.audio.play('click'); }); p.querySelector('#vmute').addEventListener('click', () => { P.vol.mute = !P.vol.mute; LF.audio.setVol(); U.openMenu('sound'); }); }
    U.keys = {};
  };
  U.pick = [];
  U.showTitle = function (hasSave) {
    el.title.style.display = 'flex'; el.bot.style.display = 'none'; el.top.style.display = 'none';
    el.beginB.innerHTML = hasSave ? 'CONTINUE<small>STAGE ' + P.run.stage + ' &middot; LEVEL ' + P.run.level + '</small>' : 'BEGIN'; el.newB.style.display = hasSave ? 'block' : 'none';
    el.tbest.textContent = P.best.stage ? 'BEST RUN: WAYLIGHT ' + P.best.stage + ' \u00b7 LEVEL ' + P.best.level + ' \u00b7 EMBERS ' + P.embers : 'CLICK FOR SOUND';
    const t0 = performance.now(), secs = 7; const tick = () => { if (el.title.style.display === 'none') return; const k = (performance.now() - t0) / 1000; el.tcd.textContent = 'THE ROAD BEGINS ON ITS OWN IN ' + Math.max(0, Math.ceil(secs - k)); if (k >= secs) { LF.begin(false); return; } requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  };
  U.hideTitle = function () { el.title.style.display = 'none'; };
  let sdT = null;
  U.soundDebug = function (on) {
    const d = document.getElementById('sdbg'); const show = on === undefined ? d.style.display !== 'block' : on; d.style.display = show ? 'block' : 'none'; if (sdT) { clearInterval(sdT); sdT = null; } if (!show) return;
    sdT = setInterval(() => {
      const A = LF.audio; if (!A.started) { d.textContent = 'SOUND DEBUG (F8)   build __BUILD__\nclick once to start the sound'; return; }
      const L = A.live(), f = (x, n) => String(x).padEnd(n), tr = (n, c) => n + ': ' + (c ? 'track ' + c.track + '  ' + (c.playing ? 'PLAYING' : 'silent ') + '  gain ' + c.gain : 'none');
      let s = 'SOUND DEBUG (F8)   build __BUILD__   t=' + L.t + '  audio ' + L.ctx + '\n';
      s += 'graph changes in the last second:  sources started/stopped ' + L.nodesPerS + '   gain/pan writes ' + L.paramsPerS + '   voices now ' + L.voices + '\n';
      s += tr('music A', L.musicA) + '\n' + tr('music B', L.musicB) + '\n';
      s += 'music bus gain ' + L.musicBus + '   ducked ' + (L.duck ? 'YES' : 'no') + '\ncampfire gain ' + L.campfire + (L.campfire > 0.001 ? '  PLAYING' : '  silent') + '\nwind gain ' + L.wind + '   master ' + L.master + '\n';
      s += '\n' + f('time', 8) + f('event', 14) + f('group', 12) + f('file', 20) + f('pitch', 7) + f('dB', 6) + 'source\n';
      for (const r of A.recent.slice(-16)) s += f(r.t.toFixed(2), 8) + f(r.ev, 14) + f(r.cat || '', 12) + f(r.file, 20) + f('x' + r.rate, 7) + f(r.db, 6) + r.who + '\n';
      d.textContent = s;
    }, 120);
  };
  U.dim = v => { el.dim.style.opacity = v; };
  U.fall = v => { const f = document.getElementById('fall'); if (f) f.style.opacity = v; };
  U.key = function (k) { if (U.keys && U.keys[k] && el.veil.style.display === 'flex') { U.keys[k](); return true; } return false; };
  U.isOpen = () => el.veil.style.display === 'flex';
  return U;
})();
