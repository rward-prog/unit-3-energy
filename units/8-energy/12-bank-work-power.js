'use strict';
/* ===== Topic: Work (IDs start with WRK-) ===== */
T('WRK-T1', 'work', 25, 'Find work from force and distance', function () {
  return tryGen('WRK-T1', function () {
    const o = pick([['pushes a heavy crate', 'the crate'], ['pulls a sled across a snowy field', 'the sled'], ['pushes a wheelbarrow', 'the wheelbarrow'], ['drags a trunk across a floor', 'the trunk']]);
    const F = pick([18, 24, 30, 36, 45, 55, 75, 120, 250]), d = pick([2.0, 3.0, 5.0, 6.0, 8.0, 12, 15, 20]), nm = oneName();
    return numQ({ n: 2, unit: ' J', right: F * d,
      prompt: nm + ' ' + o[0] + ' with a constant horizontal force of ' + d2(F) + ' N. ' + o[1].charAt(0).toUpperCase() + o[1].slice(1) + ' moves ' + d2(d) + ' m in the direction of the force. How much work does ' + nm + ' do?',
      wrongs: [[F / d, 'Work is force times distance, not force divided by distance.'], [F + d, 'Force and distance are multiplied, not added.'], [F * d / 2, 'The ½ belongs to kinetic energy. Work is W = F d.']],
      explain: 'W = F d = (' + d2(F) + ' N)(' + d2(d) + ' m) = ' + show(F * d, 2) + ' N·m = ' + show(F * d, 2) + ' J.', hint: 'Work = force × distance. The unit is the joule (1 J = 1 N·m).', meta: { F: F, d: d } });
  });
});
T('WRK-T2', 'work', 40, 'Find the force from work and distance', function () {
  return tryGen('WRK-T2', function () {
    const F = pick([12, 15, 20, 25, 40, 60, 90]), d = pick([2.0, 3.0, 4.0, 5.0, 6.0, 10, 15]), W = sig(F * d, 2), Ft = W / d;
    return numQ({ n: 2, unit: ' N', right: Ft,
      prompt: 'A machine does ' + show(W, 2) + ' J of work sliding a box ' + d2(d) + ' m across a level floor. What constant force does it use?',
      wrongs: [[W * d, 'To find the force, divide the work by the distance. Do not multiply.'], [d / W, 'This is upside down. F = W ÷ d.'], [W - d, 'Subtracting does not undo a multiplication. Divide: F = W ÷ d.']],
      explain: 'F = W ÷ d = ' + show(W, 2) + ' J ÷ ' + d2(d) + ' m = ' + show(Ft, 2) + ' N.', hint: 'Start with W = F d and divide both sides by d.', meta: { W: W, d: d } });
  });
});
T('WRK-T3', 'work', 40, 'Find the distance from work and force', function () {
  return tryGen('WRK-T3', function () {
    const F = pick([20, 30, 40, 50, 80, 150, 400]), d = pick([2.0, 3.0, 4.0, 5.0, 8.0, 10, 25]), W = sig(F * d, 2), dT = W / F;
    return numQ({ n: 2, unit: ' m', right: dT,
      prompt: 'A force of ' + d2(F) + ' N does ' + show(W, 2) + ' J of work on an object. How far did the object move in the direction of the force?',
      wrongs: [[W * F, 'To find the distance, divide the work by the force. Do not multiply.'], [F / W, 'This is upside down. d = W ÷ F.'], [W - F, 'Subtracting does not undo a multiplication. Divide: d = W ÷ F.']],
      explain: 'd = W ÷ F = ' + show(W, 2) + ' J ÷ ' + d2(F) + ' N = ' + show(dT, 2) + ' m.', hint: 'Start with W = F d and divide both sides by F.', meta: { W: W, F: F } });
  });
});
T('WRK-T4', 'work', 50, 'Work to lift versus work to carry', function () {
  return tryGen('WRK-T4', function () {
    const F = pick([60, 80, 120, 150, 250, 400]), h = pick([0.40, 0.60, 0.80, 1.2, 1.5, 2.0]), D = pick([100, 250, 400, 600]);
    return numQ({ n: 2, unit: ' J', right: F * h,
      prompt: 'A hiker lifts a ' + d2(F) + ' N pack straight up ' + fmt(h, 2) + ' m onto her back. Then she carries it level for ' + d2(D) + ' m along a trail. How much work does she do on the pack while LIFTING it?',
      wrongs: [[F * (h + D), 'Carrying the pack level adds no work, because the lifting force is up but the motion is sideways.'], [F / h, 'Work is force times distance, not force divided by distance.'], [F + h, 'Force and distance are multiplied, not added.']],
      explain: 'W = F d = (' + d2(F) + ' N)(' + fmt(h, 2) + ' m) = ' + show(F * h, 2) + ' J. Carrying the pack level is not work, because the force is up and the motion is horizontal.', hint: 'Only the part of the motion in the direction of the force counts. Lifting moves the pack up.', meta: { F: F, h: h } });
  });
});
const _WSCEN = [
  ['A', 'A student pushes a chair 4 m across the floor with a steady horizontal force'], ['A', 'A crane lifts a boulder upward 12 m'], ['A', 'A bulldozer pushes a boulder 20 m in the direction it pushes'],
  ['A', 'An elevator motor raises the elevator up several floors'], ['A', 'A dog pulls a sled forward along level snow with a horizontal rope'],
  ['B', 'A weightlifter holds a barbell motionless above her head for 10 seconds'], ['B', 'A person pushes as hard as possible against a brick wall that does not move'], ['B', 'A student pulls on a rope tied to a tree, and the tree does not move'],
  ['C', 'A waiter carries a tray of food across a room at a constant speed, holding it level'], ['C', 'A student carries a heavy backpack along a level hallway'],
  ['D', 'An ice skater glides at a constant speed across smooth ice with nothing pushing or pulling her forward']
];
const _WTXT = {
  A: 'Yes, because a force makes the object move in the direction of the force',
  B: 'No, because the object does not move, so the distance is zero',
  C: 'No, because the force is upward but the motion is sideways',
  D: 'No, because no force is acting on the object in the direction it moves'
};
const _WWHY = {
  A: 'A force that moves an object in its own direction does work.',
  B: 'The object has to move for work to be done.',
  C: 'For work to be done, the force and the motion must be in the same direction.',
  D: 'A force along the direction of motion is needed. Gliding at a constant speed needs none.'
};
T('WRK-T5', 'work', 45, 'Is work being done?', function () {
  const it = pick(_WSCEN), k = it[0], ks = ['A', 'B', 'C', 'D'];
  const wrongs = ks.filter(x => x !== k).map(x => [_WTXT[x], x === 'A' ? 'Applying a force is not enough. The object must move in the direction of the force.' : (k === 'A' ? 'Here the object really does move in the direction of the force, so work is done.' : _WWHY[k])]);
  return { prompt: 'Is work done on the object in this situation? ' + it[1] + '.', right: _WTXT[k], wrongs: wrongs,
    explain: _WTXT[k] + '. ' + _WWHY[k], hint: 'Work needs two things: a force and motion in the same direction as that force.', meta: { k: k } };
});
T('WRK-T6', 'work', 50, 'Work to lift an object at a steady speed', function () {
  return tryGen('WRK-T6', function () {
    const m = pick([5, 8, 10, 15, 20, 40, 100]), h = pick([2.0, 3.0, 4.0, 5.0, 8.0, 10, 20]), f = gg => m * gg * h;
    return numQ({ n: 2, unit: ' J', right: f(GE), gf: f,
      prompt: 'A crane lifts a ' + d2(m) + ' kg crate straight up ' + d2(h) + ' m at a steady speed. How much work does the crane do on the crate?',
      wrongs: [[m * h, 'The crane lifts against the crate’s weight, which is m g (in newtons), not the mass.'], [0.5 * m * GE * h, 'There is no ½ in W = F d. The force is the weight, m g.'], [m * GE, 'This is the weight (the force). Multiply by the distance to get work.']],
      explain: 'The force needed to lift at a steady speed equals the weight: F = m g = (' + d2(m) + ')(9.8) N. W = F d = m g h = ' + show(f(GE), 2) + ' J. That is the PE the crate gains.', hint: 'Find the weight first (F = m g), then multiply by the distance lifted.', meta: { m: m, h: h } });
  });
});
F('WRK-F01', 'work', 10, 'In science, work is', 'the force applied to an object times the distance it moves in the direction of the force',
  [['how fast energy is used', 'That is power.'], ['any effort or tiring activity', 'In science, work needs a force and motion in the direction of the force. Holding something still is tiring but is not work.'], ['the energy an object has because of its motion', 'That is kinetic energy.']],
  'Work is W = F × d, with the force and motion in the same direction.');
F('WRK-F02', 'work', 10, 'Which unit is used for work?', 'The joule (J), which equals a newton-meter',
  [['The watt (W)', 'The watt is a unit of power.'], ['The newton (N) only', 'A newton is a unit of force. Work is force times distance.'], ['The meter per second (m/s)', 'That is a unit of speed.']],
  'Work is measured in joules. 1 J = 1 N·m.');
F('WRK-F03', 'work', 10, 'Which equation gives the work done by a constant force?', 'W = F × d',
  [['W = F ÷ d', 'Work is force times distance.'], ['W = ½ F d²', 'This is not the work equation. Work is simply F × d.'], ['W = F + d', 'Force and distance are multiplied.']],
  'Work (J) = Force (N) × distance (m).');
F('WRK-F04', 'work', 20, 'One joule of work is done when', 'a force of 1 N moves an object 1 m in the direction of the force',
  [['a force of 1 N is applied for 1 second', 'Time is not part of work. Time is part of power.'], ['a force of 1 N is applied to a 1 kg object', 'Work needs a distance, not a mass.'], ['an object with mass 1 kg moves for 1 m', 'This describes a distance, but no force is mentioned.']],
  '1 J = 1 N × 1 m.');
F('WRK-F05', 'work', 20, 'A student pushes a 10 N box with a 5 N force. The box moves 3 m in the direction of the push. How much work does the student do?', '15 J',
  [['30 J', 'The force that does the work is the 5 N push, not the 10 N weight.'], ['50 J', 'The student pushes with 5 N, not 10 N, and the distance is 3 m.'], ['1.7 J', 'Do not divide. W = F d = 5 × 3.']],
  'W = F d = (5 N)(3 m) = 15 J.');
F('WRK-F06', 'work', 25, 'Two workers each move a box. Worker 1 uses 10 N for 5 m. Worker 2 uses 5 N for 10 m. Compare the work they do.', 'They do the same amount of work',
  [['Worker 1 does more work, because the force is larger', 'Both do 50 J: 10 × 5 = 50 and 5 × 10 = 50.'], ['Worker 2 does more work, because the distance is larger', 'Both do 50 J: 10 × 5 = 50 and 5 × 10 = 50.'], ['Neither does work, because the boxes are different', 'Each force moves its box in the direction of the force, so work is done.']],
  'W = F d gives 50 J in both cases.');
F('WRK-F07', 'work', 25, 'In the ramp interactive, a cart is pulled to the same height at different ramp angles. The work needed is about 30 J at every angle for the 3 kg cart. Why?', 'The work equals the PE gained, m g h, and the height is always the same',
  [['The force is the same at every angle', 'The force changes with the angle: a gentler ramp needs less force.'], ['The cart gains kinetic energy at every angle', 'The cart moves at a constant speed, so its KE does not change.'], ['A ramp creates extra energy', 'Energy is not created. The work only changes the cart’s PE.']],
  'Pulling at a constant speed to the same height gives the same PE gain: m g h = 3 × 9.8 × 1.0 = 29.4 J, about 30 J.');
F('WRK-F08', 'work', 25, 'A 50 N force pushes a box 200 cm across the floor. How much work does the force do?', '100 J',
  [['10,000 J', 'The distance must be in meters first: 200 cm = 2.0 m.'], ['250 J', 'Do not add. Convert to meters, then multiply: 50 × 2.0.'], ['0.25 J', 'Do not divide 50 by 200. Multiply 50 N by 2.0 m.']],
  '200 cm = 2.0 m, so W = F d = (50 N)(2.0 m) = 100 J.');
F('WRK-F09', 'work', 30, 'Work is the transfer of energy to an object by a force that moves it. When a student lifts a book from the floor to a shelf, the work done becomes', 'gravitational potential energy of the book',
  [['kinetic energy of the book', 'The book ends at rest on the shelf, so there is no extra KE.'], ['thermal energy only', 'Almost all of the work is stored as PE. A little heat is produced in the student’s muscles.'], ['nothing, because the book did not move far', 'Any lifting moves the book up, and that is work.']],
  'Lifting raises the book, so the work is stored as gravitational potential energy.');
F('WRK-F10', 'work', 15, 'What is the difference between work and energy?', 'Energy is the ability to cause change. Work is how energy moves from one object to another',
  [['Work is stored energy and energy is motion', 'Stored energy is potential energy. Motion energy is kinetic energy.'], ['Work is measured in watts and energy is measured in joules', 'Both are measured in joules. Watts measure power.'], ['They are exactly the same thing', 'They have the same unit, but work is a transfer and energy is what is transferred.']],
  'Energy moves through the action of work.');

/* ===== Topic: Power (IDs start with PWR-) ===== */
T('PWR-T1', 'power', 25, 'Find power from work and time', function () {
  return tryGen('PWR-T1', function () {
    const W = pick([1200, 3000, 4500, 6000, 9000, 15000, 24000]), t = pick([2.0, 3.0, 4.0, 5.0, 6.0, 8.0, 10]);
    const what = pick(['An electric winch', 'A motor', 'A water pump', 'A cyclist']);
    return numQ({ n: 2, unit: ' W', right: W / t,
      prompt: what + ' does ' + show(W, 2) + ' J of work in ' + d2(t) + ' s. What is its average power?',
      wrongs: [[W * t, 'Power is work divided by time, not multiplied.'], [t / W, 'This is upside down. P = W ÷ t.'], [W - t, 'Power is a ratio. Divide the work by the time.']],
      explain: 'P = W ÷ t = ' + show(W, 2) + ' J ÷ ' + d2(t) + ' s = ' + show(W / t, 2) + ' W.', hint: 'Power = work ÷ time. 1 watt = 1 joule per second.', meta: { W: W, t: t } });
  });
});
T('PWR-T2', 'power', 40, 'Find work from power and time', function () {
  return tryGen('PWR-T2', function () {
    const P = pick([75, 120, 250, 400, 900, 1500]), t = pick([3.0, 4.0, 6.0, 8.0, 12, 20]);
    return numQ({ n: 2, unit: ' J', right: P * t,
      prompt: 'A ' + d2(P) + ' W motor runs for ' + d2(t) + ' s. How much work does it do?',
      wrongs: [[P / t, 'To get work, multiply power by time. W = P × t.'], [P + t, 'Power and time are multiplied, not added.'], [t / P, 'This is upside down. W = P × t.']],
      explain: 'W = P × t = (' + d2(P) + ' W)(' + d2(t) + ' s) = ' + show(P * t, 2) + ' J.', hint: 'Rearrange P = W ÷ t to W = P × t.', meta: { P: P, t: t } });
  });
});
T('PWR-T3', 'power', 40, 'Find time from work and power', function () {
  return tryGen('PWR-T3', function () {
    const P = pick([60, 100, 150, 200, 300, 400]), t = pick([2.0, 3.0, 5.0, 8.0, 12, 20, 30]), W = sig(P * t, 2), tT = W / P;
    return numQ({ n: 2, unit: ' s', right: tT,
      prompt: 'How long does it take a ' + d2(P) + ' W machine to do ' + show(W, 2) + ' J of work?',
      wrongs: [[W * P, 'To find time, divide the work by the power. Do not multiply.'], [P / W, 'This is upside down. t = W ÷ P.'], [W - P, 'Subtracting does not undo a division. Use t = W ÷ P.']],
      explain: 't = W ÷ P = ' + show(W, 2) + ' J ÷ ' + d2(P) + ' W = ' + show(tT, 2) + ' s.', hint: 'Rearrange P = W ÷ t to t = W ÷ P.', meta: { W: W, P: P } });
  });
});
T('PWR-T4', 'power', 60, 'Compare work and power of two lifters', function () {
  return tryGen('PWR-T4', function () {
    const [a, b] = twoNames();
    const h = pick([1.0, 1.5, 2.0]), F1 = pick([40, 60, 80, 90, 120]), F2 = pick([40, 60, 80, 90, 120]), t1 = pick([1.0, 1.5, 2.0, 2.5, 3.0]), t2 = pick([1.0, 1.5, 2.0, 2.5, 3.0]);
    const w1 = F1 * h, w2 = F2 * h, p1 = w1 / t1, p2 = w2 / t2;
    if (Math.abs(p1 - p2) / Math.max(p1, p2) < 0.1) return null;
    const workWord = w1 === w2 ? 'same' : (w1 > w2 ? a : b), powWord = p1 > p2 ? a : b;
    const st = (wk, pw) => wk === 'same' ? 'They do the same work, but ' + pw + ' has more power' : (wk === pw ? wk + ' does more work and has more power' : wk + ' does more work, but ' + pw + ' has more power');
    const truth = st(workWord, powWord);
    const all = [st(a, a), st(a, b), st(b, a), st(b, b), st('same', a), st('same', b)];
    const pool = all.filter(x => x !== truth);
    const want = shuffle(pool).slice(0, 3);
    const info = a + ' did ' + show(w1, 2) + ' J in ' + d2(t1) + ' s (' + show(p1, 2) + ' W); ' + b + ' did ' + show(w2, 2) + ' J in ' + d2(t2) + ' s (' + show(p2, 2) + ' W).';
    return { prompt: a + ' lifts a ' + d2(F1) + ' N box from the floor to a height of ' + d2(h) + ' m in ' + d2(t1) + ' s. ' + b + ' lifts a ' + d2(F2) + ' N box from the floor to ' + d2(h) + ' m in ' + d2(t2) + ' s. Which statement is true?',
      right: truth, wrongs: want.map(x => [x, 'This does not match the numbers. ' + info]),
      explain: 'Work = F × d, so ' + info + ' ' + truth + '.', hint: 'Work = force × height for each person. Then power = work ÷ time.', meta: { w1: w1, w2: w2, p1: p1, p2: p2, a: a, b: b } };
  });
});
T('PWR-T5', 'power', 65, 'Power of someone climbing stairs', function () {
  return tryGen('PWR-T5', function () {
    const m = pick([45, 55, 65, 70, 80]), h = pick([3.0, 4.0, 5.0, 6.0]), t = pick([3.0, 5.0, 6.0, 8.0]), f = gg => m * gg * h / t;
    return numQ({ n: 2, unit: ' W', right: f(GE), gf: f,
      prompt: 'During a fitness test, a ' + d2(m) + ' kg student sprints up a staircase that rises ' + d2(h) + ' m, and it takes ' + d2(t) + ' s. What is her average power output?',
      wrongs: [[m * GE * h, 'This is the work (the PE gained), not the power. Divide by the time to get power.'], [m * h / t, 'This left out g. The force that lifts the student is the weight, m g.'], [m * GE * h * t, 'Power is work divided by time, not multiplied.']],
      explain: 'Work = m g h = (' + d2(m) + ')(9.8)(' + d2(h) + ') = ' + show(m * GE * h, 3) + ' J. P = W ÷ t = ' + show(m * GE * h, 3) + ' ÷ ' + d2(t) + ' = ' + show(f(GE), 2) + ' W.', hint: 'First find the work to lift the student (m g h). Then divide by the time.', meta: { m: m, h: h, t: t } });
  });
});
T('PWR-T6', 'power', 60, 'Power in kilowatts', function () {
  return tryGen('PWR-T6', function () {
    const k = pick([1.5, 2.0, 2.5, 3.0, 4.0, 6.0]), t = pick([10, 20, 30, 45, 60]);
    return numQ({ n: 2, unit: ' J', right: k * 1000 * t,
      prompt: 'An electric motor rated at ' + d2(k) + ' kW runs for ' + d2(t) + ' s. How much work does it do, in joules?',
      wrongs: [[k * t, '1 kW = 1000 W. Convert the power to watts before multiplying.'], [k * 1000 / t, 'Work = power × time. Multiply, do not divide.'], [k * t / 1000, 'To change kW into W, multiply by 1000. This divided.']],
      explain: '1 kW = 1000 W, so P = ' + d2(k) + ' kW = ' + show(k * 1000, 2) + ' W. W = P t = (' + show(k * 1000, 2) + ')(' + d2(t) + ') = ' + show(k * 1000 * t, 2) + ' J.', hint: 'Change kilowatts to watts first (× 1000), then use W = P t.', meta: { k: k, t: t } });
  });
});
F('PWR-F01', 'power', 10, 'Power is', 'the rate at which work is done, or work per unit of time',
  [['the force used to move an object', 'That is the applied force.'], ['the total work done on an object', 'Power also depends on how fast the work is done.'], ['the energy stored in an object', 'That is potential energy.']],
  'Power = work ÷ time.');
F('PWR-F02', 'power', 10, 'The SI unit of power is the', 'watt (W), which equals one joule per second',
  [['joule (J), which equals one watt per second', 'The joule is the unit of work and energy. A watt is a joule per second.'], ['newton (N), which equals one joule per meter', 'A newton measures force.'], ['kilogram (kg)', 'A kilogram measures mass.']],
  'The watt is one joule of energy every second: 1 W = 1 J/s.');
F('PWR-F03', 'power', 10, 'Which equation gives average power?', 'P = W ÷ t',
  [['P = W × t', 'Power is work divided by time.'], ['P = F × d', 'This is the equation for work.'], ['P = t ÷ W', 'This is upside down.']],
  'Power = work ÷ time. Equivalent form: P = (force × distance) ÷ time.');
F('PWR-F04', 'power', 20, 'Two motors each do 1000 J of work. Motor A takes 5 s. Motor B takes 10 s. Which statement is true?', 'Motor A has more power, because it does the same work in less time',
  [['Motor B has more power, because it ran longer', 'More power means the work gets done faster. Motor A is faster.'], ['They have the same power, because the work is the same', 'Power also depends on time. Different times means different power.'], ['Motor B does more work, because it ran longer', 'Both motors do 1000 J of work.']],
  'A: 1000 ÷ 5 = 200 W. B: 1000 ÷ 10 = 100 W.');
F('PWR-F05', 'power', 20, 'A 60 W light bulb is on. What does 60 W mean?', 'The bulb transforms 60 J of energy every second',
  [['The bulb stores 60 J of energy', 'Watts measure a rate (energy per second), not a stored amount.'], ['The bulb transforms 60 J of energy in one minute', 'One watt is one joule per second, so 60 W is 60 J every second.'], ['The bulb has a force of 60 N', 'A newton measures force.']],
  '1 W = 1 J/s, so 60 W = 60 J every second.');
F('PWR-F06', 'power', 15, 'How many watts are in one kilowatt (1 kW)?', '1000 W',
  [['100 W', 'Kilo means 1000.'], ['10 W', 'Kilo means 1000.'], ['1,000,000 W', 'That would be a megawatt.']],
  'The prefix kilo means 1000, so 1 kW = 1000 W.');
F('PWR-F07', 'power', 25, 'A machine has a power of 200 W. How much work does it do in 30 seconds?', '6000 J',
  [['6.7 J', 'Do not divide. W = P × t.'], ['230 J', 'Do not add. Multiply power by time.'], ['600 J', 'W = 200 × 30 = 6000, not 600.']],
  'W = P t = (200 W)(30 s) = 6000 J.');
F('PWR-F08', 'power', 25, 'Climbing the same stairs, a runner takes half the time of a walker. Compared with the walker, the runner does', 'the same work with twice the power',
  [['twice the work with the same power', 'Both people lift themselves the same height, so the work is the same.'], ['half the work with twice the power', 'The work is the same for both. Only the time is different.'], ['the same work with half the power', 'Half the time means twice the power, not half.']],
  'Work = m g h is the same for both. Power = W ÷ t doubles when t is cut in half.');
F('PWR-F09', 'power', 30, 'To find your power running up a flight of stairs, which quantities do you need to measure?', 'Your weight (or mass), the vertical height of the stairs, and the time it takes',
  [['Only the time it takes', 'You need the work too, which depends on your weight and the height.'], ['Only the length of the stairs along the slope', 'The work depends on the vertical height, not the slanted length.'], ['Only your weight and the height', 'Without the time you only have the work. Power is work ÷ time.']],
  'Work = weight × height, then power = work ÷ time.');
F('PWR-F10', 'power', 30, 'Which of these is a unit of power?', 'J/s',
  [['J·s', 'This multiplies energy and time. Power divides energy by time.'], ['N·m', 'That is a joule, a unit of work or energy.'], ['kg·m/s', 'This is a unit of momentum, not power.']],
  'Joules per second is the definition of a watt, the unit of power.');
F('PWR-F11', 'power', 35, 'A 100 W lamp is on for one minute. How much energy does it transform?', '6000 J',
  [['100 J', 'The lamp transforms 100 J every second, and a minute is 60 seconds.'], ['1.7 J', 'Do not divide. E = P × t with t = 60 s.'], ['160 J', 'Do not add. Multiply: 100 W × 60 s.']],
  'E = P t = (100 W)(60 s) = 6000 J.');
