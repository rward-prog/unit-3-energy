'use strict';
/* ===== Challenge (beyond the test). Tracked separately. IDs start with CH- ===== */
Object.assign(FAC, { 1.5: 'one and a half times as large', 4.5: 'four and a half times as large', 5: 'five times as large', 10: 'ten times as large', 18: 'eighteen times as large', 25: 'twenty-five times as large' });
const CHG = { Moon: 1.62, Mars: 3.7, Jupiter: 23.1 };

T('CH-T1', 'chal', 60, 'Scaling puzzle: mass and speed together (no calculator)', function () {
  const cases = [
    { c: 'the mass is multiplied by 3 and the speed is multiplied by 2', f: 12, w: [[6, 'The speed doubling gives 2² = 4, not 2. Then × 3 for the mass: 12.'], [9, 'The mass tripling is ×3 (not squared), and the speed doubling is ×4: 3 × 4 = 12.'], [16, 'The mass is not squared. ×3 from the mass and ×4 from the speed gives 12.']] },
    { c: 'the mass is multiplied by 4 and the speed is cut in half', f: 1, w: [[2, 'The halved speed gives (½)² = ¼, and the ×4 from the mass cancels it exactly.'], [4, 'The slower speed lowers the KE by ¼, which cancels the ×4 from the mass.'], [0.25, 'The ×4 from the mass cancels the ¼ from the speed, so nothing changes.']] },
    { c: 'the mass is cut in half and the speed is multiplied by 3', f: 4.5, w: [[1.5, 'The speed is squared: 3² = 9, then × ½ from the mass gives 4.5.'], [9, 'The mass is half as large, so the 9 from the speed is cut in half: 4.5.'], [6, 'The speed tripling gives 3² = 9 (not 3 × 2). Then × ½: 4.5.']] },
    { c: 'the mass is multiplied by 2 and the speed is multiplied by 3', f: 18, w: [[6, 'The speed tripling gives 3² = 9, not 3. Then × 2: 18.'], [12, 'The speed tripling gives 9, not 6. Then × 2: 18.'], [9, 'The ×2 from the mass is missing. 9 × 2 = 18.']] },
    { c: 'the mass is multiplied by 9 and the speed is cut to one-third', f: 1, w: [[3, 'The speed gives (⅓)² = 1/9, which cancels the ×9 from the mass.'], [9, 'The slower speed lowers KE by 1/9, which cancels the ×9.'], [2, 'The ×9 and 1/9 cancel exactly: the KE stays the same.']] },
    { c: 'the speed is multiplied by 5 and the mass stays the same', f: 25, w: [[5, 'Speed is squared: 5² = 25.'], [10, 'Speed is squared: 5² = 25, not 5 × 2.'], [16, 'Speed is squared: 5² = 25.']] }
  ];
  const k = pick(cases);
  return { prompt: 'Without a calculator: what happens to an object’s kinetic energy if ' + k.c + '?', right: 'The KE becomes ' + facText(k.f),
    wrongs: k.w.map(w => ['The KE becomes ' + facText(w[0]), w[1]]), explain: 'KE = ½ m v². Multiply the mass factor by the square of the speed factor. For this change the KE becomes ' + facText(k.f) + '.', hint: 'Mass factor × (speed factor)².', meta: { f: k.f } };
});
T('CH-T2', 'chal', 55, 'Potential energy on another world', function () {
  return tryGen('CH-T2', function () {
    const pl = pick(['Moon', 'Mars', 'Jupiter']), g = CHG[pl], m = pick([2, 5, 8, 10, 15, 20]), h = pick([2.0, 3.0, 5.0, 8.0, 10, 20]);
    return numQ({ n: 2, unit: ' J', right: m * g * h,
      prompt: 'An astronaut lifts a ' + d2(m) + ' kg sample ' + d2(h) + ' m on ' + pl + ', where g = ' + g + ' m/s². How much gravitational potential energy does the sample gain?',
      wrongs: [[m * GE * h, 'This used Earth’s g = 9.8. On ' + pl + ' the value is ' + g + ' m/s².'], [m * h, 'This left out g. PE = m g h.'], [0.5 * m * g * h, 'PE = m g h has no ½.']],
      explain: 'PE = m g h = (' + d2(m) + ')(' + g + ')(' + d2(h) + ') = ' + show(m * g * h, 2) + ' J.', hint: 'Use the g value for the planet in the problem, not Earth’s 9.8.', meta: { pl: pl, m: m, h: h } });
  });
});
T('CH-T3', 'chal', 65, 'Work turns into speed', function () {
  return tryGen('CH-T3', function () {
    const nm = oneName(), F = pick([20, 30, 40, 50, 60, 90]), d = pick([2.0, 3.0, 4.0, 5.0, 8.0]), m = pick([2, 5, 10, 15, 20]), v = Math.sqrt(2 * F * d / m);
    return numQ({ n: 2, unit: ' m/s', right: v,
      prompt: nm + ' pushes a ' + d2(m) + ' kg cart, starting at rest, with a constant horizontal force of ' + d2(F) + ' N for ' + d2(d) + ' m on a smooth floor with no friction. How fast is the cart moving at the end?',
      wrongs: [[F * d / m, 'This is v² ÷ 2. The work equals the KE: F d = ½ m v², so v = √(2 F d ÷ m).'], [Math.sqrt(F * d / m), 'This left out the 2. F d = ½ m v² gives v = √(2 F d ÷ m).'], [2 * F * d / m, 'This is v², not v. Take the square root.']],
      explain: 'The work done on the cart becomes its kinetic energy: F d = ½ m v². So v = √(2 F d ÷ m) = √(2 × ' + d2(F) + ' × ' + d2(d) + ' ÷ ' + d2(m) + ') = ' + show(v, 2) + ' m/s.', hint: 'With no friction, all the work done becomes kinetic energy: W = F d = ½ m v².', meta: { F: F, d: d, m: m } });
  });
});
T('CH-T4', 'chal', 60, 'Braking distance and speed', function () {
  return tryGen('CH-T4', function () {
    const d1 = pick([8, 10, 12, 15, 20]), v1 = pick([10, 15, 20]), r = pick([2, 3]), v2 = v1 * r, ans = d1 * r * r;
    return numQ({ n: 2, unit: ' m', right: ans,
      prompt: 'A car moving at ' + d2(v1) + ' m/s slides ' + d2(d1) + ' m to a stop with its brakes locked. On the same road, how far would it slide if it started at ' + d2(v2) + ' m/s?',
      wrongs: [[d1 * r, 'The distance does not just scale with speed. Friction must remove all of the KE, and KE grows with v².'], [d1 * r * r * r, 'KE grows with the square of the speed, not the cube.'], [d1 * r / 2, 'The KE grows with v², so a bigger speed means a much longer stopping distance.']],
      explain: 'Friction does work f × d = KE. KE = ½ m v² grows with v², and friction stays the same, so the distance grows with v². ' + r + '² = ' + (r * r) + ', so d = ' + d2(d1) + ' × ' + (r * r) + ' = ' + show(ans, 2) + ' m.', hint: 'The same friction must remove the KE. How many times bigger is the KE when the speed is ' + r + ' times bigger?', meta: { d1: d1, r: r } });
  });
});
T('CH-T5', 'chal', 70, 'Electrical energy needed to lift with an efficient motor', function () {
  return tryGen('CH-T5', function () {
    const e = pick([40, 50, 60, 75, 80]), m = pick([20, 40, 50, 100, 200]), h = pick([2.0, 3.0, 5.0, 8.0, 10]), f = gg => m * gg * h / (e / 100);
    return numQ({ n: 2, unit: ' J', right: f(GE), gf: f,
      prompt: 'A winch motor is ' + e + '% efficient. It lifts a ' + d2(m) + ' kg load straight up ' + d2(h) + ' m at a steady speed. How much electrical energy does the motor use?',
      wrongs: [[m * GE * h, 'This is only the useful energy (the PE gained by the load). The motor wastes some, so it must use more.'], [m * GE * h * e / 100, 'The motor uses MORE energy than the load gains, not less. Divide by the efficiency.'], [m * GE * h / (1 - e / 100), 'Use the efficiency (' + e + '%), not the wasted fraction.']],
      explain: 'Useful output = PE gained = m g h = ' + show(m * GE * h, 3) + ' J. Input = output ÷ efficiency = ' + show(m * GE * h, 3) + ' ÷ ' + fmt(e / 100, 2) + ' = ' + show(f(GE), 2) + ' J.', hint: 'Step 1: how much useful energy does the load gain? Step 2: input = output ÷ efficiency.', meta: { e: e, m: m, h: h } });
  });
});
T('CH-T6', 'chal', 80, 'Electrical power needed by a crane', function () {
  return tryGen('CH-T6', function () {
    const e = pick([40, 50, 60, 75, 80]), m = pick([100, 200, 500, 800]), h = pick([5.0, 8.0, 10, 20]), t = pick([4.0, 5.0, 8.0, 10, 20]), f = gg => m * gg * h / t / (e / 100);
    return numQ({ n: 2, unit: ' W', right: f(GE), gf: f,
      prompt: 'A crane is ' + e + '% efficient. It lifts a ' + d2(m) + ' kg block ' + d2(h) + ' m in ' + d2(t) + ' s. What electrical power does the crane draw?',
      wrongs: [[m * GE * h / t, 'This is the useful power. The crane draws more than this because it wastes some energy.'], [m * GE * h / t * e / 100, 'The crane draws MORE power than its useful output. Divide by the efficiency, do not multiply.'], [m * GE * h / (e / 100), 'This is the input energy in joules. Divide by the time to get power.']],
      explain: 'Useful power = m g h ÷ t = ' + show(m * GE * h / t, 3) + ' W. Power drawn = useful power ÷ efficiency = ' + show(m * GE * h / t, 3) + ' ÷ ' + fmt(e / 100, 2) + ' = ' + show(f(GE), 2) + ' W.', hint: 'Find the useful power first, then divide by the efficiency.', meta: { e: e, m: m, h: h, t: t } });
  });
});
T('CH-T7', 'chal', 85, 'Speed at the bottom of a ramp with friction', function () {
  return tryGen('CH-T7', function () {
    const m = pick([20, 30, 50, 80]), h = pick([2.0, 3.0, 4.0, 5.0]), L = pick([4.0, 5.0, 6.0, 8.0]), fr = pick([20, 30, 40, 50, 60]);
    if (m * GE * h - fr * L < 0.2 * m * GE * h) return null;
    const f = gg => Math.sqrt(2 * (m * gg * h - fr * L) / m);
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: 'A ' + d2(m) + ' kg crate slides from rest down a ramp that is ' + d2(L) + ' m long and ' + d2(h) + ' m high. A constant friction force of ' + d2(fr) + ' N acts along the ramp. How fast is the crate moving at the bottom?',
      wrongs: [[Math.sqrt(2 * GE * h), 'This ignores friction. Friction removes work f × L from the crate’s energy.'], [Math.sqrt(2 * (m * GE * h + fr * L) / m), 'Friction takes energy away, so subtract f × L. Do not add it.'], [Math.sqrt(2 * (m * GE * h - fr * L)), 'This forgot to divide by the mass. From ½ m v² = (energy left), v² = 2 × (energy left) ÷ m.']],
      explain: 'Energy balance: m g h − f L = ½ m v². Here m g h = ' + show(m * GE * h, 3) + ' J and f L = ' + show(fr * L, 3) + ' J, so ½ m v² = ' + show(m * GE * h - fr * L, 3) + ' J and v = ' + show(f(GE), 2) + ' m/s.', hint: 'Start with PE at the top. Subtract the work friction does (force × ramp length). What is left is KE.', meta: { m: m, h: h, L: L, fr: fr } });
  });
});
T('CH-T8', 'chal', 80, 'Push needed up a ramp with friction', function () {
  return tryGen('CH-T8', function () {
    const m = pick([20, 40, 50, 80]), h = pick([1.0, 1.5, 2.0]), L = pick([3.0, 4.0, 5.0, 6.0]), fr = pick([10, 15, 20, 30, 40]), f = gg => m * gg * h / L + fr;
    return numQ({ n: 2, unit: ' N', right: f(GE), gf: f,
      prompt: 'A ' + d2(m) + ' kg crate is pushed up a ramp ' + d2(L) + ' m long and ' + d2(h) + ' m high at a steady speed. Friction on the crate is ' + d2(fr) + ' N. What push along the ramp is needed?',
      wrongs: [[m * GE * h / L, 'This is the push on a frictionless ramp. Friction adds to the push needed.'], [m * GE * h / L - fr, 'Friction makes the push bigger, not smaller. Add it.'], [m * GE, 'This is the force needed to lift the crate straight up. A ramp should make the push smaller.']],
      explain: 'Work in = work out + work lost to friction: F L = m g h + f L. So F = m g h ÷ L + f = ' + show(m * GE * h / L, 3) + ' + ' + d2(fr) + ' = ' + show(f(GE), 2) + ' N.', hint: 'Work done by the push = PE gained + energy lost to friction.', meta: { m: m, h: h, L: L, fr: fr } });
  });
});
T('CH-T9', 'chal', 75, 'Efficiency of a whole power plant', function () {
  return tryGen('CH-T9', function () {
    const a = pick([70, 80, 85, 90]), b = pick([30, 35, 40, 45]), c = pick([92, 95, 98]), tot = a * b * c / 10000;
    return numQ({ n: 2, unit: '%', right: tot,
      prompt: 'In a power plant, the boiler is ' + a + '% efficient at turning fuel energy into steam energy, the turbine is ' + b + '% efficient at turning steam energy into mechanical energy, and the generator is ' + c + '% efficient at turning mechanical energy into electrical energy. What is the efficiency of the whole plant?',
      wrongs: [[(a + b + c) / 3, 'Do not average the stages. Each stage only gets what is left over from the stage before it, so the efficiencies multiply.'], [Math.min(a, b, c), 'The whole plant is worse than its worst stage, because the losses stack up.'], [Math.max(a, b, c), 'The whole plant cannot be better than its best stage. The losses stack up, so the efficiency is much lower.']],
      explain: 'The efficiencies multiply: ' + a + '% × ' + b + '% × ' + c + '% = 0.' + a + ' × 0.' + b + ' × 0.' + c + ' = ' + fmt(tot / 100, 2) + ', which is ' + show(tot, 2) + '%.', hint: 'Each stage works on the energy that the previous stage delivered. Multiply the decimal efficiencies.', meta: { a: a, b: b, c: c } });
  });
});
T('CH-T10', 'chal', 75, 'Fuel needed by an engine', function () {
  return tryGen('CH-T10', function () {
    const out = pick([2.3e6, 4.6e6, 6.9e6, 9.2e6, 2.3e7, 4.6e7]), E = 4.6e7, k = out / (0.25 * E);
    return numQ({ n: 2, unit: ' kg', right: k,
      prompt: 'Gasoline releases about 4.6 × 10<sup>7</sup> J of energy per kilogram. A car engine that is 25% efficient must deliver ' + sci(out, 2) + ' J of useful energy to the wheels. How many kilograms of gasoline does it burn?',
      wrongs: [[out / E, 'This assumes a 100% efficient engine. A 25% efficient engine burns four times as much.'], [out * 0.25 / E, 'The engine uses MORE fuel energy than the useful output, not less. Divide by 0.25.'], [out / (E * 0.75), 'Use the efficiency (25%), not the wasted fraction (75%).']],
      explain: 'Fuel energy needed = useful energy ÷ efficiency = ' + sci(out, 2) + ' ÷ 0.25 = ' + sci(out / 0.25, 2) + ' J. Mass = energy ÷ (energy per kg) = ' + show(k, 2) + ' kg.', hint: 'First find the total fuel energy (useful ÷ efficiency). Then divide by the energy in one kilogram of gasoline.', meta: { k: k } });
  });
});
T('CH-T11', 'chal', 70, 'LED versus old-style bulb', function () {
  return tryGen('CH-T11', function () {
    const P1 = pick([40, 60, 75, 100]), e1 = pick([4, 5, 8, 10]), P2 = pick([5, 6, 8, 9, 10, 12]), light = P1 * e1 / 100, e2 = 100 * light / P2;
    if (e2 > 90) return null;
    return numQ({ n: 2, unit: '%', right: e2,
      prompt: 'An old-style bulb uses ' + P1 + ' W and is only ' + e1 + '% efficient at making light. An LED bulb gives the same amount of light using only ' + P2 + ' W. What is the efficiency of the LED bulb?',
      wrongs: [[e1, 'The LED makes the same light from less power, so it must be MORE efficient than the old bulb.'], [100 * P2 / P1, 'This compares the two input powers, not the light output to the LED’s own input.'], [100 - e2, 'This is the percent of the LED’s energy that is wasted.']],
      explain: 'Light output = ' + P1 + ' W × ' + e1 + '% = ' + fmt(light, 2) + ' W. The LED makes the same ' + fmt(light, 2) + ' W of light from ' + P2 + ' W, so efficiency = ' + fmt(light, 2) + ' ÷ ' + P2 + ' × 100 = ' + show(e2, 2) + '%.', hint: 'Find the light power the old bulb produces. The LED produces that same light output from a smaller input.', meta: { P1: P1, e1: e1, P2: P2 } });
  });
});
F('CH-F01', 'chal', 75, 'A solid ball rolls down a ramp without slipping, and a block slides down a frictionless ramp with the same height. Which reaches the bottom with the greater speed?', 'The sliding block, because the rolling ball puts some of its energy into spinning',
  [['The rolling ball, because it is round', 'Shape does not give extra energy. A rolling ball splits its energy between moving forward and spinning.'], ['They are the same, because both started with the same PE', 'The PE is the same, but the ball’s KE is shared between motion and rotation, so its forward speed is lower.'], ['The rolling ball, because friction pushes it along', 'The friction that keeps the ball from slipping does no net work on it. It just makes the ball spin.']],
  'm g h = ½ m v² for the block. For the ball the same m g h also has to pay for the spinning, so v is smaller.');
F('CH-F02', 'chal', 60, 'A car doubles its speed. Compared with the original, the distance it needs to stop with the same brakes becomes about', 'four times as long',
  [['twice as long', 'The KE grows with v², and friction does work f × d, so the distance grows with v².'], ['eight times as long', 'The KE grows with the square of the speed, not the cube.'], ['the same', 'A faster car has far more KE to remove.']],
  'KE is four times bigger and the friction is the same, so the stopping distance is four times longer.');
F('CH-F03', 'chal', 55, 'A hybrid car uses regenerative braking. What does it do with the car’s kinetic energy when you brake?', 'It turns some of the kinetic energy into electrical energy stored in the battery',
  [['It destroys the kinetic energy to stop the car', 'Energy cannot be destroyed. Ordinary brakes turn it into heat. Regenerative brakes save some of it.'], ['It turns the kinetic energy into potential energy of the car', 'The car does not rise. The energy is stored electrically.'], ['It turns all of it into sound', 'Brakes make some sound, but a small share. The rest becomes heat or stored energy.']],
  'The motor works like a generator while braking, so some KE is saved in the battery instead of wasted as heat.');
F('CH-F04', 'chal', 60, 'A typical car engine is only about 25% efficient. Where does most of the fuel’s energy go?', 'Into thermal energy carried away by the exhaust and the cooling system',
  [['Into sound that escapes through the tailpipe', 'There is some sound, but it is a very small share of the energy.'], ['Into the weight of the car', 'Energy does not turn into weight.'], ['It is destroyed during burning', 'Energy cannot be destroyed. It leaves as heat.']],
  'Most of the energy leaves as heat in the hot exhaust and the coolant, plus friction in the engine.');
F('CH-F05', 'chal', 70, 'Two identical balls start at the same height at the same moment. One is dropped. The other is thrown straight sideways. Ignoring air resistance, which has more kinetic energy just before landing?', 'The ball thrown sideways',
  [['The dropped ball', 'Both fall the same height, but the thrown ball also had energy of sideways motion at the start.'], ['They are the same, because they fell the same height', 'The same PE turns into KE, but the thrown ball started with extra KE.'], ['The dropped ball, because it falls straight down', 'A straight path does not give more energy.']],
  'Both gain the same KE from falling. The thrown ball also started with ½ m v² of sideways motion, so it ends with more.');
F('CH-F06', 'chal', 70, 'An astronaut jumps off the ground at the same launch speed on Earth and on the Moon, where g is about 1/6 as large. About how high does she go on the Moon compared with Earth?', 'About six times as high',
  [['About the same height', 'The launch KE is the same, but it has to become m g h. A smaller g means a bigger h.'], ['About one-sixth as high', 'It is the other way around. With weaker gravity the same KE lifts her much higher.'], ['About 36 times as high', 'Height is proportional to 1/g, not 1/g².']],
  '½ m v² = m g h, so h = v² ÷ (2 g). If g is 6 times smaller, h is 6 times bigger.');
F('CH-F07', 'chal', 65, 'A block slides across a rough floor and stops. What happens to its kinetic energy?', 'It is changed into thermal energy in the block and the floor',
  [['It is destroyed', 'Energy is never destroyed. It changes form.'], ['It becomes potential energy', 'The block did not rise, so there is no new PE.'], ['It goes back into the block as speed', 'Then the block would not stop.']],
  'Friction does work on the block and turns its KE into thermal energy.');
F('CH-F08', 'chal', 75, 'Two frictionless ramps rise to the same height. Ramp 1 is steep and short. Ramp 2 is gentle and long. A block is released from rest at the top of each. How do the speeds at the bottom compare?', 'They are the same',
  [['The block on the steep ramp is faster', 'It gets there sooner, but the speed depends only on the height: v = √(2 g h).'], ['The block on the gentle ramp is faster, because it travels farther', 'Traveling farther does not add energy. The PE lost is m g h for both.'], ['It depends on the mass of each block', 'The mass cancels in m g h = ½ m v².']],
  'Both blocks lose the same PE (same height), so both gain the same KE and end at the same speed. They only take different times.');
F('CH-F09', 'chal', 65, 'The kinetic energy of an object doubles while its mass stays the same. By what factor does its speed increase?', 'About 1.4 times (the square root of 2)',
  [['2 times', 'KE depends on v², so doubling the KE does not double the speed.'], ['4 times', 'That would multiply the KE by 16.'], ['The speed does not change', 'KE = ½ m v², and the mass is the same, so the speed must change.']],
  'KE ∝ v², so v ∝ √KE. √2 ≈ 1.4.');
