'use strict';
/* Answer-key accuracy for the Energy unit. Every template is generated many times and its correct answer is recomputed
   HERE by a different route than the question uses (bisection on the forward formula, kinematics, force balance, or
   plain arithmetic from the numbers printed in the question). Earth answers must also be identical at g = 9.8 and g = 9.81.
   Run:  node tests/test_energy.js      (N=800 per template by default) */
process.env.UNIT_DIR = 'units/8-energy';
const vm = require('vm');
const ctx = require('./load.js')(['roster', 'core', 'unit', 'qapi', 'banks', 'registry']);
const run = s => vm.runInContext(s, ctx);
const strip = h => String(h).replace(/<[^>]+>/g, '').replace(/&times;/g, 'x').replace(/&minus;/g, '-').replace(/&[a-z]+;/g, '').trim();
const fmt = (x, n) => run('fmt')(x, n), sci = (x, n) => run('sci')(x, n);
const sh = (x, n) => x >= 1e5 ? strip(sci(x, n)) : fmt(x, n);          // how the site shows n significant figures
const G1 = 9.8, G2 = 9.81;
let fails = 0, checks = 0;
const bad = m => { fails++; if (fails <= 40) console.log('  FAIL: ' + m); };
const correctOf = q => strip(q.choices.find(c => c.ok).html);
function bisect(f, lo, hi) { for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if ((f(lo) > 0) === (f(mid) > 0)) lo = mid; else hi = mid; } return (lo + hi) / 2; }
const num = (s, re) => { const m = re.exec(s); return m ? m.slice(1).map(Number) : null; };
const deg = d => d * Math.PI / 180;

/* each checker returns {exp: string} or {exp: g => string, g: true} */
const C = {};
const E = (n, unit, fn) => gg => sh(fn(gg), n) + unit;
/* ---- What is energy ---- */
const KIND = { 'a hockey puck sliding': 'K', 'a skateboarder rolling': 'K', 'a bowling ball rolling': 'K', 'a compressed spring': 'P', 'a bow that is pulled': 'P', 'a climber standing': 'P', 'a stretched rubber band': 'P', 'a book resting': 'P', 'water held still': 'P', 'a bird flying': 'B', 'a roller coaster car moving': 'B', 'a ball thrown upward': 'B', 'a skier speeding': 'B', 'an apple falling': 'B' };
const KTXT = { K: 'Kinetic energy only', P: 'Potential energy only', B: 'Both kinetic and potential energy' };
C['ENG-T1'] = (m, q) => { const p = strip(q.prompt), k = Object.keys(KIND).find(x => p.indexOf(x) >= 0); return { exp: KTXT[KIND[k]] }; };
const TR = { 'a toaster': 'Electrical energy changes into thermal energy', 'a solar-powered calculator': 'Light energy changes into electrical energy', 'a campfire': 'Chemical energy changes into thermal energy and light', 'a wind turbine': 'Kinetic energy of the wind changes into electrical energy', 'a phone speaker': 'Electrical energy changes into sound energy', 'a person climbing stairs': 'Chemical energy from food changes into gravitational potential energy', 'a battery-powered toy car': 'Chemical energy changes into electrical energy, then into kinetic energy' };
C['ENG-T2'] = (m, q) => { const p = strip(q.prompt), k = Object.keys(TR).find(x => p.indexOf(' in ' + x + '?') >= 0); return { exp: TR[k] }; };
/* ---- Kinetic energy: forward answers by kinematics (constant acceleration over 1 m, then W = F d) ---- */
const keByWork = (mm, v) => { const d = 1, a = v * v / (2 * d); return mm * a * d; };
C['KE-T1'] = m => ({ exp: sh(keByWork(m.m, m.v), 2) + ' J' });
C['KE-T2'] = (m, q) => { const p = strip(q.prompt), KE = num(p, /has ([\d.]+) J of kinetic energy while moving at ([\d.]+) m\/s/); return { exp: sh(bisect(x => keByWork(x, KE[1]) - KE[0], 0.001, 1e4), 2) + ' kg' }; };
C['KE-T3'] = (m, q) => { const [mm, KE] = num(strip(q.prompt), /A ([\d.]+) kg object has ([\d.]+) J/); return { exp: sh(bisect(x => keByWork(mm, x) - KE, 0.001, 1e4), 2) + ' m/s' }; };
function factorsFromText(p) {
  const f = { mass: 1, speed: 1, height: 1 };
  const words = { doubles: 2, triples: 3, quadruples: 4, 'is multiplied by 3': 3, 'is multiplied by 2': 2, 'is multiplied by 4': 4, 'is multiplied by 9': 9, 'is multiplied by 5': 5, 'is cut in half': 0.5, 'is cut to one-third': 1 / 3 };
  const lower = p.toLowerCase();
  ['mass', 'speed', 'height'].forEach(q => { Object.keys(words).forEach(w => { if (lower.indexOf('the ' + q + ' ' + w) >= 0) f[q] *= words[w]; }); });
  if (/both the mass and the speed double/.test(lower)) { f.mass *= 2; f.speed *= 2; }
  if (/both the mass and the height double/.test(lower)) { f.mass *= 2; f.height *= 2; }
  return f;
}
const FACT = { 0.0625: 'one-sixteenth', 0.125: 'one-eighth', 0.25: 'one-fourth', 0.5: 'half', 1: 'the same size', 2: 'twice', 3: 'three times', 4: 'four times', 4.5: 'four and a half times', 5: 'five times', 6: 'six times', 8: 'eight times', 9: 'nine times', 10: 'ten times', 12: 'twelve times', 16: 'sixteen times', 18: 'eighteen times', 25: 'twenty-five times', 27: 'twenty-seven times', 64: 'sixty-four times' };
const factText = f => { const k = Object.keys(FACT).find(x => Math.abs(Number(x) - f) < 1e-9); return k === undefined ? '??' + f : 'The ' + (CUR_KIND) + ' becomes ' + FACT[k] + (['the same size'].includes(FACT[k]) ? '' : ' as large'); };
let CUR_KIND = 'KE';
C['KE-T4'] = (m, q) => { const f = factorsFromText(strip(q.prompt)); CUR_KIND = 'KE'; return { exp: factText(f.mass * f.speed * f.speed) }; };
C['PE-T4'] = (m, q) => { const f = factorsFromText(strip(q.prompt)); CUR_KIND = 'PE'; return { exp: factText(f.mass * f.height) }; };
C['CH-T1'] = (m, q) => { const p = strip(q.prompt).toLowerCase(); const f = { mass: 1, speed: 1 };
  const mm = /mass is multiplied by (\d)/.exec(p), ms = /speed is multiplied by (\d)/.exec(p);
  if (mm) f.mass = Number(mm[1]); if (ms) f.speed = Number(ms[1]);
  if (/mass is cut in half/.test(p)) f.mass = 0.5; if (/speed is cut in half/.test(p)) f.speed = 0.5; if (/speed is cut to one-third/.test(p)) f.speed = 1 / 3;
  CUR_KIND = 'KE'; return { exp: factText(f.mass * f.speed * f.speed) }; };
C['KE-T5'] = m => { const a = 0.5 * m.m1 * m.v1 * m.v1, b = 0.5 * m.m2 * m.v2 * m.v2; return { exp: a > b ? 'Object 1 has more KE' : 'Object 2 has more KE' }; };
C['KE-T6'] = m => ({ exp: sh(keByWork(m.g / 1000, m.v), 2) + ' J' });
/* ---- Potential energy: forward answer by W = F d against weight (lift at constant speed) ---- */
const peByWork = (mm, h, gg) => (mm * gg) * h;
C['PE-T1'] = m => ({ g: true, exp: gg => sh(peByWork(m.m, m.h, gg), 2) + ' J' });
C['PE-T2'] = (m, q) => { const [mm, PE] = num(strip(q.prompt), /A ([\d.]+) kg object has ([\d.]+) J/); return { g: true, exp: gg => sh(bisect(x => peByWork(mm, x, gg) - PE, 0.0001, 1e4), 2) + ' m' }; };
C['PE-T3'] = (m, q) => { const [h, PE] = num(strip(q.prompt), /height of ([\d.]+) m has ([\d.]+) J/); return { g: true, exp: gg => sh(bisect(x => peByWork(x, h, gg) - PE, 0.0001, 1e4), 2) + ' kg' }; };
C['PE-T5'] = m => ({ g: true, exp: gg => sh(peByWork(m.m, m.h2, gg) - peByWork(m.m, m.h1, gg), 2) + ' J' });
C['PE-T6'] = m => m.isKE ? { exp: sh(keByWork(m.m, m.x), 2) + ' J' } : { g: true, exp: gg => sh(peByWork(m.m, m.x, gg), 2) + ' J' };
/* ---- Conservation: solve the energy balance by bisection ---- */
C['CON-T1'] = m => ({ g: true, exp: gg => sh(bisect(v => 1 * gg * m.h - 0.5 * v * v, 0, 1e3), 2) + ' m/s' });
C['CON-T2'] = m => ({ g: true, exp: gg => sh(bisect(h => 0.5 * m.v * m.v - gg * h, 0, 1e4), 2) + ' m' });
C['CON-T3'] = m => ({ g: true, exp: gg => sh(bisect(v => 0.5 * m.v0 * m.v0 + gg * m.h - 0.5 * v * v, 0, 1e3), 2) + ' m/s' });
C['CON-T4'] = m => ({ g: true, exp: gg => sh(m.m * gg * m.h1 - m.m * gg * m.h2, 2) + ' J' });
C['CON-T5'] = m => ({ exp: sh(m.ME - m.PE, 2) + ' J' });
C['CON-T6'] = m => ({ g: true, exp: gg => sh(m.m * gg * m.h - 0.5 * m.m * m.v * m.v, 2) + ' J' });
/* ---- Work ---- */
C['WRK-T1'] = (m, q) => { const [F, d] = num(strip(q.prompt), /force of ([\d.]+) N\..*moves ([\d.]+) m/); return { exp: sh(F * d, 2) + ' J' }; };
C['WRK-T2'] = (m, q) => { const [W, d] = num(strip(q.prompt), /does ([\d.e+]+) J of work sliding a box ([\d.]+) m/); return { exp: sh(bisect(F => F * d - W, 0, 1e6), 2) + ' N' }; };
C['WRK-T3'] = (m, q) => { const [F, W] = num(strip(q.prompt), /A force of ([\d.]+) N does ([\d.e+]+) J/); return { exp: sh(bisect(d => F * d - W, 0, 1e6), 2) + ' m' }; };
C['WRK-T4'] = (m, q) => { const [F, h] = num(strip(q.prompt), /lifts a ([\d.]+) N pack straight up ([\d.]+) m/); return { exp: sh(F * h, 2) + ' J' }; };
const WK = { 'pushes a chair 4 m': 'A', 'lifts a boulder upward': 'A', 'bulldozer pushes': 'A', 'elevator motor': 'A', 'pulls a sled forward': 'A', 'weightlifter holds': 'B', 'pushes as hard as possible': 'B', 'pulls on a rope tied': 'B', 'waiter carries': 'C', 'carries a heavy backpack': 'C', 'ice skater glides': 'D' };
const WT = { A: 'Yes, because a force makes the object move in the direction of the force', B: 'No, because the object does not move, so the distance is zero', C: 'No, because the force is upward but the motion is sideways', D: 'No, because no force is acting on the object in the direction it moves' };
C['WRK-T5'] = (m, q) => { const p = strip(q.prompt), k = Object.keys(WK).find(x => p.indexOf(x) >= 0); return { exp: WT[WK[k]] }; };
C['WRK-T6'] = m => ({ g: true, exp: gg => sh(m.m * gg * m.h, 2) + ' J' });
/* ---- Power ---- */
C['PWR-T1'] = (m, q) => { const [W, t] = num(strip(q.prompt), /does ([\d.e+]+) J of work in ([\d.]+) s/); return { exp: sh(bisect(P => P * t - W, 0, 1e9), 2) + ' W' }; };
C['PWR-T2'] = (m, q) => { const [P, t] = num(strip(q.prompt), /A ([\d.]+) W motor runs for ([\d.]+) s/); return { exp: sh(P * t, 2) + ' J' }; };
C['PWR-T3'] = (m, q) => { const P = num(strip(q.prompt), /a ([\d.]+) W machine/)[0], W = num(strip(q.prompt), /do ([\d.e+]+) J of work/)[0]; return { exp: sh(bisect(t => P * t - W, 0, 1e6), 2) + ' s' }; };
C['PWR-T4'] = (m, q) => {
  const p = strip(q.prompt), r = /(\w+) lifts a ([\d.]+) N box from the floor to a height of ([\d.]+) m in ([\d.]+) s\. (\w+) lifts a ([\d.]+) N box from the floor to ([\d.]+) m in ([\d.]+) s/.exec(p);
  const [a, F1, h1, t1, b, F2, h2, t2] = [r[1], Number(r[2]), Number(r[3]), Number(r[4]), r[5], Number(r[6]), Number(r[7]), Number(r[8])];
  const w1 = F1 * h1, w2 = F2 * h2, p1 = w1 / t1, p2 = w2 / t2;
  const pw = p1 > p2 ? a : b, wk = Math.abs(w1 - w2) < 1e-9 ? 'same' : (w1 > w2 ? a : b);
  const exp = wk === 'same' ? 'They do the same work, but ' + pw + ' has more power' : (wk === pw ? wk + ' does more work and has more power' : wk + ' does more work, but ' + pw + ' has more power');
  return { exp: exp };
};
C['PWR-T5'] = m => ({ g: true, exp: gg => sh(m.m * gg * m.h / m.t, 2) + ' W' });
C['PWR-T6'] = m => ({ exp: sh(m.k * 1000 * m.t, 2) + ' J' });
/* ---- Machines and efficiency ---- */
C['MCH-T1'] = (m, q) => { const r = num(strip(q.prompt), /weighing ([\d.]+) N up a ramp that is ([\d.]+) m long and raises it ([\d.]+) m\. The push along the ramp is ([\d.]+) N/); const [W, L, h, F] = r; return { exp: sh(100 * (W * h) / (F * L), 2) + '%' }; };
C['MCH-T2'] = (m, q) => { const r = num(strip(q.prompt), /push a ([\d.]+) N crate up a ramp ([\d.]+) m long that rises ([\d.]+) m/); const [W, L, h] = r; return { exp: sh(bisect(F => F * L - W * h, 0, 1e7), 2) + ' N' }; };
C['MCH-T3'] = () => ({ exp: 'The longer ramp needs less force, and the work is the same' });
const MA = { 'a ramp up to a loading dock': 'Inclined plane', 'a wheelchair ramp': 'Inclined plane', 'a sloped road up a hill': 'Inclined plane', 'a jar lid': 'Screw', 'a bolt and nut': 'Screw', 'a spiral light bulb base': 'Screw', 'a seesaw': 'Lever', 'a crowbar': 'Lever', 'a pair of tongs': 'Lever', 'the rope and wheel at the top of a flagpole': 'Pulley', 'the rope-and-wheel hoist on a crane': 'Pulley', 'the rope over a wheel in a well': 'Pulley', 'an axe blade': 'Wedge', 'a doorstop': 'Wedge', 'a knife blade': 'Wedge', 'a doorknob': 'Wheel and axle', 'a car’s steering wheel': 'Wheel and axle', 'a bicycle wheel turning on its axle': 'Wheel and axle' };
C['MCH-T4'] = (m, q) => { const p = strip(q.prompt), k = Object.keys(MA).find(x => p.indexOf('is ' + x + '?') >= 0); return { exp: MA[k] }; };
C['EFF-T1'] = (m, q) => { const [inn, out] = num(strip(q.prompt), /uses ([\d.]+) J of energy and gives ([\d.]+) J/); return { exp: sh(100 - 100 * (inn - out) / inn, 2) + '%' }; };
C['EFF-T2'] = m => ({ exp: sh(100 * (m.inn - m.lost) / m.inn, 2) + '%' });
C['EFF-T3'] = m => ({ exp: sh(bisect(x => x * m.e / 100 - m.out, 0, 1e9), 2) + ' J' });
C['EFF-T4'] = m => ({ exp: sh(m.inn * m.e / 100, 2) + ' J' });
C['EFF-T5'] = m => { const ee = m.out.map((o, i) => o / m.inn[i]); return { exp: 'Model ' + 'ABC'[ee.indexOf(Math.max(...ee))] }; };
C['EFF-T6'] = m => ({ exp: sh(100 * m.pout / m.pin, 2) + '%' });
C['EFF-T7'] = m => ({ g: true, exp: gg => sh(100 * (0.5 * m.m * m.v * m.v) / (m.m * gg * m.h), 2) + '%' });
/* ---- Challenge ---- */
const CHGV = { Moon: 1.62, Mars: 3.7, Jupiter: 23.1 };
C['CH-T2'] = m => ({ exp: sh(m.m * CHGV[m.pl] * m.h, 2) + ' J' });
C['CH-T3'] = m => ({ exp: sh(bisect(v => 0.5 * m.m * v * v - m.F * m.d, 0, 1e4), 2) + ' m/s' });
C['CH-T4'] = m => { /* brake force from the first stop, then the second stop by energy */ const v1 = num(strip(ctxPrompt), /moving at ([\d.]+) m\/s slides ([\d.]+) m/); const v2 = num(strip(ctxPrompt), /started at ([\d.]+) m\/s/)[0]; const fr = 0.5 * 1 * v1[0] * v1[0] / v1[1]; return { exp: sh(0.5 * 1 * v2 * v2 / fr, 2) + ' m' }; };
C['CH-T5'] = m => ({ g: true, exp: gg => sh((m.m * gg * m.h) / (m.e / 100), 2) + ' J' });
C['CH-T6'] = m => ({ g: true, exp: gg => sh((m.m * gg * m.h / m.t) / (m.e / 100), 2) + ' W' });
C['CH-T7'] = m => ({ g: true, exp: gg => { const s = m.h / m.L, a = (m.m * gg * s - m.fr) / m.m; return sh(Math.sqrt(2 * a * m.L), 2) + ' m/s'; } });
C['CH-T8'] = m => ({ g: true, exp: gg => sh(m.m * gg * (m.h / m.L) + m.fr, 2) + ' N' });
C['CH-T9'] = m => ({ exp: sh([m.a, m.b, m.c].reduce((x, y) => x * y / 100, 100), 2) + '%' });
C['CH-T10'] = m => ({ exp: sh(m.k, 2) + ' kg' });
C['CH-T11'] = m => ({ exp: sh(100 * (m.P1 * m.e1 / 100) / m.P2, 2) + '%' });
/* ---- Super Advanced ---- */
C['ADV-T1'] = m => { let W = 0; const N = 20000, dx = m.x2 / N; for (let i = 0; i < N; i++) { const x = (i + 0.5) * dx, F = x <= m.x1 ? m.F0 : m.F0 * (m.x2 - x) / (m.x2 - m.x1); W += F * dx; } return { exp: sh(W, 2) + ' J' }; };
C['ADV-T2'] = m => { let U = 0; const N = 20000, dx = m.x / N; for (let i = 0; i < N; i++) U += m.k * (i + 0.5) * dx * dx; /* integral of F dx with F = k x */ return { exp: sh(U, 2) + ' J' }; };
C['ADV-T3'] = m => { let U = 0; const N = 20000, dx = m.x / N; for (let i = 0; i < N; i++) U += m.k * (i + 0.5) * dx * dx; return { exp: sh(bisect(v => 0.5 * m.m * v * v - U, 0, 1e4), 2) + ' m/s' }; };
C['ADV-T4'] = m => ({ g: true, exp: gg => sh(bisect(x => 0.5 * m.k * x * x - m.m * gg * (m.H + x), 0, 1e3), 2) + ' m' });
C['ADV-T5'] = m => ({ exp: sh(bisect(h => { const vTop2 = 2 * G1 * (h - 2 * m.R); return vTop2 - G1 * m.R; }, 0.001, 1e4), 2) + ' m' });
const PL = { Earth: { M: 5.98e24, R: 6.38e6 }, Moon: { M: 7.35e22, R: 1.74e6 } };
/* energy per kg to move out to (almost) infinity: add up F dr in geometric steps from R to 1e7 R, plus the tiny tail G M / r_end */
const climb = (M, R) => { let U = 0, r = R; const eps = 1e-3; while (r < R * 1e7) { const dr = r * eps; U += 6.67e-11 * M / ((r + dr / 2) * (r + dr / 2)) * dr; r += dr; } return U + 6.67e-11 * M / r; };
C['ADV-T6'] = m => { const { M, R } = PL[m.pn]; return { exp: sh(bisect(v => 0.5 * v * v - climb(M, R), 0, 1e6), 3) + ' m/s' }; };
C['ADV-T7'] = m => ({ exp: sh(m.m * climb(PL.Earth.M, PL.Earth.R), 3) + ' J' });
C['ADV-T8'] = m => ({ exp: sh(m.F * m.v, 2) + ' W' });
C['ADV-T9'] = (m, q) => { const p = strip(q.prompt), k = { 'speed doubles': 2, 'speed triples': 3, 'speed is cut in half': 0.5, 'speed quadruples': 4 }; const key = Object.keys(k).find(x => p.indexOf(x) >= 0); const s = k[key]; const drag = v => v * v, P = v => drag(v) * v; return { exp: 'The power becomes ' + FACT[Object.keys(FACT).find(x => Math.abs(Number(x) - P(s) / P(1)) < 1e-9)] + (P(s) === 1 ? '' : ' as large') }; };
C['ADV-T10'] = m => ({ g: true, exp: gg => { const V = bisect(v => 0.5 * (m.m + m.M) * v * v - (m.m + m.M) * gg * m.h, 0, 1e4); return sh(bisect(v0 => m.m * v0 - (m.m + m.M) * V, 0, 1e7), 2) + ' m/s'; } });
C['ADV-T11'] = m => { const v = 10, p0 = m.m * v, V = p0 / (m.m + m.M), K0 = 0.5 * m.m * v * v, K1 = 0.5 * (m.m + m.M) * V * V; return { exp: sh(100 * (K0 - K1) / K0, 2) + '%' }; };
C['ADV-T12'] = m => ({ g: true, exp: gg => { const a = m.mu * gg; return sh(m.v * m.v / (2 * a), 2) + ' m'; } });
C['ADV-T13'] = m => ({ g: true, exp: gg => { const a = gg * (Math.sin(deg(m.th)) - m.mu * Math.cos(deg(m.th))); return sh(Math.sqrt(2 * a * m.L), 2) + ' m/s'; } });
C['ADV-T14'] = m => ({ g: true, exp: gg => { const sp = (deg_) => { const th = deg(deg_), L = m.h / Math.sin(th), a = gg * Math.sin(th) / (1 + 0.4); return Math.sqrt(2 * a * L); }; if (Math.abs(sp(30) - sp(50)) > 1e-9) return 'ANGLE-DEPENDENT'; return sh(sp(30), 2) + ' m/s'; } });
C['ADV-T15'] = m => ({ g: true, exp: gg => sh(m.e / 100 * (1000 * m.Q * gg * m.h) / 1e6, 2) + ' MW' });
C['ADV-T16'] = m => { let W = 0; const N = 20000, dv = (m.v2 - m.v1) / N; for (let i = 0; i < N; i++) { const v = m.v1 + (i + 0.5) * dv; W += m.m * v * dv; /* dW = m v dv */ } return { exp: sh(W, 2) + ' J' }; };
C['ADV-T17'] = m => ({ g: true, exp: gg => { const yStart = -m.L * Math.cos(deg(m.th)), yEnd = -m.L; return sh(Math.sqrt(2 * gg * (yStart - yEnd)), 2) + ' m/s'; } });
C['ADV-T18'] = m => ({ g: true, exp: gg => { const a = m.m2 * gg / (m.m1 + m.m2); return sh(Math.sqrt(2 * a * m.d), 2) + ' m/s'; } });
C['ADV-T19'] = m => { const Qh = 1000, Qc = Qh * (m.Tc + 273) / (m.Th + 273); return { exp: sh(100 * (Qh - Qc) / Qh, 2) + '%' }; };
C['ADV-T20'] = m => ({ exp: sh((m.g / 1000) * 3e8 * 3e8, 2) + ' J' });
C['ADV-T21'] = m => ({ exp: sh(m.P * 1000 * (m.hr * 3600), 2) + ' J' });
C['ADV-T22'] = m => ({ exp: sh(0.5 * m.m * m.v * m.v / m.e / 4.6e7 * 1000, 2) + ' g' });
C['ADV-T23'] = m => { let W = 0; const N = 20000, dx = (m.x2 - m.x1) / N; for (let i = 0; i < N; i++) W += m.k * (m.x1 + (i + 0.5) * dx) * dx; return { exp: sh(W, 2) + ' J' }; };

/* ---- Pictures (CON-D#): kinematics, plain bookkeeping, or the physics table below ---- */
const kinV2 = (u2, a, d) => u2 + 2 * a * d;                       // v² = u² + 2 a d
C['CON-D1'] = m => ({ g: true, exp: gg => sh(Math.sqrt(kinV2(m.vA * m.vA, gg, m.hA - m.hB)), 2) + ' m/s' });
C['CON-D2'] = m => ({ g: true, exp: gg => sh(m.hA + (m.vA * m.vA - m.vB * m.vB) / (2 * gg), 2) + ' m' });
C['CON-D3'] = m => ({ g: true, exp: gg => { const v2 = kinV2(m.v0 * m.v0, -gg, m.h); return sh(0.5 * m.m * v2, 2) + ' J'; } });
C['CON-D4'] = m => ({ g: true, exp: gg => sh(Math.sqrt(kinV2(m.v0 * m.v0, -gg, m.h)), 2) + ' m/s' });
C['CON-D5'] = m => ({ g: true, exp: gg => { const top = m.v0 * m.v0 / (2 * gg); return sh(bisect(h => 0.5 * kinV2(m.v0 * m.v0, -gg, h) - gg * h, 0, top), 2) + ' m'; } });
C['CON-D6'] = m => ({ g: true, exp: gg => sh(Math.sqrt(kinV2(m.v0 * m.v0, gg, m.H - m.h)), 2) + ' m/s' });
C['CON-D7'] = m => ({ g: true, exp: gg => sh(0.5 * m.m * kinV2(m.v0 * m.v0, gg, m.H), 2) + ' J' });
C['CON-D8'] = m => ({ exp: sh((m.peA + m.keA) - m.peB, 2) + ' J' });
C['CON-D9'] = m => ({ exp: sh(m.PA - (m.PB + m.KB), 2) + ' J' });
C['CON-D10'] = m => { const f = m.up ? [0, 0.25, 0.5, 0.75, 1] : [1, 0.75, 0.5, 0.25, 0][m.i] !== undefined ? [1, 0.75, 0.5, 0.25, 0] : []; const frac = m.up ? [0, 0.25, 0.5, 0.75, 1][m.i] : [1, 0.75, 0.5, 0.25, 0][m.i]; const pe = Math.round(frac * 100); return { exp: strip(run('barPick')(pe, 100 - pe)) }; };
const EQX = { up: '½ m v₀² = m g h + ½ m v²', down: 'm g H + ½ m v₀² = ½ m v²', track: 'm g hA + ½ m vA² = m g hB + ½ m vB²' };
C['CON-D11'] = m => {
  /* check the key equation numerically with a real example, so the text is physically right */
  const g = 9.8, mm = 2.0;
  if (m.sc === 'up') { const v0 = 15, h = 5, v = Math.sqrt(v0 * v0 - 2 * g * h); if (Math.abs(0.5 * mm * v0 * v0 - (mm * g * h + 0.5 * mm * v * v)) > 1e-9) throw new Error('up equation false'); }
  if (m.sc === 'down') { const v0 = 6, H = 12, v = Math.sqrt(v0 * v0 + 2 * g * H); if (Math.abs(mm * g * H + 0.5 * mm * v0 * v0 - 0.5 * mm * v * v) > 1e-9) throw new Error('down equation false'); }
  if (m.sc === 'track') { const vA = 4, hA = 10, hB = 3, vB = Math.sqrt(vA * vA + 2 * g * (hA - hB)); if (Math.abs(mm * g * hA + 0.5 * mm * vA * vA - (mm * g * hB + 0.5 * mm * vB * vB)) > 1e-9) throw new Error('track equation false'); }
  return { exp: EQX[m.sc] };
};
C['CON-D12'] = m => ({ g: true, exp: gg => { const top = m.v0 * m.v0 / (2 * gg); return sh(m.m * gg * top, 2) + ' J'; } });
C['CON-D13'] = m => ({ g: true, exp: gg => { const MEa = m.m * gg * m.hA + 0.5 * m.m * m.vA * m.vA, MEb = m.m * gg * m.hB + 0.5 * m.m * m.vB * m.vB; return sh(MEa - MEb, 2) + ' J'; } });

let ctxPrompt = '';
const keys = run('QDEFS.order');
const N = Number(process.env.N || 800);
let tested = 0, missing = [];
keys.forEach(key => {
  const d = run('QDEFS.byKey["' + key + '"]');
  if (d.kind !== 'template') return;
  if (!C[key]) { missing.push(key); return; }
  tested++;
  for (let i = 0; i < N; i++) {
    run('setRng(mulberry32(' + (4000 + i * 6007 + key.length) + '))');
    const q = run('makeQuestion("' + key + '")'); checks++;
    ctxPrompt = q.prompt;
    let r;
    try { r = C[key](q.meta, q); } catch (e) { bad(key + ': checker error ' + e.message); break; }
    const got = correctOf(q);
    let exp;
    if (typeof r.exp === 'function') {
      exp = r.exp(G1); const e2 = r.exp(G2);
      if (exp !== e2) bad(key + ': the answer changes between g = 9.8 (' + exp + ') and g = 9.81 (' + e2 + ') meta=' + JSON.stringify(q.meta));
    } else exp = r.exp;
    if (strip(exp) !== got) { bad(key + ': key mismatch. expected "' + strip(exp) + '" got "' + got + '" meta=' + JSON.stringify(q.meta)); break; }
  }
});
if (missing.length) bad('no independent checker for: ' + missing.join(', '));
console.log('Recomputed ' + checks + ' generated questions across ' + tested + ' templates (' + N + ' each) with independent routes. Failures: ' + fails);
process.exit(fails ? 1 : 0);
