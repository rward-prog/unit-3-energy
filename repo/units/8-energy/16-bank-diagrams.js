'use strict';
/* ===== Conservation of mechanical energy WITH PICTURES (IDs start with CON-D) =====
   Drawn scenes: a cart on a track (point A to point B), a ball thrown straight up, a ball thrown straight down from a cliff,
   and energy bar charts. Students use PE_i + KE_i = PE_f + KE_f. */
const _BR = 9;
function _svg(w, h, inner, label) { return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" style="max-width:' + (w + 40) + 'px;color:inherit" role="img" aria-label="' + label + '"><title>' + label + '</title>' + inner + '</svg>'; }
function _tx(x, y, s, o) { o = o || {}; return '<text x="' + x + '" y="' + y + '" font-size="' + (o.size || 14) + '" fill="currentColor" text-anchor="' + (o.anchor || 'start') + '"' + (o.bold ? ' font-weight="700"' : '') + '>' + s + '</text>'; }
function _ball(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="' + _BR + '" fill="currentColor"/>'; }

/* A and B are {h: height in m (for drawing), hl: height label text, v: speed label text, l: letter}. Left shelf = A, right shelf = B. */
function sceneTrack(A, B) {
  const gy = 172, Hm = Math.max(A.h, B.h) * 1.12, ps = 120 / Hm, yA = gy - A.h * ps, yB = gy - B.h * ps;
  let d = 'M 20 ' + yA.toFixed(1) + ' L 120 ' + yA.toFixed(1);
  for (let i = 1; i <= 24; i++) { const t = i / 24, s = 3 * t * t - 2 * t * t * t; d += ' L ' + (120 + 200 * t).toFixed(1) + ' ' + (yA + (yB - yA) * s).toFixed(1); }
  d += ' L 420 ' + yB.toFixed(1);
  const one = (P, x, y, anchor, lx) => _ball(x, y - _BR - 2) + _tx(x, y - _BR - 34, P.l, { anchor: 'middle', bold: true, size: 16 }) + _tx(x, y - _BR - 17, P.v, { anchor: 'middle' }) +
    '<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + gy + '" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>' + _tx(lx, (y + gy) / 2 + 5, P.hl, { anchor: anchor });
  const label = 'A cart track. Point ' + A.l + ' is on a shelf at ' + A.hl + ' where the speed is ' + A.v + '. Point ' + B.l + ' is on a shelf at ' + B.hl + ' where the speed is ' + B.v + '.';
  return _svg(440, 200, '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="3"/><line x1="10" y1="' + gy + '" x2="430" y2="' + gy + '" stroke="currentColor" stroke-width="2"/>' +
    one(A, 60, yA, 'start', 68) + one(B, 380, yB, 'end', 372), label);
}
/* kind 'up' (ball launched upward from the ground) or 'down' (ball thrown down from a cliff). items: [{h, t1, t2}] ; h = real height in m (for drawing) */
function sceneVertical(kind, items) {
  const gy = 176, top = 14, Hm = Math.max.apply(null, items.map(i => i.h)) * 1.1, ps = (gy - top - 14) / Hm;
  const Y = h => gy - h * ps;
  let body = '<line x1="20" y1="' + gy + '" x2="430" y2="' + gy + '" stroke="currentColor" stroke-width="3"/>';
  if (kind === 'down') { const hc = Math.max.apply(null, items.map(i => i.h)); body += '<rect x="30" y="' + Y(hc) + '" width="100" height="' + (hc * ps) + '" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>'; }
  body += '<line x1="190" y1="' + (Y(Math.max.apply(null, items.map(i => i.h))) - 4) + '" x2="190" y2="' + gy + '" stroke="currentColor" stroke-width="1" stroke-dasharray="3 5"/>';
  items.forEach(i => {
    const y = Y(i.h) - (i.h === 0 ? _BR : 0), lift = i.h === 0 ? 14 : 0;     // text for a ball sitting on the ground is lifted so the ground line does not cross it
    body += _ball(190, y) + '<line x1="206" y1="' + y + '" x2="222" y2="' + y + '" stroke="currentColor" stroke-width="1.5"/>' + _tx(228, y - 2 - lift, '<tspan font-weight="700">' + i.l + '</tspan>' + (i.t1 ? ': ' + i.t1 : '')) + (i.t2 ? _tx(228, y + 15 - lift, i.t2) : '');
  });
  const first = items.filter(i => kind === 'up' ? i.h === 0 : true)[0], y0 = Y(first.h) - (first.h === 0 ? _BR : 0);
  const arrow = kind === 'up'
    ? '<line x1="160" y1="' + (y0 - 4) + '" x2="160" y2="' + (y0 - 22) + '" stroke="currentColor" stroke-width="2.5"/><polygon points="160,' + (y0 - 32) + ' 153,' + (y0 - 20) + ' 167,' + (y0 - 20) + '" fill="currentColor"/>'
    : '<line x1="160" y1="' + (y0 + 4) + '" x2="160" y2="' + (y0 + 22) + '" stroke="currentColor" stroke-width="2.5"/><polygon points="160,' + (y0 + 32) + ' 153,' + (y0 + 20) + ' 167,' + (y0 + 20) + '" fill="currentColor"/>';
  const label = (kind === 'up' ? 'A ball is thrown straight up from the ground. ' : 'A ball is thrown straight down from the top of a cliff. ') + items.map(i => i.l + (i.t1 ? ': ' + i.t1 : '') + (i.t2 ? ', ' + i.t2 : '')).join('. ') + '.';
  return _svg(440, 200, body + arrow, label);
}
const _BC = { pe: '#2f6fed', ke: '#e8a317', th: '#d8472f' };
/* panels: [{t: title, pe, ke, th}] ; value null = unknown (drawn as a dashed outline with ?). A value of undefined = no bar. */
function sceneBars(panels, maxV) {
  const W = 40 + panels.length * 165, base = 150, ps = 105 / maxV;
  let body = '<line x1="14" y1="' + base + '" x2="' + (W - 10) + '" y2="' + base + '" stroke="currentColor" stroke-width="2"/>', lab = [];
  panels.forEach((p, k) => {
    const x0 = 30 + k * 165;
    [['pe', 'PE'], ['ke', 'KE'], ['th', 'Thermal']].forEach((b, j) => {
      const v = p[b[0]]; if (v === undefined) return;
      const x = x0 + j * 50, wBar = 34;
      if (v === null) body += '<rect x="' + x + '" y="' + (base - 105) + '" width="' + wBar + '" height="105" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4"/>' + _tx(x + wBar / 2, base - 48, '?', { anchor: 'middle', size: 24, bold: true });
      else body += '<rect x="' + x + '" y="' + (base - v * ps) + '" width="' + wBar + '" height="' + (v * ps) + '" fill="' + _BC[b[0]] + '" stroke="currentColor" stroke-width="1.5"/>' + _tx(x + wBar / 2, base - v * ps - 5, v + ' J', { anchor: 'middle', size: 13 });
      lab.push(_tx(x + wBar / 2, base + 14, b[1], { anchor: 'middle', size: 11 }));
    });
    body += _tx(x0 + 66, base + 34, 'Point ' + p.t, { anchor: 'middle', size: 15, bold: true });
  });
  const label = 'Energy bar charts in joules. ' + panels.map(p => 'Point ' + p.t + ': ' + [['pe', 'PE'], ['ke', 'KE'], ['th', 'thermal']].filter(b => p[b[0]] !== undefined).map(b => b[1] + ' ' + (p[b[0]] === null ? 'unknown' : p[b[0]] + ' J')).join(', ')).join('. ') + '.';
  return _svg(W, 190, body + lab.join(''), label);
}
function barPick(pe, ke) {   // small picture for answer choices: two bars, no numbers
  const base = 100, ps = 80 / 100, body = '<line x1="8" y1="' + base + '" x2="112" y2="' + base + '" stroke="currentColor" stroke-width="2"/>' +
    '<rect x="22" y="' + (base - pe * ps) + '" width="32" height="' + (pe * ps) + '" fill="' + _BC.pe + '" stroke="currentColor" stroke-width="1.5"/><rect x="66" y="' + (base - ke * ps) + '" width="32" height="' + (ke * ps) + '" fill="' + _BC.ke + '" stroke="currentColor" stroke-width="1.5"/>' +
    _tx(38, base + 14, 'PE', { anchor: 'middle', size: 12 }) + _tx(82, base + 14, 'KE', { anchor: 'middle', size: 12 });
  return _svg(120, 118, body, 'Bar chart: potential energy ' + (pe === 0 ? 'zero' : pe + ' percent of the total') + ', kinetic energy ' + (ke === 0 ? 'zero' : ke + ' percent of the total'));
}
const _kin = (m, v) => 0.5 * m * v * v;

/* ---- cart on a track ---- */
T('CON-D1', 'cons', 60, 'Picture: speed at point B on a track', function () {
  return tryGen('CON-D1', function () {
    const nm = oneName(), m = pick([2, 3, 5, 8, 10]), hA = pick([6, 8, 10, 12, 15, 20]), hB = pick([2, 3, 4, 5]), vA = pick([3, 4, 5, 6, 8]);
    if (hB > hA - 3) return null;
    const f = gg => Math.sqrt(vA * vA + 2 * gg * (hA - hB));
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: '<p>' + nm + ' rides a ' + d2(m) + ' kg cart along a frictionless track. At point A the cart is ' + d2(hA) + ' m above the ground and moving at ' + d2(vA) + ' m/s. Point B is ' + d2(hB) + ' m above the ground. How fast is the cart moving at point B?</p>' + sceneTrack({ h: hA, hl: 'h = ' + d2(hA) + ' m', v: 'v = ' + d2(vA) + ' m/s', l: 'A' }, { h: hB, hl: 'h = ' + d2(hB) + ' m', v: 'v = ?', l: 'B' }),
      wrongs: [[Math.sqrt(2 * GE * (hA - hB)), 'This ignores the cart’s starting KE. At A it already has ½ m v² of kinetic energy, as well as PE.'], [vA + Math.sqrt(2 * GE * (hA - hB)), 'Speeds do not add. Energies do: PE at A + KE at A = PE at B + KE at B.'], [Math.sqrt(vA * vA + 2 * GE * hA), 'This uses the whole height of A. Only the drop from A to B, (h_A − h_B), turns into extra KE.']],
      explain: 'PE_A + KE_A = PE_B + KE_B: m g ' + d2(hA) + ' + ½ m (' + d2(vA) + ')² = m g ' + d2(hB) + ' + ½ m v². The m cancels, so v = √(v_A² + 2 g (h_A − h_B)) = ' + show(f(GE), 2) + ' m/s.', hint: 'Write PE_A + KE_A = PE_B + KE_B. Every term has an m, so it cancels.', meta: { hA: hA, hB: hB, vA: vA } });
  });
});
T('CON-D2', 'cons', 70, 'Picture: how high is point B?', function () {
  return tryGen('CON-D2', function () {
    const nm = oneName(), hA = pick([1.0, 2.0, 3.0, 4.0]), vA = pick([10, 12, 14, 16]), vB = pick([4.0, 6.0, 8.0]);
    const f = gg => hA + (vA * vA - vB * vB) / (2 * gg);
    const hBv = f(GE);
    return numQ({ n: 2, unit: ' m', right: hBv, gf: f,
      prompt: '<p>' + nm + '’s cart rolls on a frictionless track. At point A the cart is ' + d2(hA) + ' m above the ground and moving at ' + d2(vA) + ' m/s. At point B, higher up the track, it has slowed to ' + d2(vB) + ' m/s. How high above the ground is point B?</p>' + sceneTrack({ h: hA, hl: 'h = ' + d2(hA) + ' m', v: 'v = ' + d2(vA) + ' m/s', l: 'A' }, { h: hBv, hl: 'h = ?', v: 'v = ' + d2(vB) + ' m/s', l: 'B' }),
      wrongs: [[(vA * vA - vB * vB) / (2 * GE), 'This is how much HIGHER B is than A. B’s height above the ground is that plus the ' + d2(hA) + ' m at A.'], [hA + (vA * vA - vB * vB) / GE, 'This left out the 2. The lost KE is ½ m (v_A² − v_B²), and it equals m g Δh.'], [hA + Math.pow(vA - vB, 2) / (2 * GE), 'KE depends on v², so use v_A² − v_B², not (v_A − v_B)².']],
      explain: 'KE lost = PE gained: ½ m (v_A² − v_B²) = m g (h_B − h_A). So h_B = h_A + (v_A² − v_B²) ÷ (2 g) = ' + d2(hA) + ' + (' + d2(vA) + '² − ' + d2(vB) + '²) ÷ 19.6 = ' + show(hBv, 2) + ' m.', hint: 'The cart slows down, so KE became PE. How much higher did it go? Then add that to the height of A.', meta: { hA: hA, vA: vA, vB: vB } });
  });
});
T('CON-D3', 'cons', 70, 'Picture: KE of a ball thrown straight up, at a height', function () {
  return tryGen('CON-D3', function () {
    const nm = oneName(), m = pick([0.20, 0.50, 1.0, 2.0]), v0 = pick([12, 15, 18, 20, 24]), h = pick([4.0, 6.0, 8.0, 10, 12]);
    if (h > v0 * v0 / (2 * GE) * 0.8) return null;
    const f = gg => _kin(m, v0) - m * gg * h, top = v0 * v0 / (2 * GE);
    return numQ({ n: 2, unit: ' J', right: f(GE), gf: f,
      prompt: '<p>' + nm + ' throws a ' + fmt(m, 2) + ' kg ball straight up from the ground at ' + d2(v0) + ' m/s. Ignoring air resistance, how much kinetic energy does the ball have when it is ' + d2(h) + ' m above the ground (point P)?</p>' + sceneVertical('up', [{ l: 'Top', h: top, t1: 'highest point', t2: 'v = 0' }, { l: 'P', h: h, t1: 'height = ' + d2(h) + ' m', t2: 'KE = ?' }, { l: 'Launch', h: 0, t1: 'v = ' + d2(v0) + ' m/s', t2: 'height = 0 m' }]),
      wrongs: [[_kin(m, v0), 'This is the KE at launch. By the time the ball reaches P, some of it has turned into PE.'], [m * GE * h, 'This is the PE at P, not the KE.'], [_kin(m, v0) + m * GE * h, 'The ball is climbing, so it LOSES KE as it gains PE. Subtract the PE gained.']],
      explain: 'The total mechanical energy is the launch KE: ½ m v₀² = ½ (' + fmt(m, 2) + ')(' + d2(v0) + ')² = ' + show(_kin(m, v0), 3) + ' J. At P the PE is m g h = ' + show(m * GE * h, 3) + ' J. So KE = ' + show(_kin(m, v0), 3) + ' − ' + show(m * GE * h, 3) + ' = ' + show(f(GE), 2) + ' J.', hint: 'KE_i + PE_i = KE_P + PE_P. At launch PE = 0 (height 0).', meta: { m: m, v0: v0, h: h } });
  });
});
T('CON-D4', 'cons', 75, 'Picture: speed of a ball thrown straight up, at a height', function () {
  return tryGen('CON-D4', function () {
    const nm = oneName(), v0 = pick([12, 15, 18, 20, 24]), h = pick([4.0, 6.0, 8.0, 10, 12]);
    if (h > v0 * v0 / (2 * GE) * 0.85) return null;
    const f = gg => Math.sqrt(v0 * v0 - 2 * gg * h), top = v0 * v0 / (2 * GE);
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: '<p>' + nm + ' throws a ball straight up at ' + d2(v0) + ' m/s from the ground. How fast is the ball moving when it is ' + d2(h) + ' m above the ground on the way up? (Ignore air resistance.)</p>' + sceneVertical('up', [{ l: 'Top', h: top, t1: 'highest point', t2: 'v = 0' }, { l: 'P', h: h, t1: 'height = ' + d2(h) + ' m', t2: 'v = ?' }, { l: 'Launch', h: 0, t1: 'v = ' + d2(v0) + ' m/s', t2: 'height = 0 m' }]),
      wrongs: [[v0 - Math.sqrt(2 * GE * h), 'Speeds do not subtract like this. Use energy: ½ m v₀² = m g h + ½ m v².'], [Math.sqrt(v0 * v0 + 2 * GE * h), 'The ball is going UP, so it loses KE to PE. The sign should be minus.'], [Math.sqrt(2 * GE * h), 'This is the speed the ball would reach falling h from rest. It ignores the launch energy.']],
      explain: '½ m v₀² = m g h + ½ m v². The m cancels: v² = v₀² − 2 g h, so v = √(' + d2(v0) + '² − 2 × 9.8 × ' + d2(h) + ') = ' + show(f(GE), 2) + ' m/s.', hint: 'Launch: all KE. At P: some PE and some KE. Set the totals equal.', meta: { v0: v0, h: h } });
  });
});
T('CON-D5', 'cons', 80, 'Picture: where is KE equal to PE?', function () {
  return tryGen('CON-D5', function () {
    const nm = oneName(), v0 = pick([12, 16, 20, 24, 28]), f = gg => v0 * v0 / (4 * gg), top = v0 * v0 / (2 * GE);
    return numQ({ n: 2, unit: ' m', right: f(GE), gf: f,
      prompt: '<p>' + nm + ' throws a ball straight up from the ground at ' + d2(v0) + ' m/s. At what height above the ground does the ball have exactly as much kinetic energy as potential energy? (Ignore air resistance.)</p>' + sceneVertical('up', [{ l: 'Top', h: top, t1: 'highest point', t2: 'v = 0' }, { l: 'Q', h: top / 2, t1: 'KE = PE', t2: 'height = ?' }, { l: 'Launch', h: 0, t1: 'v = ' + d2(v0) + ' m/s', t2: 'height = 0 m' }]),
      wrongs: [[v0 * v0 / (2 * GE), 'This is the ball’s highest point, where all the energy is PE and KE = 0.'], [v0 * v0 / (8 * GE), 'This is only a quarter of the maximum height. At KE = PE, half of the energy is PE.'], [3 * v0 * v0 / (8 * GE), 'At this height the PE is 3/4 of the total, not 1/2.']],
      explain: 'The total energy is ½ m v₀². When KE = PE, each is half the total: m g h = ½ (½ m v₀²) = ¼ m v₀². So h = v₀² ÷ (4 g) = ' + show(f(GE), 2) + ' m, which is half of the maximum height.', hint: 'The total energy is split 50/50. So PE = half of ½ m v₀².', meta: { v0: v0 } });
  });
});
/* ---- ball thrown straight down from a cliff ---- */
T('CON-D6', 'cons', 75, 'Picture: speed of a ball thrown straight down, partway down', function () {
  return tryGen('CON-D6', function () {
    const nm = oneName(), H = pick([20, 25, 30, 40]), h = pick([5.0, 8.0, 10, 12]), v0 = pick([4.0, 6.0, 8.0, 10]);
    if (h > H - 6) return null;
    const f = gg => Math.sqrt(v0 * v0 + 2 * gg * (H - h));
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: '<p>' + nm + ' throws a ball straight down from the top of a ' + d2(H) + ' m cliff at ' + d2(v0) + ' m/s. How fast is the ball moving when it is ' + d2(h) + ' m above the ground (point P)? (Ignore air resistance.)</p>' + sceneVertical('down', [{ l: 'Start', h: H, t1: 'height = ' + d2(H) + ' m', t2: 'v = ' + d2(v0) + ' m/s down' }, { l: 'P', h: h, t1: 'height = ' + d2(h) + ' m', t2: 'v = ?' }, { l: 'Ground', h: 0, t1: 'height = 0 m' }]),
      wrongs: [[Math.sqrt(v0 * v0 + 2 * GE * h), 'This uses the height of P above the ground. The ball has only fallen from H to P, a drop of (H − h).'], [v0 + Math.sqrt(2 * GE * (H - h)), 'Speeds do not add. Energies do: PE + KE at the start equals PE + KE at P.'], [Math.sqrt(2 * GE * (H - h)), 'This ignores the ball’s starting KE. It was thrown, not dropped.']],
      explain: 'The ball fell H − h = ' + fmt(H - h, 2) + ' m. m g H + ½ m v₀² = m g h + ½ m v², so v² = v₀² + 2 g (H − h) and v = ' + show(f(GE), 2) + ' m/s.', hint: 'Start: PE and KE. At P: smaller PE, bigger KE. Only the DROP (H − h) matters.', meta: { H: H, h: h, v0: v0 } });
  });
});
T('CON-D7', 'cons', 70, 'Picture: KE just before a thrown-down ball lands', function () {
  return tryGen('CON-D7', function () {
    const nm = oneName(), m = pick([0.50, 1.0, 2.0]), v0 = pick([4.0, 6.0, 8.0, 10]), H = pick([10, 15, 20, 30]);
    const f = gg => _kin(m, v0) + m * gg * H;
    return numQ({ n: 2, unit: ' J', right: f(GE), gf: f,
      prompt: '<p>' + nm + ' throws a ' + fmt(m, 2) + ' kg ball straight down from a ' + d2(H) + ' m cliff at ' + d2(v0) + ' m/s. How much kinetic energy does the ball have just before it hits the ground? (Ignore air resistance.)</p>' + sceneVertical('down', [{ l: 'Start', h: H, t1: 'height = ' + d2(H) + ' m', t2: 'v = ' + d2(v0) + ' m/s down' }, { l: 'Landing', h: 0, t1: 'height = 0 m', t2: 'KE = ?' }]),
      wrongs: [[m * GE * H, 'This is only the PE at the top. The ball also started with KE from being thrown.'], [_kin(m, v0), 'This is only the starting KE. The fall adds m g H more.'], [0.5 * m * Math.pow(v0 + Math.sqrt(2 * GE * H), 2), 'Speeds do not add. Add the ENERGIES: KE at the start + PE at the start.']],
      explain: 'At the ground all the energy is KE: KE = PE_start + KE_start = m g H + ½ m v₀² = ' + show(m * GE * H, 3) + ' + ' + show(_kin(m, v0), 3) + ' = ' + show(f(GE), 2) + ' J.', hint: 'At the ground PE = 0, so all of the total mechanical energy is KE.', meta: { m: m, v0: v0, H: H } });
  });
});
/* ---- energy bar charts ---- */
T('CON-D8', 'cons', 50, 'Bar chart: find the missing KE (no friction)', function () {
  return tryGen('CON-D8', function () {
    const nm = oneName(), T0 = pick([60, 80, 100, 120, 150, 200]), fa = pick([0.5, 0.6, 0.8, 1.0]), fb = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7]);
    const peA = T0 * fa, keA = T0 - peA, peB = T0 * fb, keB = T0 - peB;
    if ([peA, keA, peB, keB].some(x => Math.abs(sig(x, 2) - x) > 1e-9) || peB >= peA) return null;
    const what = pick(['skateboarder', 'roller coaster car', 'ball on a ramp', 'sled']);
    return numQ({ n: 2, unit: ' J', right: keB,
      prompt: '<p>' + nm + ' watches a ' + what + ' move along a frictionless path. The bar chart shows its energy at point A and its PE at point B. What is its kinetic energy at point B?</p>' + sceneBars([{ t: 'A', pe: peA, ke: keA }, { t: 'B', pe: peB, ke: null }], T0),
      wrongs: [[T0 + peB, 'KE and PE are parts of the total, so KE cannot be bigger than the total. KE = total − PE.'], [peB, 'This is the PE at B. The KE is the rest of the total.'], [T0, 'This is the total. At B part of it is PE.']],
      explain: 'With no friction the total stays the same. At A: PE + KE = ' + peA + ' + ' + keA + ' = ' + T0 + ' J. At B: PE_B + KE_B = ' + T0 + ' J, so KE_B = ' + T0 + ' − ' + peB + ' = ' + keB + ' J.', hint: 'Add the two bars at A to get the total. The bars at B must add up to the same total.', meta: { peA: peA, keA: keA, peB: peB } });
  });
});
T('CON-D9', 'cons', 65, 'Bar chart: how much energy turned into thermal energy?', function () {
  return tryGen('CON-D9', function () {
    const nm = oneName(), PA = pick([80, 100, 120, 150, 200]), pb = pick([0.2, 0.3, 0.4]), kb = pick([0.3, 0.4, 0.5]);
    const PB = PA * pb, KB = PA * kb, TH = PA - PB - KB;
    if ([PB, KB, TH].some(x => Math.abs(sig(x, 2) - x) > 1e-9) || TH < 0.1 * PA) return null;
    return numQ({ n: 2, unit: ' J', right: TH,
      prompt: '<p>' + nm + ' slides a box down a ramp that has friction. At point A the box is at rest at the top. At point B, lower on the ramp, the box has the energies shown. How much mechanical energy has been changed into thermal energy between A and B?</p>' + sceneBars([{ t: 'A', pe: PA, ke: 0 }, { t: 'B', pe: PB, ke: KB, th: null }], PA),
      wrongs: [[PA, 'This is the TOTAL mechanical energy at A. Part of it is still PE and KE at B.'], [PB + KB, 'This is the mechanical energy the box still has at B, not the amount lost.'], [PA - PB, 'This is how much PE was lost, but part of that became KE. The thermal energy is what is left over.']],
      explain: 'Total at A = ' + PA + ' J. Mechanical energy at B = ' + PB + ' + ' + KB + ' = ' + (PB + KB) + ' J. Thermal energy = ' + PA + ' − ' + (PB + KB) + ' = ' + TH + ' J.', hint: 'Mechanical energy at A minus mechanical energy at B. The difference is the thermal energy.', meta: { PA: PA, PB: PB, KB: KB } });
  });
});
const _UPPOS = [['just after the launch', 0, 100], ['one-quarter of the way up to its highest point', 25, 75], ['halfway up to its highest point', 50, 50], ['three-quarters of the way up to its highest point', 75, 25], ['at its highest point', 100, 0]];
const _DNPOS = [['just after it is released', 100, 0], ['one-quarter of the way down', 75, 25], ['halfway down', 50, 50], ['three-quarters of the way down', 25, 75], ['just before it hits the ground', 0, 100]];
T('CON-D10', 'cons', 40, 'Which energy bar chart matches the ball?', function () {
  const up = rand() < 0.5, tbl = up ? _UPPOS : _DNPOS, i = ri(0, tbl.length - 1), nm = oneName();
  const others = shuffle(tbl.filter((x, j) => j !== i)).slice(0, 3);
  const mk = x => barPick(x[1], x[2]);
  return { prompt: nm + (up ? ' throws a ball straight up from the ground. ' : ' drops a ball from rest from a high window. ') + 'Ignore air resistance. The bars show the ball’s PE and KE as a share of its total mechanical energy. Which bar chart matches the ball ' + tbl[i][0] + '?',
    right: mk(tbl[i]), wrongs: others.map(o => [mk(o), 'This chart matches the ball ' + o[0] + ', not ' + tbl[i][0] + '.']),
    explain: 'The total never changes. ' + tbl[i][0].charAt(0).toUpperCase() + tbl[i][0].slice(1) + ', the ball has ' + tbl[i][1] + '% of its energy as PE and ' + tbl[i][2] + '% as KE, so the two bars add up to the same total at every point.', hint: 'The two bars always add up to the same total. Is the ball high or low? Fast or slow?', meta: { up: up, i: i } };
});
const _EQ = [
  { sc: 'up', text: function (nm) { return nm + ' throws a ball straight up from the ground at speed v₀. You want its speed v when it is at a height h.'; },
    right: '½ m v₀² = m g h + ½ m v²', w: [['m g h = ½ m v²', 'This ignores the ball’s launch KE. At launch (height 0) it already has ½ m v₀².'], ['½ m v₀² + m g h = ½ m v²', 'Going UP, the ball gains PE, so its KE gets smaller. The m g h belongs on the side with ½ m v².'], ['½ m v₀² = ½ m v²', 'This leaves out the PE at height h. The ball is higher, so some KE became PE.']] },
  { sc: 'down', text: function (nm) { return nm + ' throws a ball straight down from a cliff of height H at speed v₀. You want its speed v just before it hits the ground.'; },
    right: 'm g H + ½ m v₀² = ½ m v²', w: [['m g H = ½ m v²', 'This is only right for a ball that is dropped from rest. This one was thrown, so it also had ½ m v₀².'], ['m g H − ½ m v₀² = ½ m v²', 'The starting KE adds to the energy. It does not subtract.'], ['½ m v₀² = m g H + ½ m v²', 'At the ground the PE is zero. The PE term belongs on the starting side.']] },
  { sc: 'track', text: function (nm) { return nm + ' rides a cart on a frictionless track. At point A the height is h<sub>A</sub> and the speed is v<sub>A</sub>. You want the speed v<sub>B</sub> at point B, where the height is h<sub>B</sub>.'; },
    right: 'm g h<sub>A</sub> + ½ m v<sub>A</sub>² = m g h<sub>B</sub> + ½ m v<sub>B</sub>²', w: [['m g h<sub>A</sub> = m g h<sub>B</sub> + ½ m v<sub>B</sub>²', 'This forgets the KE at A. The cart is already moving there.'], ['m g h<sub>A</sub> + ½ m v<sub>A</sub>² = ½ m v<sub>B</sub>²', 'This forgets the PE at B. Point B is above the ground.'], ['m g h<sub>A</sub> + m g h<sub>B</sub> = ½ m v<sub>A</sub>² + ½ m v<sub>B</sub>²', 'The initial energies (PE + KE at A) go on one side and the final energies (PE + KE at B) on the other.']] }
];
T('CON-D11', 'cons', 55, 'Picture: choose the energy conservation equation', function () {
  const e = pick(_EQ), nm = oneName();
  let pic = '';
  if (e.sc === 'up') pic = sceneVertical('up', [{ l: 'Top', h: 7.5, t1: 'highest point' }, { l: 'P', h: 4, t1: 'height h', t2: 'speed v' }, { l: 'Launch', h: 0, t1: 'speed v₀' }]);
  else if (e.sc === 'down') pic = sceneVertical('down', [{ l: 'Start', h: 10, t1: 'height H', t2: 'speed v₀ down' }, { l: 'Landing', h: 0, t1: 'speed v' }]);
  else pic = sceneTrack({ h: 10, hl: 'h = hA', v: 'v = vA', l: 'A' }, { h: 4, hl: 'h = hB', v: 'v = ?', l: 'B' });
  return { prompt: '<p>' + e.text(nm) + ' Which equation, PE<sub>i</sub> + KE<sub>i</sub> = PE<sub>f</sub> + KE<sub>f</sub>, correctly describes this situation? (Ignore air resistance and friction.)</p>' + pic,
    right: e.right, wrongs: e.w, explain: 'Set the initial mechanical energy (PE + KE) equal to the final mechanical energy: ' + e.right + '. Then solve for the unknown speed.', hint: 'List the initial PE and KE on the left, and the final PE and KE on the right.', meta: { sc: e.sc } };
});
T('CON-D12', 'cons', 60, 'Picture: PE at the top of a thrown ball', function () {
  return tryGen('CON-D12', function () {
    const nm = oneName(), m = pick([0.50, 1.0, 2.0, 3.0]), v0 = pick([10, 12, 15, 20]), top = v0 * v0 / (2 * GE);
    return numQ({ n: 2, unit: ' J', right: _kin(m, v0),
      prompt: '<p>' + nm + ' throws a ' + fmt(m, 2) + ' kg ball straight up from the ground at ' + d2(v0) + ' m/s. How much gravitational potential energy does the ball have at its highest point? (Ignore air resistance.)</p>' + sceneVertical('up', [{ l: 'Top', h: top, t1: 'highest point', t2: 'PE = ?' }, { l: 'Launch', h: 0, t1: 'v = ' + d2(v0) + ' m/s', t2: 'height = 0 m' }]),
      wrongs: [[m * v0, 'This is mass times speed, which is not an energy. Use ½ m v².'], [0.5 * m * v0, 'The speed must be squared: KE = ½ m v².'], [m * v0 * v0, 'This left out the ½. The launch KE is ½ m v₀².']],
      explain: 'At the top the ball is momentarily stopped, so all of its mechanical energy is PE. That equals the launch KE: ½ m v₀² = ½ (' + fmt(m, 2) + ')(' + d2(v0) + ')² = ' + show(_kin(m, v0), 2) + ' J. You do not need the height.', hint: 'At the top KE = 0. Where did all that launch energy go?', meta: { m: m, v0: v0 } });
  });
});
T('CON-D13', 'cons', 80, 'Picture: thermal energy on a track with friction', function () {
  return tryGen('CON-D13', function () {
    const nm = oneName(), m = pick([20, 30, 40, 50, 60]), hA = pick([6.0, 8.0, 10, 12]), hB = pick([1.0, 2.0, 3.0]), vA = pick([2.0, 3.0, 4.0]), vB = pick([6.0, 7.0, 8.0, 9.0, 10]);
    const ideal = Math.sqrt(vA * vA + 2 * GE * (hA - hB));
    if (vB > 0.85 * ideal || vB < 0.4 * ideal) return null;
    const f = gg => m * gg * (hA - hB) + _kin(m, vA) - _kin(m, vB);
    return numQ({ n: 2, unit: ' J', right: f(GE), gf: f,
      prompt: '<p>' + nm + ' rides a ' + d2(m) + ' kg cart on a track with friction. At A the cart is ' + d2(hA) + ' m above the ground moving at ' + d2(vA) + ' m/s. At B, ' + d2(hB) + ' m above the ground, it is moving at ' + d2(vB) + ' m/s. How much mechanical energy was changed into thermal energy between A and B?</p>' + sceneTrack({ h: hA, hl: 'h = ' + d2(hA) + ' m', v: 'v = ' + d2(vA) + ' m/s', l: 'A' }, { h: hB, hl: 'h = ' + d2(hB) + ' m', v: 'v = ' + d2(vB) + ' m/s', l: 'B' }),
      wrongs: [[m * GE * (hA - hB), 'This is only the PE lost. The cart also had KE at A and still has KE at B.'], [_kin(m, vB) - _kin(m, vA), 'This is the change in KE (the KE gained), not the thermal energy.'], [m * GE * (hA - hB) + _kin(m, vB) - _kin(m, vA), 'The KE gained is NOT lost. Thermal energy = mechanical energy at A − mechanical energy at B.']],
      explain: 'ME at A = m g h_A + ½ m v_A² = ' + show(m * GE * hA + _kin(m, vA), 3) + ' J. ME at B = m g h_B + ½ m v_B² = ' + show(m * GE * hB + _kin(m, vB), 3) + ' J. Thermal = ' + show(f(GE), 2) + ' J.', hint: 'Find KE + PE at each point. The mechanical energy that disappeared became thermal energy.', meta: { m: m, hA: hA, hB: hB, vA: vA, vB: vB } });
  });
});
