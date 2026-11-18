'use strict';
/* ===== Shared helpers for the Energy unit's question banks ===== */
function show(x, n) { return x >= 1e5 ? sci(x, n) : fmt(x, n); }          // n significant figures; big numbers in scientific notation
function d2(x) { return x < 10 ? Number(x).toFixed(1) : String(x); }        // 2-sig-fig display for inputs like 4.0 or 12
function far(vals) {                                                         // every pair of answers differs by at least 8%
  for (let i = 0; i < vals.length; i++) for (let j = i + 1; j < vals.length; j++) {
    const a = vals[i], b = vals[j];
    if (Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b)) < 0.08) return false;
  }
  return true;
}
function distinctShown(vals, n) { return new Set(vals.map(v => show(v, n))).size === vals.length; }
/* numQ: build a numeric question; returns null when the four answers are too close, or (when o.gf is given)
   when the correct answer would change between g = 9.8 and g = 9.81 at n sig figs. */
/* true when x sits almost exactly on a rounding boundary at n sig figs (like 7.35 at 2 sig figs): students could round either way */
function nearTie(x, n) { if (!x) return false; const e = Math.floor(Math.log10(Math.abs(x))), s = x / Math.pow(10, e - n + 1), fr = s - Math.floor(s); return Math.abs(fr - 0.5) < 0.01; }
function numQ(o) {
  const vals = [o.right].concat(o.wrongs.map(w => w[0]));
  if (!far(vals) || !distinctShown(vals, o.n) || nearTie(o.right, o.n)) return null;
  if (o.gf && !sameBoth(o.gf, o.n)) return null;
  const f = x => (o.fmtf ? o.fmtf(x) : show(x, o.n)) + (o.unit || '');
  return { prompt: o.prompt, right: f(o.right), wrongs: o.wrongs.map(w => [f(w[0]), w[1]]), explain: o.explain, hint: o.hint, meta: o.meta };
}
function tryGen(id, fn) { for (let i = 0; i < 600; i++) { const q = fn(); if (q) return q; } throw new Error('Could not generate ' + id); }
const GE = G_EARTH;                       // 9.8
const FAC = { 0.125: 'one-eighth as large', 0.25: 'one-fourth as large', 0.5: 'half as large', 1: 'the same size', 2: 'twice as large',
  3: 'three times as large', 4: 'four times as large', 6: 'six times as large', 8: 'eight times as large', 9: 'nine times as large', 12: 'twelve times as large', 16: 'sixteen times as large' };
function facText(f) { const k = Object.keys(FAC).find(x => Math.abs(Number(x) - f) < 1e-9); return FAC[k]; }

/* ===== Topic: What is energy? (IDs start with ENG-) ===== */
const _KIND = { K: 'Kinetic energy only', P: 'Potential energy only', B: 'Both kinetic and potential energy', N: 'Neither kinetic nor potential energy' };
const _KWHY = {
  K: { P: 'It is moving, and nothing here is raised or stretched, so motion is the energy that counts.', B: 'It has kinetic energy, but this object is not raised or stretched, so there is no potential energy to add.', N: 'Anything in motion has kinetic energy.' },
  P: { K: 'It is not moving, so it has no kinetic energy yet. Its energy is stored.', B: 'It is not moving, so only the stored (potential) energy counts.', N: 'It stores energy because of its position or shape.' },
  B: { K: 'It is moving, but it is also raised above the ground, so it has potential energy too.', P: 'It is raised, but it is also moving, so it has kinetic energy too.', N: 'It is both moving and raised, so it has both kinds.' }
};
const _KITEMS = [
  ['K', 'a hockey puck sliding along level ice'], ['K', 'a skateboarder rolling along flat ground'], ['K', 'a bowling ball rolling down a level lane'],
  ['P', 'a compressed spring in a toy dart launcher'], ['P', 'a bow that is pulled back, before the arrow is released'], ['P', 'a climber standing still at the top of a cliff'],
  ['P', 'a stretched rubber band'], ['P', 'a book resting on a high shelf'], ['P', 'water held still behind a dam'],
  ['B', 'a bird flying high above the ground'], ['B', 'a roller coaster car moving at the top of a hill'], ['B', 'a ball thrown upward, halfway to its highest point'],
  ['B', 'a skier speeding down a mountain slope'], ['B', 'an apple falling, halfway to the ground']
];
T('ENG-T1', 'what', 30, 'Kinetic, potential, or both?', function () {
  const it = pick(_KITEMS), k = it[0];
  const wrongs = ['K', 'P', 'B', 'N'].filter(x => x !== k).map(x => [_KIND[x], _KWHY[k][x] || _KWHY[k].N]);
  const why = { K: 'Kinetic energy is the energy of motion, and nothing here is raised or stretched.', P: 'Potential energy is stored energy because of position or shape, and this object is not moving.', B: 'It is moving (kinetic) and it is raised above the ground (potential), so it has both.' };
  return { prompt: 'What kind of energy does ' + it[1] + ' have?', right: _KIND[k], wrongs: wrongs, explain: why[k], hint: 'Ask two questions: Is it moving? Is it raised up or stretched or squeezed?', meta: { k: k } };
});
const _TRANS = [
  ['a toaster', 'Electrical energy changes into thermal energy'],
  ['a solar-powered calculator', 'Light energy changes into electrical energy'],
  ['a campfire', 'Chemical energy changes into thermal energy and light'],
  ['a wind turbine', 'Kinetic energy of the wind changes into electrical energy'],
  ['a phone speaker', 'Electrical energy changes into sound energy'],
  ['a person climbing stairs', 'Chemical energy from food changes into gravitational potential energy'],
  ['a battery-powered toy car', 'Chemical energy changes into electrical energy, then into kinetic energy']
];
T('ENG-T2', 'what', 35, 'Energy transformations in everyday devices', function () {
  const i = ri(0, _TRANS.length - 1), t = _TRANS[i];
  const others = shuffle(_TRANS.filter((x, j) => j !== i)).slice(0, 3);
  return { prompt: 'Which choice best describes the main energy change in ' + t[0] + '?', right: t[1],
    wrongs: others.map(o => [o[1], 'That describes ' + o[0] + ', not ' + t[0] + '.']),
    explain: 'In ' + t[0] + ': ' + t[1].charAt(0).toLowerCase() + t[1].slice(1) + '. Energy changes form, but it is not created or destroyed.', hint: 'Name the energy going IN, then the useful energy coming OUT.', meta: { i: i } };
});
F('ENG-F01', 'what', 10, 'In science, energy is best defined as', 'the ability to cause a change or the ability to do work',
  [['a push or pull on an object', 'That is a force, measured in newtons.'], ['how fast work gets done', 'That is power, measured in watts.'], ['how much matter an object has', 'That is mass, measured in kilograms.']],
  'Energy is the ability to cause a change or the ability to do work.');
F('ENG-F02', 'what', 10, 'What is the SI unit of energy?', 'The joule (J)',
  [['The newton (N)', 'The newton measures force.'], ['The watt (W)', 'The watt measures power, which is energy per second.'], ['The meter (m)', 'The meter measures distance.']],
  'Energy is measured in joules (J).');
F('ENG-F03', 'what', 25, 'One joule is the same as', 'one newton-meter (1 N·m)',
  [['one newton per meter (1 N/m)', 'A joule multiplies force and distance; it does not divide them.'], ['one watt (1 W)', 'A watt is one joule every second.'], ['one kilogram (1 kg)', 'A kilogram is a unit of mass.']],
  'A joule is the energy needed to push with 1 N of force for 1 m, so 1 J = 1 N·m.');
F('ENG-F04', 'what', 10, 'Kinetic energy is the energy of', 'a moving object',
  [['an object that is stored high up', 'That is gravitational potential energy.'], ['an object that is not moving at all', 'An object at rest has no kinetic energy.'], ['an object that is hot', 'Thermal energy comes from particle motion, but kinetic energy is about the motion of the object itself.']],
  'Kinetic energy is the energy an object has because it is in motion.');
F('ENG-F05', 'what', 15, 'Potential energy is', 'stored energy that depends on position, shape, or interaction with other objects',
  [['the energy of an object in motion', 'That is kinetic energy.'], ['the rate at which work is done', 'That is power.'], ['energy that has been used up', 'Energy is never used up. It changes form.']],
  'Potential energy is stored energy. A raised book, a stretched bow, and a fuel all store it.');
F('ENG-F06', 'what', 30, 'Chemical energy is energy stored in the bonds between atoms. It is a form of', 'potential energy',
  [['kinetic energy', 'It is stored, not moving.'], ['sound energy', 'Sound is carried by waves.'], ['electric energy', 'Electric energy is the energy that carries a current.']],
  'Chemical energy is stored, so it is a form of potential energy. Gasoline and a slice of pizza both have it.');
F('ENG-F07', 'what', 30, 'Electric energy is energy that carries an electric current. It is a form of', 'kinetic energy',
  [['potential energy', 'Moving charges carry it, so it is a form of kinetic energy.'], ['chemical energy', 'Chemical energy is stored in bonds. A current is moving charge.'], ['thermal energy', 'Thermal energy comes from the motion and position of particles in an object.']],
  'Electric energy comes from moving charges, so it is a form of kinetic energy.');
F('ENG-F08', 'what', 35, 'Sound and light are both carried by waves. Which kind of energy do they have?', 'Both kinetic and potential energy',
  [['Kinetic energy only', 'Waves have motion and stored energy, so both kinds are present.'], ['Potential energy only', 'Waves have motion and stored energy, so both kinds are present.'], ['Neither, because waves are not matter', 'Waves carry energy, which is why light can warm your skin.']],
  'Sound energy and light energy each include both kinetic and potential energy.');
F('ENG-F09', 'what', 30, 'Thermal energy of an object is', 'the sum of the kinetic and potential energies of the particles that make up the object',
  [['only the kinetic energy of the whole object', 'Thermal energy is about the particles inside the object.'], ['only energy stored in chemical bonds', 'That is chemical energy. Thermal energy includes both kinds from all the particles.'], ['the speed of the object', 'Speed is not energy.']],
  'Thermal energy is the total kinetic and potential energy of all the particles in an object.');
F('ENG-F10', 'what', 25, 'The law of conservation of energy says that', 'energy cannot be created or destroyed, it can only change form',
  [['energy is used up when work is done', 'When energy seems to disappear, it has changed into another form, such as thermal energy.'], ['kinetic energy always equals potential energy', 'They can be different. They trade off while the total stays the same.'], ['energy can be created in a closed system', 'In a closed system the total amount of energy stays constant.']],
  'In a closed system the total energy stays constant. It changes form but is never created or destroyed.');
F('ENG-F11', 'what', 40, 'A power plant burns methane to make electricity. Which list shows the energy forms in the correct order?', 'Chemical → thermal (steam) → mechanical (turbine) → electrical',
  [['Electrical → chemical → thermal → mechanical', 'The methane comes first, so the chain starts with chemical energy.'], ['Thermal → chemical → electrical → mechanical', 'Chemical energy in the fuel is released as heat first.'], ['Mechanical → thermal → chemical → electrical', 'The turbine is turned by steam, so mechanical energy comes after the heat.']],
  'Burning methane releases chemical energy as heat. The heat makes steam, the steam spins a turbine, and the generator makes electrical energy.');
F('ENG-F12', 'what', 25, 'Which of these is NOT a unit of energy?', 'The watt (W)',
  [['The joule (J)', 'The joule is the SI unit of energy.'], ['The newton-meter (N·m)', 'A newton-meter is another name for a joule.'], ['kg·m²/s²', 'This is what a joule is made of, so it is a unit of energy.']],
  'A watt is a joule per second, which measures power, not energy.');
F('ENG-F13', 'what', 20, 'A gasoline-powered lawn mower runs on gasoline. What kind of energy does the gasoline have before it is burned?', 'Chemical energy, a form of potential energy',
  [['Kinetic energy, because it is a liquid', 'A liquid sitting in a tank is not moving. Its energy is stored in chemical bonds.'], ['Thermal energy only', 'It becomes thermal energy when it burns. Before that the energy is stored in bonds.'], ['Sound energy', 'Sound is produced by the running engine, not stored in the fuel.']],
  'Fuel stores energy in chemical bonds. That is chemical energy, a form of potential energy.');
F('ENG-F14', 'what', 30, 'A ball is held still 2 m above the ground. Then it is dropped. What happens to its energy as it falls?', 'Potential energy changes into kinetic energy',
  [['Kinetic energy changes into potential energy', 'It is the reverse: the ball loses height, so it loses potential energy.'], ['The ball loses energy until it has none', 'Energy is conserved. It changes from stored energy into motion.'], ['Nothing changes because the ball has weight', 'The ball speeds up and loses height, so its energy changes form.']],
  'Falling lowers the ball, so PE decreases, and speeds it up, so KE increases.');

/* ===== Topic: Kinetic energy (IDs start with KE-) ===== */
const KEOBJ = [
  { n: 'a lab cart', m: [2, 3, 5, 7, 9], v: [2, 3, 5, 6, 8] },
  { n: 'a runner', m: [45, 55, 65, 72], v: [3, 5, 6, 8] },
  { n: 'a bicycle and rider', m: [60, 75, 90], v: [4, 6, 7, 9, 12] },
  { n: 'a kayak and paddler', m: [85, 95, 110], v: [2, 3, 5] },
  { n: 'a shopping cart full of groceries', m: [12, 15, 18, 22], v: [2, 3, 4] },
  { n: 'a delivery drone', m: [3, 5, 8, 12], v: [6, 10, 14, 18] },
  { n: 'a small car', m: [900, 1000, 1200, 1500], v: [10, 15, 20, 25, 30] }
];
T('KE-T1', 'ke', 25, 'Find kinetic energy from mass and speed', function () {
  return tryGen('KE-T1', function () {
    const o = pick(KEOBJ), m = pick(o.m), v = pick(o.v), KE = 0.5 * m * v * v;
    return numQ({ n: 2, unit: ' J', right: KE,
      prompt: 'Calculate the kinetic energy of ' + o.n + ' with a mass of ' + d2(m) + ' kg moving at ' + d2(v) + ' m/s.',
      wrongs: [[m * v * v, 'This left out the ½. The formula is KE = ½ m v².'], [0.5 * m * v, 'Only the speed is squared. KE = ½ m v², with v² = v × v.'], [0.5 * (m * v) * (m * v), 'Square only the speed, not the whole mass-times-speed. (mv)² is a common slip.']],
      explain: 'KE = ½ m v² = ½ (' + d2(m) + ')(' + d2(v) + ')² = ' + show(KE, 2) + ' J.', hint: 'Write KE = ½ m v². Square the speed first, then multiply by the mass and by ½.', meta: { m: m, v: v } });
  });
});
T('KE-T2', 'ke', 40, 'Find the mass from kinetic energy and speed', function () {
  return tryGen('KE-T2', function () {
    const m = pick([2, 3, 4, 5, 6, 8, 10, 12, 15]), v = pick([3, 4, 5, 6, 8, 10]), KE = sig(0.5 * m * v * v, 2), mT = 2 * KE / (v * v);
    return numQ({ n: 2, unit: ' kg', right: mT,
      prompt: 'What is the mass of an object that has ' + show(KE, 2) + ' J of kinetic energy while moving at ' + d2(v) + ' m/s?',
      wrongs: [[KE / (v * v), 'This left out the 2. Multiply both sides of KE = ½ m v² by 2 first: m = 2 KE ÷ v².'], [2 * KE / v, 'The speed must be squared: m = 2 KE ÷ v².'], [KE * v * v / 2, 'To get m by itself, divide by v². Do not multiply.']],
      explain: 'm = 2 KE ÷ v² = 2(' + show(KE, 2) + ') ÷ (' + d2(v) + ')² = ' + show(mT, 2) + ' kg.', hint: 'Start with KE = ½ m v². Multiply both sides by 2, then divide both sides by v².', meta: { KE: KE, v: v, m: mT } });
  });
});
T('KE-T3', 'ke', 50, 'Find the speed from kinetic energy and mass', function () {
  return tryGen('KE-T3', function () {
    const m = pick([2, 3, 4, 5, 6, 8, 10, 12, 20]), v = pick([3, 4, 5, 6, 8, 9, 10, 12]), KE = sig(0.5 * m * v * v, 2), vT = Math.sqrt(2 * KE / m);
    return numQ({ n: 2, unit: ' m/s', right: vT,
      prompt: 'A ' + d2(m) + ' kg object has ' + show(KE, 2) + ' J of kinetic energy. How fast is it moving?',
      wrongs: [[2 * KE / m, 'This is v², not v. Take the square root at the end.'], [Math.sqrt(KE / m), 'This left out the 2. v = √(2 KE ÷ m).'], [KE / m, 'KE ÷ m is only v² ÷ 2. Multiply by 2 and then take the square root.']],
      explain: 'v = √(2 KE ÷ m) = √(2(' + show(KE, 2) + ') ÷ ' + d2(m) + ') = ' + show(vT, 2) + ' m/s.', hint: 'Rearrange to v² = 2 KE ÷ m, then take the square root.', meta: { KE: KE, m: m, v: vT } });
  });
});
T('KE-T4', 'ke', 45, 'How changing mass or speed changes kinetic energy', function () {
  const cases = [
    { c: 'the mass doubles and the speed stays the same', f: 2, w: [[4, 'Mass is not squared. Doubling the mass doubles the KE.'], [0.5, 'More mass means more KE.'], [1, 'Mass changes KE: more mass, more energy.']] },
    { c: 'the mass triples and the speed stays the same', f: 3, w: [[9, 'Mass is not squared. Tripling the mass triples the KE.'], [6, 'KE is directly proportional to mass: ×3 gives ×3.'], [1, 'Mass changes KE.']] },
    { c: 'the speed doubles and the mass stays the same', f: 4, w: [[2, 'Speed is squared, so doubling it makes the KE 2² = 4 times larger.'], [8, 'Only the speed is squared (2² = 4), not cubed.'], [0.5, 'More speed means more KE.']] },
    { c: 'the speed triples and the mass stays the same', f: 9, w: [[3, 'Speed is squared, so tripling it makes the KE 3² = 9 times larger.'], [6, 'Square the 3 to get 9. Do not double it.'], [12, 'The factor is 3² = 9.']] },
    { c: 'the speed is cut in half and the mass stays the same', f: 0.25, w: [[0.5, 'Speed is squared, so half the speed gives (½)² = ¼ of the KE.'], [2, 'Slower means less KE.'], [0.125, 'Square the ½ to get ¼, not ⅛.']] },
    { c: 'both the mass and the speed double', f: 8, w: [[4, 'Doubling the speed gives ×4 and doubling the mass gives ×2. Multiply: 4 × 2 = 8.'], [2, 'The speed is squared, so it contributes ×4 as well as the ×2 from the mass.'], [16, 'The mass doubling is only ×2, not ×4. Together: 4 × 2 = 8.']] },
    { c: 'the speed quadruples and the mass stays the same', f: 16, w: [[4, 'Speed is squared: 4² = 16.'], [8, 'Speed is squared: 4² = 16.'], [2, 'Speed is squared: 4² = 16.']] },
    { c: 'the mass is cut in half and the speed doubles', f: 2, w: [[4, 'The speed doubling gives ×4, but half the mass gives ×½. Multiply: 4 × ½ = 2.'], [1, 'The speed matters more: ×4 from speed times ×½ from mass is ×2, not ×1.'], [0.5, 'The doubled speed makes the KE go up by 4, which beats the ½ from the mass.']] }
  ];
  const k = pick(cases);
  return { prompt: 'The kinetic energy of an object is ½ m v². What happens to its kinetic energy if ' + k.c + '?',
    right: 'The KE becomes ' + facText(k.f), wrongs: k.w.map(w => ['The KE becomes ' + facText(w[0]), w[1]]),
    explain: 'KE = ½ m v² depends on the mass directly and on the speed squared. For this change the KE becomes ' + facText(k.f) + '.', hint: 'Mass counts once. Speed counts twice, because it is squared.', meta: { f: k.f } };
});
T('KE-T5', 'ke', 45, 'Which has more kinetic energy?', function () {
  return tryGen('KE-T5', function () {
    const m1 = pick([2, 3, 5, 8, 10, 15, 20, 50]), v1 = pick([2, 3, 4, 5]), m2 = pick([0.1, 0.2, 0.5, 1, 2]) , v2 = pick([10, 15, 20, 30]);
    const a = 0.5 * m1 * v1 * v1, b = 0.5 * m2 * v2 * v2;
    if (Math.abs(a - b) / Math.max(a, b) < 0.15) return null;
    const right = a > b ? 'Object 1 has more KE' : 'Object 2 has more KE';
    const wrongs = [[a > b ? 'Object 2 has more KE' : 'Object 1 has more KE', 'Compare with the formula, not by size. Object ' + (a > b ? '1' : '2') + ' has more KE: ½ m v² = ' + show(Math.max(a, b), 2) + ' J versus ' + show(Math.min(a, b), 2) + ' J.'],
      ['They have the same KE', 'Calculate each one. They are ' + show(a, 2) + ' J and ' + show(b, 2) + ' J.'],
      [a > b ? 'Object 2, because it is moving faster' : 'Object 1, because it has more mass', 'Mass alone or speed alone does not decide it. Use KE = ½ m v² for each object.']];
    return { prompt: 'Object 1 has a mass of ' + d2(m1) + ' kg and moves at ' + d2(v1) + ' m/s. Object 2 has a mass of ' + fmt(m2, 2) + ' kg and moves at ' + d2(v2) + ' m/s. Which has more kinetic energy?',
      right: right, wrongs: wrongs, explain: 'Object 1: ½(' + d2(m1) + ')(' + d2(v1) + ')² = ' + show(a, 2) + ' J. Object 2: ½(' + fmt(m2, 2) + ')(' + d2(v2) + ')² = ' + show(b, 2) + ' J. ' + (a > b ? 'Object 1' : 'Object 2') + ' has more.',
      hint: 'Calculate the KE of each object, then compare the two numbers.', meta: { a: a, b: b, m1: m1, v1: v1, m2: m2, v2: v2 } };
  });
});
T('KE-T6', 'ke', 55, 'Kinetic energy with mass in grams', function () {
  return tryGen('KE-T6', function () {
    const g = pick([200, 400, 500, 800, 1500, 2000, 4000]), v = pick([3, 4, 5, 6, 8, 10]), m = g / 1000, KE = 0.5 * m * v * v;
    return numQ({ n: 2, unit: ' J', right: KE,
      prompt: 'A ball has a mass of ' + g + ' g and moves at ' + d2(v) + ' m/s. What is its kinetic energy in joules?',
      wrongs: [[KE * 1000, 'The mass must be in kilograms. ' + g + ' g = ' + fmt(m, 2) + ' kg. Using grams makes the answer 1000 times too big.'], [KE / 1000, 'Divide grams by 1000 only once, to get kilograms. This divided twice.'], [m * v * v, 'This left out the ½. KE = ½ m v².']],
      explain: 'Convert first: ' + g + ' g = ' + fmt(m, 2) + ' kg. Then KE = ½ (' + fmt(m, 2) + ')(' + d2(v) + ')² = ' + show(KE, 2) + ' J.', hint: 'Joules need kilograms. Convert grams to kilograms first (divide by 1000).', meta: { g: g, v: v } });
  });
});
F('KE-F01', 'ke', 10, 'Which formula gives kinetic energy?', 'KE = ½ m v²',
  [['KE = m g h', 'That is gravitational potential energy.'], ['KE = ½ m v', 'The speed must be squared.'], ['KE = m v²', 'The ½ is missing.']],
  'Kinetic energy is KE = ½ m v².');
F('KE-F02', 'ke', 20, 'Which quantity is squared in the kinetic energy formula?', 'The speed',
  [['The mass', 'Mass appears once. Speed is the one that is squared.'], ['The kinetic energy', 'KE is the answer, and it is not squared.'], ['Both the mass and the speed', 'Only the speed is squared.']],
  'In KE = ½ m v², only the speed is squared. That is why speed matters more than mass.');
F('KE-F03', 'ke', 15, 'A car and a truck travel at the same speed. The truck has twice the mass. Compared with the car, the truck’s kinetic energy is', 'twice as large',
  [['four times as large', 'Mass is not squared. Twice the mass means twice the KE.'], ['the same', 'Mass changes KE.'], ['half as large', 'More mass means more KE.']],
  'KE is directly proportional to mass. Twice the mass at the same speed means twice the KE.');
F('KE-F04', 'ke', 25, 'A moving object has 100 J of kinetic energy. If its speed doubles, its kinetic energy becomes', '400 J',
  [['200 J', 'The speed is squared, so the KE is multiplied by 4, not 2.'], ['800 J', 'The factor is 2² = 4, not 8.'], ['10,000 J', 'Doubling the speed multiplies KE by 4, not by 100.']],
  'KE grows with the square of speed. 100 J × 4 = 400 J.');
F('KE-F05', 'ke', 10, 'What are the SI units you should use before you calculate kinetic energy?', 'Mass in kilograms and speed in meters per second',
  [['Mass in grams and speed in kilometers per hour', 'With these units the answer will not come out in joules.'], ['Mass in newtons and speed in m/s', 'Newtons measure force (weight), not mass.'], ['Mass in kilograms and speed in meters', 'Speed is a distance per time, so its unit is m/s.']],
  'KE comes out in joules when mass is in kg and speed is in m/s.');
F('KE-F06', 'ke', 20, 'A car is parked at the top of a hill. How much kinetic energy does the car have?', 'Zero, because it is not moving',
  [['Some, because it is high up', 'Being high up gives potential energy. KE needs motion.'], ['A lot, because it is heavy', 'Mass alone does not give KE. The car must be moving.'], ['Its weight times the height', 'That would be its potential energy.']],
  'KE = ½ m v². With v = 0, KE = 0.');
F('KE-F07', 'ke', 30, 'Murphy’s KE depends on his mass and speed. Which change would give Murphy the MOST extra kinetic energy?', 'Doubling his speed',
  [['Doubling his mass', 'This only doubles the KE. Doubling the speed quadruples it.'], ['Making him 10% heavier', 'A small change in mass gives a small change in KE.'], ['Standing still for a minute', 'Standing still gives zero kinetic energy.']],
  'Doubling speed multiplies KE by 4. Doubling mass only multiplies it by 2.');

/* ===== Topic: Gravitational potential energy (IDs start with PE-) ===== */
const PEOBJ = [
  { n: 'a book', m: [2, 3, 4, 6], h: [1.5, 2.0, 2.5, 3.0] },
  { n: 'a flower pot on a balcony', m: [5, 8, 12, 15], h: [4.0, 6.0, 8.0, 12] },
  { n: 'a painter’s bucket on a scaffold', m: [10, 15, 20, 25], h: [3.0, 5.0, 9.0, 14] },
  { n: 'a climber', m: [55, 65, 75, 85], h: [10, 15, 20, 30] },
  { n: 'a crate on a loading dock', m: [30, 45, 60, 90], h: [1.0, 1.5, 2.0, 3.0] },
  { n: 'a bell in a tower', m: [100, 150, 200, 300], h: [12, 18, 25, 36] }
];
T('PE-T1', 'pe', 25, 'Find gravitational potential energy', function () {
  return tryGen('PE-T1', function () {
    const o = pick(PEOBJ), m = pick(o.m), h = pick(o.h), f = gg => m * gg * h;
    return numQ({ n: 2, unit: ' J', right: f(GE), gf: f,
      prompt: 'What is the gravitational potential energy of ' + o.n + ' with a mass of ' + d2(m) + ' kg at a height of ' + d2(h) + ' m above the ground?',
      wrongs: [[m * h, 'This left out g. PE = m g h, with g = 9.8 m/s².'], [0.5 * m * GE * h, 'The ½ belongs to kinetic energy. PE = m g h has no ½.'], [m * GE, 'This left out the height. PE = m g h.']],
      explain: 'PE = m g h = (' + d2(m) + ')(9.8)(' + d2(h) + ') = ' + show(f(GE), 2) + ' J.', hint: 'PE = m g h. Use g = 9.8 m/s² and multiply all three numbers.', meta: { m: m, h: h } });
  });
});
T('PE-T2', 'pe', 40, 'Find the height from potential energy', function () {
  return tryGen('PE-T2', function () {
    const m = pick([2, 3, 4, 5, 8, 10, 20]), h = pick([2, 3, 4, 5, 6, 8, 10, 15]);
    const PE = sig(m * GE * h, 2), f = gg => PE / (m * gg);
    return numQ({ n: 2, unit: ' m', right: f(GE), gf: f,
      prompt: 'A ' + d2(m) + ' kg object has ' + show(PE, 2) + ' J of gravitational potential energy. How high above the ground is it?',
      wrongs: [[PE / m, 'This left out g. Divide by both m and g: h = PE ÷ (m g).'], [PE * GE / m, 'Do not multiply by g. To get h alone, divide by m and by g.'], [m * GE / PE, 'This is flipped upside down. h = PE ÷ (m g).']],
      explain: 'h = PE ÷ (m g) = ' + show(PE, 2) + ' ÷ ((' + d2(m) + ')(9.8)) = ' + show(f(GE), 2) + ' m.', hint: 'Start with PE = m g h. Divide both sides by m g.', meta: { m: m, PE: PE } });
  });
});
T('PE-T3', 'pe', 40, 'Find the mass from potential energy', function () {
  return tryGen('PE-T3', function () {
    const m = pick([2, 3, 4, 5, 6, 8, 10, 20, 50]), h = pick([2, 3, 4, 5, 8, 10, 12]);
    const PE = sig(m * GE * h, 2), f = gg => PE / (gg * h);
    return numQ({ n: 2, unit: ' kg', right: f(GE), gf: f,
      prompt: 'An object at a height of ' + d2(h) + ' m has ' + show(PE, 2) + ' J of gravitational potential energy. What is its mass?',
      wrongs: [[PE / h, 'This left out g. m = PE ÷ (g h).'], [PE * GE / h, 'Do not multiply by g. To get m alone, divide by g and h.'], [h * GE / PE, 'This is flipped. m = PE ÷ (g h).']],
      explain: 'm = PE ÷ (g h) = ' + show(PE, 2) + ' ÷ ((9.8)(' + d2(h) + ')) = ' + show(f(GE), 2) + ' kg.', hint: 'Rearrange PE = m g h to get m by itself.', meta: { h: h, PE: PE } });
  });
});
T('PE-T4', 'pe', 35, 'How changing mass or height changes potential energy', function () {
  const cases = [
    { c: 'the height doubles and the mass stays the same', f: 2, w: [[4, 'Height is not squared. Doubling the height doubles the PE.'], [0.5, 'More height means more PE.'], [1, 'Height changes PE.']] },
    { c: 'the height triples and the mass stays the same', f: 3, w: [[9, 'Height is not squared. Tripling the height triples the PE.'], [6, 'PE is directly proportional to height: ×3 gives ×3.'], [1, 'Height changes PE.']] },
    { c: 'the mass triples and the height stays the same', f: 3, w: [[9, 'Mass is not squared. Tripling the mass triples the PE.'], [1, 'Mass changes PE.'], [6, 'PE is directly proportional to mass: ×3 gives ×3.']] },
    { c: 'the height is cut in half and the mass stays the same', f: 0.5, w: [[0.25, 'Height is not squared. Half the height gives half the PE.'], [2, 'Less height means less PE.'], [1, 'Height changes PE.']] },
    { c: 'both the mass and the height double', f: 4, w: [[2, 'Each doubling gives ×2. Together: 2 × 2 = 4.'], [8, 'Two doublings give 2 × 2 = 4, not 8.'], [1, 'Both changes raise the PE.']] },
    { c: 'the mass is cut in half and the height doubles', f: 1, w: [[2, 'Half the mass (×½) cancels the doubled height (×2).'], [0.5, 'The ×2 from the height cancels the ×½ from the mass.'], [4, 'Height is not squared, so there is no ×4 here.']] },
    { c: 'the mass doubles and the height triples', f: 6, w: [[3, 'The mass doubling also matters: ×2 from the mass times ×3 from the height is ×6.'], [9, 'The mass doubling is ×2, not ×3. Multiply: 2 × 3 = 6.'], [12, 'Neither value is squared. 2 × 3 = 6.']] }
  ];
  const k = pick(cases);
  return { prompt: 'The gravitational potential energy of an object is m g h. What happens to its PE if ' + k.c + '?',
    right: 'The PE becomes ' + facText(k.f), wrongs: k.w.map(w => ['The PE becomes ' + facText(w[0]), w[1]]),
    explain: 'PE = m g h depends directly on both mass and height. For this change the PE becomes ' + facText(k.f) + '.', hint: 'Neither mass nor height is squared in PE = m g h. Just multiply the changes.', meta: { f: k.f } };
});
T('PE-T5', 'pe', 45, 'Potential energy gained when moving to a higher shelf', function () {
  return tryGen('PE-T5', function () {
    const m = pick([2, 3, 4, 5, 6, 8]), h1 = pick([0.5, 1.0, 1.5]), h2 = pick([2.0, 2.5, 3.0, 3.5]);
    const f = gg => m * gg * (h2 - h1);
    return numQ({ n: 2, unit: ' J', right: f(GE), gf: f,
      prompt: 'A ' + d2(m) + ' kg box sits on a shelf ' + d2(h1) + ' m above the floor. It is moved to a higher shelf ' + d2(h2) + ' m above the floor. How much gravitational potential energy does it GAIN?',
      wrongs: [[m * GE * h2, 'This is the PE at the new height. The gain is the difference between the two heights.'], [m * GE * h1, 'This is the PE on the first shelf. The gain depends on how much higher it moved.'], [m * GE * (h1 + h2), 'The gain uses the height difference (h₂ − h₁), not the sum.']],
      explain: 'The box rose ' + fmt(h2 - h1, 2) + ' m, so the gain is m g Δh = (' + d2(m) + ')(9.8)(' + fmt(h2 - h1, 2) + ') = ' + show(f(GE), 2) + ' J.', hint: 'Find how far it was lifted (h₂ − h₁) first, then use PE = m g h with that change in height.', meta: { m: m, h1: h1, h2: h2 } });
  });
});
T('PE-T6', 'pe', 50, 'Choose KE or PE, then calculate', function () {
  return tryGen('PE-T6', function () {
    const isKE = rand() < 0.5, m = pick([2, 3, 5, 8, 10, 12]), x = isKE ? pick([3, 4, 5, 6, 8]) : pick([2, 3, 4, 5, 6, 8]);
    const right = isKE ? 0.5 * m * x * x : m * GE * x, f = gg => isKE ? right : m * gg * x;
    const other = isKE ? m * GE * x : 0.5 * m * x * x;
    const prompt = isKE ? 'A ' + d2(m) + ' kg ball moves along level ground at ' + d2(x) + ' m/s. What is its energy of motion?' : 'A ' + d2(m) + ' kg ball rests on a ledge ' + d2(x) + ' m above the ground. How much stored energy does it have because of its height?';
    return numQ({ n: 2, unit: ' J', right: right, gf: f, prompt: prompt,
      wrongs: [[other, isKE ? 'This used the potential energy formula m g h. The ball is moving, so use KE = ½ m v².' : 'This used the kinetic energy formula. The ball is not moving, so use PE = m g h.'], [isKE ? m * x * x : 0.5 * m * GE * x, isKE ? 'This left out the ½ in KE = ½ m v².' : 'PE = m g h has no ½.'], [isKE ? 0.5 * m * x : m * x, isKE ? 'The speed must be squared.' : 'This left out g.']],
      explain: isKE ? 'The ball is moving, so use KE = ½ m v² = ½ (' + d2(m) + ')(' + d2(x) + ')² = ' + show(right, 2) + ' J.' : 'The ball is not moving but it is raised, so use PE = m g h = (' + d2(m) + ')(9.8)(' + d2(x) + ') = ' + show(right, 2) + ' J.',
      hint: 'Moving means kinetic energy (½ m v²). Raised up means potential energy (m g h).', meta: { isKE: isKE, m: m, x: x } });
  });
});
F('PE-F01', 'pe', 10, 'Which formula gives gravitational potential energy?', 'PE = m g h',
  [['PE = ½ m v²', 'That is kinetic energy.'], ['PE = m g', 'That is weight. PE also needs the height.'], ['PE = m h ÷ g', 'g multiplies; it does not divide.']],
  'Gravitational potential energy is PE = m g h.');
F('PE-F02', 'pe', 20, 'On Earth, what value of g do we use in PE = m g h?', '9.8 m/s²',
  [['9.8 N', 'That mixes units. g is an acceleration in m/s² (or 9.8 N per kg).'], ['98 m/s²', 'Earth’s g is 9.8, not 98.'], ['1.0 m/s²', 'That is not Earth’s value. Earth’s is 9.8 m/s².']],
  'On Earth, g = 9.8 m/s². It is the same g from the gravity unit.');
F('PE-F03', 'pe', 25, 'Weight is W = m g. So PE = m g h can also be written as', 'PE = weight × height',
  [['PE = weight ÷ height', 'Weight and height are multiplied.'], ['PE = weight × mass', 'The second factor is height, not mass.'], ['PE = weight + height', 'They are multiplied, not added.']],
  'Since weight = m g, PE = (weight) × h. Lifting a 10 N book 2 m stores 20 J.');
F('PE-F04', 'pe', 25, 'A crate gains 24 J of gravitational potential energy when it is lifted 2.0 m. A second crate with one-third the mass is lifted 6.0 m. How much PE does the second crate gain?', '24 J',
  [['8.0 J', 'One-third of the mass gives ×⅓, but three times the height gives ×3. They cancel.'], ['72 J', 'The second crate has LESS mass. The ×3 from the height is cancelled by the ×⅓ from the mass.'], ['2.7 J', 'The factors multiply: ×⅓ for the mass and ×3 for the height. Dividing by both is not right.']],
  '× ⅓ (mass) and × 3 (height) cancel: the PE stays 24 J.');
F('PE-F05', 'pe', 20, 'A 1.0 kg ball is at the top of a 4.0 m ledge. The ground is chosen as h = 0. What happens to the ball’s PE if you instead measure from a table 1.0 m above the ground?', 'The ball’s PE is smaller, because its height above the reference is smaller',
  [['The ball’s PE is the same', 'PE depends on the height above the reference level you choose.'], ['The ball’s PE is larger', 'The height above the table is 3.0 m, which is less than 4.0 m.'], ['The ball’s PE is zero', 'The ball is still above the table, so it has some PE.']],
  'Height h is measured from a reference level. A lower height gives a smaller PE.');
F('PE-F06', 'pe', 15, 'Two identical books are on different shelves. Book A is 2.0 m high, and book B is 1.0 m high. Compared with B, the PE of A is', 'twice as large',
  [['four times as large', 'Height is not squared. Twice the height means twice the PE.'], ['the same', 'Height changes PE.'], ['half as large', 'A higher shelf means more PE.']],
  'PE is directly proportional to height: 2.0 m is twice 1.0 m, so twice the PE.');
F('PE-F07', 'pe', 25, 'A 5.0 kg book is moved to shelves at 1.0 m, 1.5 m, and 2.0 m. What happens to its PE as the height goes up?', 'It grows in the same proportion as the height',
  [['It grows four times as fast as the height', 'Height is not squared in PE = m g h.'], ['It stays the same, because the mass is the same', 'PE depends on both mass and height.'], ['It gets smaller', 'A higher object has more stored energy.']],
  'PE = m g h is directly proportional to h: 1.0 m, 1.5 m, 2.0 m gives PEs in the ratio 2 : 3 : 4.');
F('PE-F08', 'pe', 20, 'On the Moon, g is smaller than on Earth. A 10 kg rock is lifted 2.0 m on Earth and then 2.0 m on the Moon. Compared with Earth, the PE gained on the Moon is', 'smaller',
  [['larger', 'The Moon’s g is smaller, so m g h is smaller.'], ['the same', 'PE = m g h includes g, and g is different on the Moon.'], ['zero', 'The rock still gains some PE, just less than on Earth.']],
  'PE = m g h. The mass and height are the same, but g is smaller on the Moon, so the PE is smaller.');
