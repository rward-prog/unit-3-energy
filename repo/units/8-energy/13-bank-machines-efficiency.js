'use strict';
/* ===== Topic: Simple machines and ramps (IDs start with MCH-) ===== */
T('MCH-T1', 'mach', 60, 'Efficiency of a ramp', function () {
  return tryGen('MCH-T1', function () {
    const W = pick([200, 300, 400, 500, 600, 800]), h = pick([0.5, 1.0, 1.5, 2.0]), L = pick([3.0, 4.0, 5.0, 6.0, 8.0]), F = pick([40, 50, 60, 80, 100, 120, 150, 200, 250]);
    const out = W * h, inn = F * L, eff = 100 * out / inn;
    if (eff < 30 || eff > 96) return null;
    const wh = pick(['a wheelbarrow of bricks', 'a crate', 'a piano on a moving cart', 'a barrel']);
    return numQ({ n: 2, unit: '%', right: eff,
      prompt: 'A worker pushes ' + wh + ' weighing ' + d2(W) + ' N up a ramp that is ' + d2(L) + ' m long and raises it ' + d2(h) + ' m. The push along the ramp is ' + d2(F) + ' N. What is the efficiency of the ramp?',
      wrongs: [[100 * inn / out, 'This is flipped upside down. Efficiency = output ÷ input, and it can never be more than 100%.'], [100 - eff, 'This is the percent of the energy that was lost, not the efficiency.'], [100 * F / W, 'Comparing forces alone is not efficiency. Compare the work: output = weight × height, input = force × ramp length.']],
      explain: 'Work output = weight × height = ' + d2(W) + ' × ' + d2(h) + ' = ' + show(out, 3) + ' J. Work input = force × length = ' + d2(F) + ' × ' + d2(L) + ' = ' + show(inn, 3) + ' J. Efficiency = ' + show(out, 3) + ' ÷ ' + show(inn, 3) + ' × 100 = ' + show(eff, 2) + '%.', hint: 'Output work lifts the load: weight × height. Input work is the push along the whole ramp: force × length.', meta: { W: W, h: h, L: L, F: F } });
  });
});
T('MCH-T2', 'mach', 60, 'Force needed on an ideal ramp', function () {
  return tryGen('MCH-T2', function () {
    const W = pick([200, 300, 400, 500, 600, 800]), h = pick([0.5, 1.0, 1.5, 2.0]), L = pick([3.0, 4.0, 5.0, 6.0, 8.0]), F = W * h / L;
    return numQ({ n: 2, unit: ' N', right: F,
      prompt: 'An ideal ramp has no friction. How much force along the ramp is needed to push a ' + d2(W) + ' N crate up a ramp ' + d2(L) + ' m long that rises ' + d2(h) + ' m?',
      wrongs: [[W, 'This would be the force to lift the crate straight up. The ramp is supposed to make the job easier.'], [W * L / h, 'This is upside down. Work in = work out, so F × L = W × h, and F = W h ÷ L.'], [W * h * L, 'Do not multiply all three. Set the work in equal to the work out: F L = W h.']],
      explain: 'With no friction, work in = work out: F × L = W × h. So F = (' + d2(W) + ' × ' + d2(h) + ') ÷ ' + d2(L) + ' = ' + show(F, 2) + ' N.', hint: 'Without friction the work you put in equals the work the ramp puts out: F × (ramp length) = weight × (height).', meta: { W: W, h: h, L: L } });
  });
});
T('MCH-T3', 'mach', 45, 'Two ramps: compare force, distance, and work', function () {
  const L1 = pick([2.0, 3.0, 4.0]), r = pick([2, 3]), L2 = L1 * r, h = pick([0.5, 1.0, 1.5]), W = pick([100, 200, 300, 600]);
  const F1 = W * h / L1, F2 = W * h / L2;
  const opts = ['The longer ramp needs less force, and the work is the same', 'The longer ramp needs less force, and less work', 'The longer ramp needs more force, and more work', 'The longer ramp needs the same force, but more work'];
  return { prompt: 'Ramp A is ' + d2(L1) + ' m long and ramp B is ' + d2(L2) + ' m long. Both raise a ' + d2(W) + ' N crate ' + d2(h) + ' m, and friction is so small it can be ignored. Which statement is true?',
    right: opts[0], wrongs: [[opts[1], 'A ramp does not reduce the work. Work in = work out = weight × height, which is the same for both ramps.'], [opts[2], 'The longer ramp spreads the work over more distance, so it needs less force, not more.'], [opts[3], 'The force is different: F = W h ÷ L gets smaller as the ramp gets longer. The work is the same.']],
    explain: 'Ramp A: F = ' + d2(W) + ' × ' + d2(h) + ' ÷ ' + d2(L1) + ' = ' + show(F1, 2) + ' N. Ramp B: F = ' + show(F2, 2) + ' N. The work is ' + show(W * h, 2) + ' J either way. The trade-off is less force for more distance.', hint: 'Work = force × distance. If the distance gets bigger and the work stays the same, what happens to the force?', meta: { L1: L1, L2: L2 } };
});
const _MACH = [
  ['inclined plane', ['a ramp up to a loading dock', 'a wheelchair ramp', 'a sloped road up a hill']],
  ['screw', ['a jar lid', 'a bolt and nut', 'a spiral light bulb base']],
  ['lever', ['a seesaw', 'a crowbar', 'a pair of tongs']],
  ['pulley', ['the rope and wheel at the top of a flagpole', 'the rope-and-wheel hoist on a crane', 'the rope over a wheel in a well']],
  ['wedge', ['an axe blade', 'a doorstop', 'a knife blade']],
  ['wheel and axle', ['a doorknob', 'a car’s steering wheel', 'a bicycle wheel turning on its axle']]
];
T('MCH-T4', 'mach', 30, 'Name the simple machine', function () {
  const i = ri(0, _MACH.length - 1), item = pick(_MACH[i][1]), name = _MACH[i][0];
  const others = shuffle(_MACH.filter((m, j) => j !== i)).slice(0, 3);
  return { prompt: 'Which simple machine is ' + item + '?', right: name.charAt(0).toUpperCase() + name.slice(1),
    wrongs: others.map(o => [o[0].charAt(0).toUpperCase() + o[0].slice(1), 'This is a ' + o[0] + ' machine type, but ' + item + ' is a ' + name + '.']),
    explain: 'The six simple machines are the inclined plane, screw, lever, pulley, wedge, and wheel and axle. ' + item.charAt(0).toUpperCase() + item.slice(1) + ' is a ' + name + '.', hint: 'The six simple machines are inclined plane, screw, lever, pulley, wedge, and wheel and axle.', meta: { name: name } };
});
F('MCH-F01', 'mach', 10, 'Which list contains only simple machines?', 'Inclined plane, screw, lever, pulley, wedge, wheel and axle',
  [['Inclined plane, screw, lever, engine, wedge, wheel and axle', 'An engine is a complex machine with many moving parts, not a simple machine.'], ['Ramp, battery, lever, pulley, wedge, magnet', 'A battery and a magnet are not simple machines.'], ['Screw, spring, lever, motor, wedge, gear train', 'A motor and a gear train have many moving parts. A simple machine does work in one movement.']],
  'There are six simple machines: inclined plane, screw, lever, pulley, wedge, and wheel and axle.');
F('MCH-F02', 'mach', 15, 'A simple machine is a machine that', 'does work using one movement',
  [['does work using many moving parts', 'That describes a compound or complex machine.'], ['makes work by creating energy', 'No machine can create energy.'], ['always has a motor', 'Many simple machines, like a ramp or a lever, have no motor.']],
  'Machines that do work using one movement are called simple machines.');
F('MCH-F03', 'mach', 20, 'Simple machines can make work easier in two ways. What are they?', 'They can reduce the force needed, or change the direction of the force',
  [['They can reduce the total work, or create extra energy', 'Simple machines do not change the total work and never create energy.'], ['They can increase the distance, or reduce the time', 'Changing the distance is a trade-off, not a way to make the work smaller.'], ['They can make the object lighter, or reduce gravity', 'A machine does not change the object’s weight or gravity.']],
  'A machine can lower the force you need or point the force a more convenient way, but it does not change the amount of work needed.');
F('MCH-F04', 'mach', 25, 'Compared with lifting a box straight up 1 m, pushing it up a gentle ramp to the same height (ignoring friction) requires', 'less force but a longer distance, for the same amount of work',
  [['less force and less work', 'The work is the same: force × distance with the extra distance makes up for the smaller force.'], ['the same force but a longer distance', 'The force is smaller on a gentle ramp.'], ['more force over a shorter distance', 'A gentle ramp lowers the force and increases the distance.']],
  'A ramp trades distance for force. Work = force × distance stays the same.');
F('MCH-F05', 'mach', 20, 'When you use a machine, how does the work you put in compare with the work the machine puts out?', 'The work you put in is always greater, because some energy is lost',
  [['The work you put in is always less', 'Then the machine would be creating energy, which is not possible.'], ['They are always exactly equal', 'This is only true for a perfect machine, which does not exist. Some energy is always lost.'], ['They have nothing to do with each other', 'The work out comes from the work in. Part of the work in is lost.']],
  'Work input > work output in real machines, because of friction and other energy losses.');
F('MCH-F06', 'mach', 25, 'Work output is always less than work input. Where does the difference go?', 'It becomes thermal energy from friction and other non-useful forms of energy',
  [['It is destroyed by the machine', 'Energy cannot be destroyed.'], ['It is stored as extra weight in the machine', 'A machine does not gain weight from lost energy.'], ['It becomes extra output work later', 'The lost energy spreads out as heat and does not come back as useful work.']],
  'Friction turns some of the input work into thermal energy, which is not useful for the job.');
F('MCH-F07', 'mach', 35, 'A worker pushes a box up a ramp to raise it onto a truck. Which pair of calculations gives the ramp’s work OUTPUT and work INPUT?', 'Output = weight × height lifted. Input = applied force × length of the ramp',
  [['Output = applied force × length of the ramp. Input = weight × height lifted', 'These are swapped. The output is the work of raising the load. The input is the work of pushing.'], ['Both equal the weight times the length of the ramp', 'The output uses the height the load is lifted, not the length of the ramp.'], ['Output = force ÷ distance. Input = distance ÷ force', 'Work is force times distance, not a ratio.']],
  'Output work lifts the load: W × h. Input work is the push along the ramp: F × L.');
F('MCH-F08', 'mach', 20, 'What does a single fixed pulley, like the one at the top of a flagpole, do?', 'It changes the direction of the force',
  [['It reduces the force needed to half', 'A single fixed pulley only changes direction. It does not reduce the force.'], ['It increases the distance moved', 'A single fixed pulley does not change the distance.'], ['It creates extra work', 'A machine cannot create work or energy.']],
  'Pulling down on the rope raises the flag. The pulley turns your downward pull into an upward pull.');
F('MCH-F09', 'mach', 25, 'Moving up 1 m on an 80° ramp versus a 30° ramp: which statement about the 30° ramp is true?', 'It requires less force, but a longer distance and likely more time',
  [['It requires more force and a shorter distance', 'The gentler ramp is the one that needs less force.'], ['It requires less work in total', 'The work (ideally) is the same for both ramps.'], ['It requires the same force but a longer distance', 'The force is different. A gentler ramp needs less.']],
  'A shallow ramp spreads the work over a longer distance, so the force is smaller.');
F('MCH-F10', 'mach', 20, 'In a perfect energy transfer, the work you put into a machine would', 'equal the work the machine puts out',
  [['be greater than the work the machine puts out', 'That is what happens in real machines because of friction.'], ['be less than the work the machine puts out', 'That would mean energy was created.'], ['always be zero', 'You still have to push, turn, or lift. Machines still require work input.']],
  'A perfect machine has no losses, so input work = output work. Real machines are never perfect.');
F('MCH-F11', 'mach', 15, 'Which of these is NOT a simple machine?', 'A flashlight',
  [['A wedge', 'A wedge is one of the six simple machines.'], ['A pulley', 'A pulley is one of the six simple machines.'], ['A lever', 'A lever is one of the six simple machines.']],
  'A flashlight turns chemical energy into light. It is not a machine that does work in a single movement.');

/* ===== Topic: Efficiency (IDs start with EFF-) ===== */
T('EFF-T1', 'eff', 40, 'Find efficiency from energy in and energy out', function () {
  return tryGen('EFF-T1', function () {
    const o = pick(['A cell phone', 'A toy robot', 'A hand-crank radio', 'A small fan']), inn = pick([400, 500, 800, 1000, 2000, 5000, 10000, 40000]), e = pick([22, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80, 85, 90]), out = sig(inn * e / 100, 2), eT = 100 * out / inn;
    return numQ({ n: 2, unit: '%', right: eT,
      prompt: o + ' uses ' + show(inn, 2) + ' J of energy and gives ' + show(out, 2) + ' J of useful energy output. What is its efficiency?',
      wrongs: [[100 * inn / out, 'This is flipped. Efficiency = output ÷ input, so it is always under 100%.'], [100 - eT, 'This is the percent of the energy that was wasted, not the efficiency.'], [100 * out / (inn - out), 'This compares the output to the wasted energy. Compare it to the TOTAL energy used: output ÷ input.']],
      explain: 'Efficiency = (output ÷ input) × 100 = (' + show(out, 2) + ' ÷ ' + show(inn, 2) + ') × 100 = ' + show(eT, 2) + '%.', hint: 'Efficiency = (useful output ÷ total input) × 100.', meta: { inn: inn, out: out } });
  });
});
T('EFF-T2', 'eff', 50, 'Efficiency from energy consumed and energy lost', function () {
  return tryGen('EFF-T2', function () {
    const inn = pick([800, 1200, 2000, 5000, 20000, 80000]), lostFrac = pick([0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75]), lost = sig(inn * lostFrac, 2), out = inn - lost, e = 100 * out / inn;
    return numQ({ n: 2, unit: '%', right: e,
      prompt: 'A device consumes ' + show(inn, 2) + ' J of energy and loses ' + show(lost, 2) + ' J of it as heat and sound. What is the energy efficiency of the device?',
      wrongs: [[100 * lost / inn, 'This is the percent that was lost. Efficiency uses the energy that was NOT lost.'], [100 * inn / out, 'This is flipped. Efficiency = useful output ÷ input.'], [100 * out / lost, 'Divide by the energy consumed (the input), not by the energy lost.']],
      explain: 'Useful output = consumed − lost = ' + show(inn, 2) + ' − ' + show(lost, 2) + ' = ' + show(out, 2) + ' J. Efficiency = ' + show(out, 2) + ' ÷ ' + show(inn, 2) + ' × 100 = ' + show(e, 2) + '%.', hint: 'Subtract the lost energy from the energy consumed to get the useful output first.', meta: { inn: inn, lost: lost } });
  });
});
T('EFF-T3', 'eff', 55, 'Find the energy input from efficiency and useful output', function () {
  return tryGen('EFF-T3', function () {
    const e = pick([20, 25, 40, 45, 60, 65, 75, 80, 85, 90]), inn0 = pick([400, 500, 800, 1000, 2000, 5000, 10000]), out = sig(inn0 * e / 100, 2), inn = out / (e / 100);
    const what = pick(['A kettle', 'An electric drill', 'A laptop charger', 'A blender']);
    return numQ({ n: 2, unit: ' J', right: inn,
      prompt: what + ' turns ' + e + '% of the electrical energy it uses into useful energy, and it delivers ' + show(out, 2) + ' J of useful energy. How much electrical energy does it use?',
      wrongs: [[out * e / 100, 'Consumed energy must be MORE than the useful output. This came out smaller. Divide by the efficiency instead.'], [out / e, 'The efficiency must be changed to a decimal first (' + e + '% = ' + fmt(e / 100, 2) + '). Divide by that decimal.'], [out * 100 / (100 - e), 'Use the efficiency, ' + e + '%, not the wasted percent.']],
      explain: 'Efficiency = output ÷ input, so input = output ÷ efficiency = ' + show(out, 2) + ' ÷ ' + fmt(e / 100, 2) + ' = ' + show(inn, 2) + ' J.', hint: 'Rearrange efficiency = output ÷ input to find the input. Use the efficiency as a decimal.', meta: { e: e, out: out } });
  });
});
T('EFF-T4', 'eff', 50, 'Find the useful output from efficiency and input', function () {
  return tryGen('EFF-T4', function () {
    const e = pick([20, 25, 30, 40, 45, 55, 60, 75, 80]), inn = pick([500, 800, 1000, 2000, 5000, 10000, 40000]), out = inn * e / 100;
    return numQ({ n: 2, unit: ' J', right: out,
      prompt: 'A motor is ' + e + '% efficient. If ' + show(inn, 2) + ' J of energy goes in, how much of it comes out as useful energy?',
      wrongs: [[inn * 100 / e, 'The output must be LESS than the input. This is bigger because it divided by the efficiency.'], [inn * e, 'The efficiency has to be turned into a decimal: ' + e + '% = ' + fmt(e / 100, 2) + '. Multiply by that.'], [inn * (100 - e) / 100, 'This is the wasted energy, not the useful output.']],
      explain: 'Output = input × efficiency = ' + show(inn, 2) + ' × ' + fmt(e / 100, 2) + ' = ' + show(out, 2) + ' J.', hint: 'Useful output = input × (efficiency as a decimal).', meta: { e: e, inn: inn } });
  });
});
T('EFF-T5', 'eff', 55, 'Which device is the most efficient?', function () {
  return tryGen('EFF-T5', function () {
    const names = ['Model A', 'Model B', 'Model C'], inn = [0, 1, 2].map(() => pick([420, 480, 520, 580, 630, 700, 770, 850])), effs = [0, 1, 2].map(() => pick([62, 68, 74, 80, 86, 92, 96]));
    if (new Set(effs).size < 3) return null;
    const out = inn.map((x, i) => Math.round(x * effs[i] / 100 / 10) * 10), ee = out.map((o, i) => 100 * o / inn[i]);
    if (!far(ee)) return null;
    const best = ee.indexOf(Math.max(...ee)), maxOut = out.indexOf(Math.max(...out)), minIn = inn.indexOf(Math.min(...inn));
    if (best === maxOut || best === minIn || new Set(out).size < 3) return null;
    const td = 'border:1px solid currentColor;padding:4px 10px;text-align:center';
    const table = '<table style="border-collapse:collapse;margin:8px 0"><tr><th style="' + td + '"></th>' + names.map(n => '<th style="' + td + '">' + n + '</th>').join('') + '</tr>' +
      '<tr><td style="' + td + '">Power consumed</td>' + inn.map(x => '<td style="' + td + '">' + x + ' W</td>').join('') + '</tr>' +
      '<tr><td style="' + td + '">Power output</td>' + out.map(x => '<td style="' + td + '">' + x + ' W</td>').join('') + '</tr></table>';
    const effTxt = ee.map((x, i) => names[i] + ': ' + show(out[i], 3) + ' ÷ ' + show(inn[i], 3) + ' = ' + show(x, 2) + '%').join('; ');
    const wrongs = [0, 1, 2].filter(i => i !== best).map(i => [names[i], names[i] + ' has an efficiency of ' + show(ee[i], 2) + '%, which is lower than ' + names[best] + '’s ' + show(ee[best], 2) + '%.']);
    wrongs.push(['They are all equally efficient', 'The three efficiencies are different: ' + ee.map(x => show(x, 2) + '%').join(', ') + '.']);
    return { prompt: 'A technician tests three models of hair dryer. Which model is the most energy efficient?' + table, right: names[best], wrongs: wrongs.slice(0, 3),
      explain: 'Efficiency = power output ÷ power input × 100. ' + effTxt + '. The most efficient is ' + names[best] + '.', hint: 'Do not pick the biggest output. Calculate output ÷ input for each model.', meta: { best: best, ee: ee, inn: inn, out: out } };
  });
});
T('EFF-T6', 'eff', 45, 'Efficiency from power output and power input', function () {
  return tryGen('EFF-T6', function () {
    const pin = pick([200, 400, 500, 800, 1200, 2000, 5000]), e = pick([30, 35, 40, 55, 60, 65, 75, 85, 90]), pout = sig(pin * e / 100, 2), eT = 100 * pout / pin;
    return numQ({ n: 2, unit: '%', right: eT,
      prompt: 'A motor takes in ' + show(pin, 2) + ' W of electrical power and delivers ' + show(pout, 2) + ' W of mechanical power. What is its efficiency?',
      wrongs: [[100 * pin / pout, 'This is flipped. Efficiency = power output ÷ power input.'], [100 - eT, 'This is the percent of the power that is wasted.'], [pin - pout, 'This is the wasted power in watts, not a percentage efficiency.']],
      explain: 'Efficiency = (power output ÷ power input) × 100 = (' + show(pout, 2) + ' ÷ ' + show(pin, 2) + ') × 100 = ' + show(eT, 2) + '%.', hint: 'Efficiency can use power instead of work: (power output ÷ power input) × 100.', meta: { pin: pin, pout: pout } });
  });
});
T('EFF-T7', 'eff', 70, 'Efficiency of a coaster from its real speed', function () {
  return tryGen('EFF-T7', function () {
    const m = pick([500, 800, 1000, 1200]), h = pick([40, 50, 60, 80, 90]), v = pick([20, 24, 26, 28, 30, 32, 34, 36, 38, 40]);
    if (v * v >= 2 * GE * h) return null;
    const f = gg => 100 * v * v / (2 * gg * h);
    return numQ({ n: 2, unit: '%', right: f(GE), gf: f,
      prompt: 'A ' + d2(m) + ' kg roller coaster car is released from rest at the top of a hill ' + d2(h) + ' m tall. At the bottom its actual speed is ' + d2(v) + ' m/s. What is the efficiency of the ride, comparing the KE at the bottom with the PE at the top?',
      wrongs: [[100 * Math.sqrt(v * v / (2 * GE * h)), 'This compared the speeds. Efficiency compares ENERGIES: KE at the bottom ÷ PE at the top.'], [100 - f(GE), 'This is the percent of the energy that was lost, not the efficiency.'], [100 * 2 * GE * h / (v * v), 'This is flipped. Efficiency = KE output ÷ PE input, which is under 100%.']],
      explain: 'PE at the top = m g h = ' + show(m * GE * h, 3) + ' J. KE at the bottom = ½ m v² = ' + show(0.5 * m * v * v, 3) + ' J. Efficiency = ' + show(0.5 * m * v * v, 3) + ' ÷ ' + show(m * GE * h, 3) + ' × 100 = ' + show(f(GE), 2) + '%.', hint: 'Compare KE at the bottom (output) with PE at the top (input).', meta: { m: m, h: h, v: v } });
  });
});
F('EFF-F01', 'eff', 10, 'Which equation gives efficiency?', 'Efficiency = (work output ÷ work input) × 100',
  [['Efficiency = (work input ÷ work output) × 100', 'This is flipped. It would give a number over 100%.'], ['Efficiency = work output × work input', 'Efficiency is a ratio, not a product.'], ['Efficiency = work output − work input', 'Efficiency compares the two with a division, not a subtraction.']],
  'Efficiency compares output to input, and it is always written as a percentage.');
F('EFF-F02', 'eff', 15, 'Efficiency is always expressed as', 'a percentage',
  [['a number of joules', 'Efficiency is a ratio, so it has no energy unit.'], ['a number of watts', 'Watts measure power. Efficiency is a ratio.'], ['a number of newtons', 'Newtons measure force.']],
  'Efficiency is (output ÷ input) × 100, a percentage.');
F('EFF-F03', 'eff', 20, 'Why can no real machine be 100% efficient?', 'Some energy is always lost to friction and thermal energy',
  [['Machines always destroy some energy', 'Energy is never destroyed. It changes to thermal energy and other forms.'], ['Gravity takes some of the energy', 'Gravity does not take energy from a machine. Friction and heat do.'], ['The input energy is always too small', 'The size of the input does not set the efficiency. The losses do.']],
  'Moving parts always rub together, so some input energy always turns into thermal energy.');
F('EFF-F04', 'eff', 20, 'A machine is 85% efficient. What does that mean?', '85% of the energy put in becomes useful output, and 15% is lost',
  [['85% of the energy put in is lost', 'It is the other way around: 85% is useful and 15% is lost.'], ['The machine runs 85% of the time', 'Efficiency is about energy, not time.'], ['The machine can lift 85% of its own weight', 'Efficiency compares output to input energy.']],
  'Efficiency 85% means 85 J of every 100 J put in becomes useful output.');
F('EFF-F05', 'eff', 25, 'A car engine takes in 1000 J of energy from gasoline and produces 250 J of useful work. How much energy is wasted?', '750 J',
  [['250 J', 'This is the useful work. The waste is what remains: 1000 − 250.'], ['1250 J', 'The wasted energy is the input minus the output, not their sum.'], ['4000 J', 'This is input ÷ output, a ratio. The waste is the difference.']],
  'Wasted = input − useful output = 1000 − 250 = 750 J, mostly thermal energy.');
F('EFF-F06', 'eff', 20, 'Which efficiency is impossible?', '105%',
  [['85%', 'This is a realistic efficiency.'], ['40%', 'This is a realistic efficiency.'], ['15%', 'A car engine can be near this.']],
  'A machine cannot give out more energy than it takes in, so efficiency is always under 100%.');
F('EFF-F07', 'eff', 25, 'Efficiency can be found by comparing work output with work input. It can also be found by comparing', 'power output with power input',
  [['force output with force input', 'Force comparisons do not account for distance, so they do not give efficiency.'], ['time input with time output', 'Time alone does not tell how much energy is useful.'], ['speed output with speed input', 'Speed alone does not tell how much energy is useful.']],
  'Efficiency = (power output ÷ power input) × 100 gives the same answer when both are measured over the same time.');
F('EFF-F08', 'eff', 30, 'An engineer improves a phone so it is more efficient. Which change shows the improvement?', 'More of the battery’s energy becomes light and sound for the screen, and less becomes heat',
  [['The battery gives out less energy overall', 'A more efficient phone wastes less, not necessarily draws less energy in total. The ratio of useful to input energy goes up.'], ['The phone gets warmer when it is used', 'More heat means more energy is wasted.'], ['The phone uses the same energy but the screen is dimmer', 'A dimmer screen means less useful output for the same input, so efficiency fell.']],
  'Higher efficiency means a bigger fraction of the input becomes useful output.');
F('EFF-F09', 'eff', 25, 'An average engine wastes nearly 85% of its input energy. About how efficient is it?', 'About 15%',
  [['About 85%', 'That is the percent wasted, not the efficiency.'], ['About 100%', 'No engine is that efficient.'], ['About 7%', 'This does not match. 100% − 85% = 15%.']],
  '100% − 85% waste = 15% useful output.');
