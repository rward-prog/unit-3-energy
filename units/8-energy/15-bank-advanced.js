'use strict';
/* ===== SUPER ADVANCED: high-school and college level. Tracked separately. IDs start with ADV- =====
   These go well past the test. Everything is built from the same ideas: energy conservation, the work-energy idea
   (net work = change in KE), and careful algebra. */
Object.assign(FAC, { 27: 'twenty-seven times as large', 64: 'sixty-four times as large', 81: 'eighty-one times as large', 0.0625: 'one-sixteenth as large' });
const GG = 6.67e-11, PLN = { Earth: { M: 5.98e24, R: 6.38e6 }, Moon: { M: 7.35e22, R: 1.74e6 } };

/* force-versus-position graph: constant F0 from 0 to x1, then a straight line down to 0 at x2 */
function forceGraph(F0, x1, x2) {
  const ox = 56, oy = 160, w = 270, hh = 120, xs = w / x2, ys = hh / F0;
  const X = x => ox + x * xs, Y = f => oy - f * ys;
  const label = 'A graph of force in newtons against position in meters. The force is ' + F0 + ' N from 0 to ' + x1 + ' m, then falls in a straight line to 0 N at ' + x2 + ' m.';
  return '<svg viewBox="0 0 360 200" width="100%" style="max-width:420px;color:inherit" role="img" aria-label="' + label + '"><title>' + label + '</title>' +
    '<polygon points="' + X(0) + ',' + Y(F0) + ' ' + X(x1) + ',' + Y(F0) + ' ' + X(x2) + ',' + Y(0) + ' ' + X(0) + ',' + Y(0) + '" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="2.5"/>' +
    '<line x1="' + ox + '" y1="' + (oy + 4) + '" x2="' + ox + '" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="' + (ox - 4) + '" y1="' + oy + '" x2="' + (ox + w + 6) + '" y2="' + oy + '" stroke="currentColor" stroke-width="1.5"/>' +
    '<g font-size="13" fill="currentColor"><text x="' + (ox - 8) + '" y="' + (Y(F0) + 4) + '" text-anchor="end">' + F0 + '</text><text x="' + (ox - 8) + '" y="' + (oy + 4) + '" text-anchor="end">0</text>' +
    '<text x="' + X(x1) + '" y="' + (oy + 17) + '" text-anchor="middle">' + x1 + '</text><text x="' + X(x2) + '" y="' + (oy + 17) + '" text-anchor="middle">' + x2 + '</text>' +
    '<text x="' + (ox + w / 2) + '" y="196" text-anchor="middle">Position (m)</text><text x="14" y="' + (oy - hh / 2) + '" text-anchor="middle" transform="rotate(-90 14 ' + (oy - hh / 2) + ')">Force (N)</text></g></svg>';
}
T('ADV-T1', 'adv', 80, 'Work from a force-versus-position graph', function () {
  return tryGen('ADV-T1', function () {
    const F0 = pick([20, 30, 40, 50, 60, 80]), x1 = pick([1, 2, 3, 4]), x2 = x1 + pick([2, 3, 4, 6]), W = F0 * x1 + 0.5 * F0 * (x2 - x1);
    return numQ({ n: 2, unit: ' J',  right: W,
      prompt: '<p>A pusher exerts a force on a cart that changes as the cart moves. The graph shows the force along the direction of motion. How much work does the pusher do from 0 m to ' + x2 + ' m?</p>' + forceGraph(F0, x1, x2),
      wrongs: [[F0 * x2, 'This treats the force as ' + F0 + ' N the whole way. The force drops, so the area is smaller than the full rectangle.'], [0.5 * F0 * x2, 'This is the area of a triangle only. The graph starts with a flat part, so there is a rectangle too.'], [F0 * x1, 'This is only the flat rectangle. The sloping part adds more area, and work is the TOTAL area under the graph.']],
      explain: 'Work is the area under a force-versus-position graph. Rectangle: ' + F0 + ' × ' + x1 + ' = ' + (F0 * x1) + ' J. Triangle: ½ × ' + F0 + ' × ' + (x2 - x1) + ' = ' + (0.5 * F0 * (x2 - x1)) + ' J. Total = ' + show(W, 2) + ' J.', hint: 'Split the area under the graph into a rectangle and a triangle, then add.', meta: { F0: F0, x1: x1, x2: x2 } });
  });
});
T('ADV-T2', 'adv', 70, 'Energy stored in a spring', function () {
  return tryGen('ADV-T2', function () {
    const k = pick([200, 400, 500, 800, 1000, 1500]), xc = pick([5, 8, 10, 12, 15, 20]), x = xc / 100;
    return numQ({ n: 2, unit: ' J', right: 0.5 * k * x * x,
      prompt: 'A spring with spring constant k = ' + k + ' N/m is compressed ' + xc + ' cm from its relaxed length. How much elastic potential energy is stored in it? (Use U = ½ k x².)',
      wrongs: [[0.5 * k * x, 'The compression must be squared: U = ½ k x².'], [k * x * x, 'This left out the ½: U = ½ k x².'], [0.5 * k * xc * xc, 'The compression must be in meters before you calculate. ' + xc + ' cm = ' + fmt(x, 2) + ' m.']],
      explain: 'Convert to meters: x = ' + fmt(x, 2) + ' m. U = ½ k x² = ½ (' + k + ')(' + fmt(x, 2) + ')² = ' + show(0.5 * k * x * x, 2) + ' J.', hint: 'Change centimeters to meters first. Then U = ½ k x² (square only the x).', meta: { k: k, x: x } });
  });
});
T('ADV-T3', 'adv', 75, 'Speed of a block launched by a spring', function () {
  return tryGen('ADV-T3', function () {
    const k = pick([200, 400, 500, 800, 1000]), x = pick([0.10, 0.15, 0.20, 0.25]), m = pick([0.5, 1.0, 2.0, 4.0]), v = x * Math.sqrt(k / m);
    return numQ({ n: 2, unit: ' m/s', right: v,
      prompt: 'A ' + fmt(m, 2) + ' kg block rests against a spring (k = ' + k + ' N/m) that is compressed ' + fmt(x, 2) + ' m on a frictionless table. The spring is released. How fast is the block moving when it leaves the spring?',
      wrongs: [[x * Math.sqrt(2 * k / m), 'The ½ on each side cancels: ½ k x² = ½ m v² gives v = x √(k ÷ m), with no extra 2.'], [k * x * x / m, 'This is v², not v. Take the square root.'], [Math.sqrt(k * x / m), 'The compression must be squared before dividing: v² = k x² ÷ m.']],
      explain: 'All of the spring energy becomes KE: ½ k x² = ½ m v². So v = x √(k ÷ m) = ' + fmt(x, 2) + ' × √(' + k + ' ÷ ' + fmt(m, 2) + ') = ' + show(v, 2) + ' m/s.', hint: 'Set ½ k x² (spring energy) equal to ½ m v² (kinetic energy) and solve for v.', meta: { k: k, x: x, m: m } });
  });
});
T('ADV-T4', 'adv', 92, 'Maximum compression after a drop onto a spring', function () {
  return tryGen('ADV-T4', function () {
    const m = pick([0.5, 1.0, 2.0]), k = pick([200, 400, 800, 1000]), H = pick([0.50, 1.0, 1.5, 2.0]);
    const f = gg => (m * gg + Math.sqrt(Math.pow(m * gg, 2) + 2 * k * m * gg * H)) / k;
    return numQ({ n: 2, unit: ' m', right: f(GE), gf: f,
      prompt: 'A ' + fmt(m, 2) + ' kg block is dropped from rest from a height of ' + fmt(H, 2) + ' m above the top of a vertical spring (k = ' + k + ' N/m). The block keeps falling while it compresses the spring. What is the maximum compression of the spring?',
      wrongs: [[Math.sqrt(2 * m * GE * H / k), 'This ignores the extra height the block falls while it is compressing the spring. The block loses gravitational PE over the whole distance H + x.'], [m * GE / k, 'This is the compression at which the spring force just balances the weight. The block is still moving then, so it keeps compressing.'], [(Math.sqrt(Math.pow(m * GE, 2) + 2 * k * m * GE * H) - m * GE) / k, 'This is a sign slip in the quadratic formula. The physical answer uses + m g in front of the square root: x = [m g + √(…)] ÷ k.']],
      explain: 'At maximum compression the block is momentarily at rest, so m g (H + x) = ½ k x². Rearranged: ½ k x² − m g x − m g H = 0. The quadratic formula gives x = [m g + √((m g)² + 2 k m g H)] ÷ k = ' + show(f(GE), 2) + ' m.', hint: 'The block loses PE over the total drop H + x. At the bottom it has stopped, so all of that PE is stored in the spring.', meta: { m: m, k: k, H: H } });
  });
});
T('ADV-T5', 'adv', 88, 'Loop-the-loop: smallest starting height', function () {
  return tryGen('ADV-T5', function () {
    const R = pick([2.0, 3.0, 4.0, 6.0, 8.0]);
    return numQ({ n: 2, unit: ' m', right: 2.5 * R,
      prompt: 'A cart is released from rest on a frictionless track and enters a vertical circular loop of radius ' + d2(R) + ' m. What is the smallest release height, measured from the bottom of the loop, that lets the cart stay on the track at the very top of the loop?',
      wrongs: [[2 * R, 'A height of 2R only lets the cart reach the top with zero speed. At the top it needs enough speed to keep moving in a circle, so it needs more KE.'], [3 * R, 'This gives more speed at the top than the minimum. At the minimum, the weight alone supplies the centripetal force: v² = g R.'], [1.5 * R, 'The top of the loop is 2R above the bottom, so the cart must start higher than 2R.']],
      explain: 'At the top, the weight alone must supply the centripetal force: m g = m v² ÷ R, so v² = g R. Energy conservation from the release point to the top: m g h = m g (2R) + ½ m v² = m g (2R) + ½ m g R. So h = 2.5 R = ' + show(2.5 * R, 2) + ' m.', hint: 'Two steps: (1) the slowest speed at the top is where gravity alone gives the circular motion, v² = g R. (2) Conserve energy between the start and the top.', meta: { R: R } });
  });
});
T('ADV-T6', 'adv', 85, 'Escape speed', function () {
  return tryGen('ADV-T6', function () {
    const pn = pick(['Earth', 'Moon']), M = PLN[pn].M, R = PLN[pn].R, v = Math.sqrt(2 * GG * M / R);
    return numQ({ n: 3, unit: ' m/s', right: v,
      prompt: '<p>The escape speed is the minimum launch speed that lets an object coast away from a planet and never fall back (ignore air). It is the speed where the KE at launch equals the energy needed to get infinitely far away.</p><p>Use G = 6.67 × 10<sup>−11</sup> N·m²/kg², and for the ' + pn + ' use M = ' + sci(M, 3) + ' kg and R = ' + sci(R, 3) + ' m. What is the escape speed from the surface of the ' + pn + '?</p>',
      wrongs: [[Math.sqrt(GG * M / R), 'This is the speed of a low circular orbit. Escape needs more: ½ m v² = G M m ÷ R gives v = √(2 G M ÷ R), with the 2.'], [2 * GG * M / R, 'This is v², not v. Take the square root.'], [GG * M / R, 'This is missing the 2 and the square root. ½ v² = G M ÷ R gives v = √(2 G M ÷ R).']],
      explain: 'To escape, KE at launch must equal the energy G M m ÷ R needed to reach infinity: ½ m v² = G M m ÷ R. So v = √(2 G M ÷ R) = ' + show(v, 3) + ' m/s. The mass m cancels.', hint: 'Set ½ m v² equal to G M m ÷ R and solve for v. The m cancels.', meta: { pn: pn } });
  });
});
T('ADV-T7', 'adv', 82, 'Energy needed to escape from Earth', function () {
  return tryGen('ADV-T7', function () {
    const m = pick([100, 500, 1000, 2000, 5000]), M = PLN.Earth.M, R = PLN.Earth.R, E = GG * M * m / R;
    return numQ({ n: 3, unit: ' J', right: E,
      prompt: 'How much energy must be given to a ' + m + ' kg satellite at Earth’s surface so that it can just escape Earth’s gravity? Use E = G M m ÷ R with G = 6.67 × 10<sup>−11</sup> N·m²/kg², M = 5.98 × 10<sup>24</sup> kg, and R = 6.38 × 10<sup>6</sup> m.',
      wrongs: [[2 * E, 'This is twice the energy needed. The energy to escape from a distance R is G M m ÷ R.'], [E / 2, 'This is the KE of a satellite in a low circular orbit. Escaping needs twice that.'], [GG * M * m / (R * R), 'This is the force of gravity in newtons, not an energy in joules.']],
      explain: 'E = G M m ÷ R = (6.67 × 10⁻¹¹)(5.98 × 10²⁴)(' + m + ') ÷ (6.38 × 10⁶) = ' + show(E, 3) + ' J.', hint: 'The energy needed is G M m ÷ R. Multiply carefully and keep track of the powers of ten.', meta: { m: m } });
  });
});
T('ADV-T8', 'adv', 70, 'Power from force and speed', function () {
  return tryGen('ADV-T8', function () {
    const F = pick([300, 500, 600, 800, 1200, 1500]), v = pick([10, 15, 20, 25, 30]);
    return numQ({ n: 2, unit: ' W', right: F * v,
      prompt: 'A car travels at a constant ' + d2(v) + ' m/s on a level road. Air resistance and friction add up to a force of ' + d2(F) + ' N against it. What power must the engine deliver to the wheels to keep that speed?',
      wrongs: [[F / v, 'Power = force × speed. Dividing gives the wrong quantity.'], [F * v / 2, 'The ½ is part of kinetic energy, not power. Power = F × v.'], [F * v * v, 'Power uses one factor of the speed: P = F v. Squaring the speed is a kinetic-energy habit.']],
      explain: 'Power = work ÷ time = (F × d) ÷ t = F × (d ÷ t) = F v = (' + d2(F) + ' N)(' + d2(v) + ' m/s) = ' + show(F * v, 2) + ' W. To cruise at a steady speed the engine force equals the resisting force.', hint: 'P = W ÷ t and W = F d, so P = F (d ÷ t).', meta: { F: F, v: v } });
  });
});
T('ADV-T9', 'adv', 78, 'Air drag: how power grows with speed', function () {
  const cases = [
    { c: 'doubles', f: 8, w: [2, 4, 16] }, { c: 'triples', f: 27, w: [3, 9, 81] }, { c: 'is cut in half', f: 0.125, w: [0.5, 0.25, 0.0625] }, { c: 'quadruples', f: 64, w: [4, 16, 8] }
  ];
  const k = pick(cases), exp = { 2: 'twice', 3: 'three times', 0.5: 'half', 4: 'four times' };
  const why = f => f === k.f ? '' : 'Drag force grows with v², and power = force × speed, so power grows with v³. Check: the factor for this change is ' + facText(k.f) + '.';
  return { prompt: 'At highway speeds, the air drag force on a car is proportional to the square of its speed. The car keeps a steady speed. If the car’s speed ' + k.c + ', by what factor does the engine power needed to overcome drag change?',
    right: 'The power becomes ' + facText(k.f), wrongs: k.w.map(f => ['The power becomes ' + facText(f), why(f)]),
    explain: 'Drag ∝ v² and P = F v, so P ∝ v² × v = v³. When the speed ' + k.c + ', the power becomes ' + facText(k.f) + '.', hint: 'Power = force × speed. If force ∝ v², what is the power proportional to?', meta: { f: k.f } };
});
T('ADV-T10', 'adv', 95, 'Ballistic pendulum', function () {
  return tryGen('ADV-T10', function () {
    const m = pick([0.010, 0.020, 0.050]), M = pick([1.0, 2.0, 3.0]), h = pick([0.050, 0.10, 0.20]), f = gg => (m + M) / m * Math.sqrt(2 * gg * h);
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: '<p>A ' + fmt(m, 2) + ' kg bullet is fired into a ' + fmt(M, 2) + ' kg wooden block hanging from strings. The bullet stays embedded in the block, and the block swings up a vertical height of ' + fmt(h, 2) + ' m. How fast was the bullet moving before it hit the block?</p><p>Hints: during the collision, momentum (mass × velocity) is conserved. After the collision, mechanical energy is conserved. Mechanical energy is NOT conserved during the collision itself.</p>',
      wrongs: [[Math.sqrt(2 * GE * h), 'This is the speed of the block and bullet together, just after the collision. Momentum conservation connects it to the bullet’s speed.'], [Math.sqrt((m + M) / m) * Math.sqrt(2 * GE * h), 'This treats the collision as energy-conserving. The collision loses KE (the bullet stops inside the block), so use momentum instead.'], [m / (m + M) * Math.sqrt(2 * GE * h), 'The ratio is upside down. The bullet is much lighter than the block, so it must be much faster.']],
      explain: 'Swing: ½ (m + M) V² = (m + M) g h, so V = √(2 g h) = ' + show(Math.sqrt(2 * GE * h), 3) + ' m/s just after the collision. Collision: m v = (m + M) V, so v = (m + M) V ÷ m = ' + show(f(GE), 2) + ' m/s.', hint: 'Work backward: (1) find the speed of block + bullet right after impact from the swing height. (2) Use momentum conservation in the collision.', meta: { m: m, M: M, h: h } });
  });
});
T('ADV-T11', 'adv', 85, 'Kinetic energy lost when objects stick together', function () {
  return tryGen('ADV-T11', function () {
    const m = pick([1, 2, 3, 4]), M = pick([1, 2, 3, 4, 6]), lost = 100 * M / (m + M);
    return numQ({ n: 2, unit: '%', right: lost,
      prompt: 'A ' + m + ' kg cart moving at a steady speed hits a ' + M + ' kg cart at rest. The carts stick together and move off as one. What percent of the original kinetic energy is lost? (Momentum is conserved in the collision.)',
      wrongs: [[100 * m / (m + M), 'This is the percent of the KE that REMAINS, not the percent lost.'], [50, 'Half is lost only when the two masses are equal. Here the masses are different.'], [100 * M / m, 'This is more than the total in some cases. Use the momentum equation to find the final speed first.']],
      explain: 'Momentum: m v = (m + M) V, so V = m v ÷ (m + M). Final KE ÷ initial KE = ½ (m + M) V² ÷ ½ m v² = m ÷ (m + M). The fraction lost is M ÷ (m + M) = ' + M + ' ÷ ' + (m + M) + ', which is ' + show(lost, 2) + '%.', hint: 'Use momentum conservation to find V, then compare ½ (m + M) V² with ½ m v².', meta: { m: m, M: M } });
  });
});
T('ADV-T12', 'adv', 72, 'Skid distance with friction', function () {
  return tryGen('ADV-T12', function () {
    const mu = pick([0.50, 0.60, 0.70, 0.80]), v = pick([15, 20, 25, 30]), f = gg => v * v / (2 * mu * gg);
    return numQ({ n: 2, unit: ' m', right: f(GE), gf: f,
      prompt: 'A car locks its brakes at ' + d2(v) + ' m/s on a level road where the coefficient of kinetic friction is μ = ' + fmt(mu, 2) + '. How far does it skid before stopping?',
      wrongs: [[v * v / (mu * GE), 'This left out the 2. Friction does work μ m g d = ½ m v², so d = v² ÷ (2 μ g).'], [v * v / (2 * mu), 'This left out g. The friction force is μ m g.'], [v / (2 * mu * GE), 'The speed must be squared: d = v² ÷ (2 μ g).']],
      explain: 'The friction force is μ m g and it does work μ m g d to remove the KE: μ m g d = ½ m v². So d = v² ÷ (2 μ g) = ' + d2(v) + '² ÷ (2 × ' + fmt(mu, 2) + ' × 9.8) = ' + show(f(GE), 2) + ' m. The mass cancels.', hint: 'The work done by friction (μ m g × d) must equal the starting KE (½ m v²).', meta: { mu: mu, v: v } });
  });
});
T('ADV-T13', 'adv', 93, 'Sliding down an incline with friction', function () {
  return tryGen('ADV-T13', function () {
    const m = pick([2.0, 4.0, 5.0]), th = pick([30, 40, 45, 60]), mu = pick([0.10, 0.20, 0.30]), L = pick([3.0, 4.0, 5.0, 8.0]), s = Math.sin(th * Math.PI / 180), c = Math.cos(th * Math.PI / 180);
    if (s - mu * c < 0.25) return null;
    const f = gg => Math.sqrt(2 * gg * L * (s - mu * c));
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: 'A ' + fmt(m, 2) + ' kg block slides from rest down a ' + d2(L) + ' m long incline tilted at ' + th + '° above the horizontal. The coefficient of kinetic friction is μ = ' + fmt(mu, 2) + '. How fast is it moving at the bottom? (The normal force is m g cos θ, and the friction force is μ times the normal force.)',
      wrongs: [[Math.sqrt(2 * GE * L * s), 'This ignores friction. Friction does work μ m g cos θ × L and removes energy.'], [Math.sqrt(2 * GE * L * (s + mu * c)), 'Friction takes energy away. It should be sin θ − μ cos θ, not plus.'], [Math.sqrt(2 * GE * L * (s - mu)), 'The friction force is μ times the NORMAL force, which is m g cos θ, so the term is μ cos θ.']],
      explain: 'Height dropped = L sin θ. Friction force = μ m g cos θ, over distance L. Energy: m g L sin θ − μ m g cos θ × L = ½ m v². The mass cancels: v = √(2 g L (sin θ − μ cos θ)) = ' + show(f(GE), 2) + ' m/s.', hint: 'Work done by gravity = m g (L sin θ). Work done by friction = μ m g cos θ × L, taken away. The rest is KE.', meta: { th: th, mu: mu, L: L } });
  });
});
T('ADV-T14', 'adv', 94, 'A solid sphere rolling down a ramp', function () {
  return tryGen('ADV-T14', function () {
    const h = pick([0.50, 1.0, 1.5, 2.0, 3.0]), f = gg => Math.sqrt(10 * gg * h / 7);
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: 'A solid sphere (rotational inertia I = (2/5) m r²) starts from rest and rolls without slipping down a ramp, dropping ' + fmt(h, 2) + ' m. Its total kinetic energy is ½ m v² + ½ I ω², with ω = v ÷ r. How fast is its center moving at the bottom?',
      wrongs: [[Math.sqrt(2 * GE * h), 'This is the speed of a sliding block with no friction. A rolling sphere also spins, so some of the energy goes into rotation and the forward speed is lower.'], [Math.sqrt(GE * h), 'This is the speed of a hoop, where all of the mass is at the rim. A solid sphere spins with less energy than that, so it is faster than this.'], [Math.sqrt(5 * GE * h / 7), 'This used g h ÷ 1.4 instead of 2 g h ÷ 1.4. The total KE is (7/10) m v², and it equals m g h, so v² = 10 g h ÷ 7.']],
      explain: 'KE = ½ m v² + ½ (2/5 m r²)(v ÷ r)² = ½ m v² + (1/5) m v² = (7/10) m v². Setting (7/10) m v² = m g h gives v = √(10 g h ÷ 7) = ' + show(f(GE), 2) + ' m/s, less than the sliding speed √(2 g h).', hint: 'Add the rotational KE to the forward KE. The ω = v ÷ r makes the r cancel.', meta: { h: h } });
  });
});
T('ADV-T15', 'adv', 82, 'Power from a hydroelectric dam', function () {
  return tryGen('ADV-T15', function () {
    const Q = pick([20, 50, 100, 200]), h = pick([30, 50, 80, 100]), e = pick([80, 85, 90, 92]), f = gg => e / 100 * 1000 * Q * gg * h;
    const mw = x => show(x / 1e6, 2);
    return numQ({ n: 2, unit: ' MW', fmtf: mw, right: f(GE), gf: x => f(x) / 1e6,
      prompt: 'Water (density 1000 kg/m³) flows through the turbines of a dam at ' + Q + ' m³ each second. It falls through a height of ' + h + ' m. The plant is ' + e + '% efficient at turning the water’s lost potential energy into electrical energy. What electrical power does it produce? (1 MW = 10<sup>6</sup> W)',
      wrongs: [[1000 * Q * GE * h, 'This is the power of the falling water. The plant is only ' + e + '% efficient, so the electrical output is smaller.'], [e / 100 * 1000 * Q * h, 'This left out g. The water loses PE = m g h each second.'], [e / 100 * Q * GE * h, 'This left out the density. The mass of the water each second is density × volume = 1000 × ' + Q + ' kg.']],
      explain: 'Mass per second = 1000 × ' + Q + ' = ' + (1000 * Q) + ' kg/s. Power of the falling water = (mass per second) g h = ' + show(1000 * Q * GE * h / 1e6, 3) + ' MW. Times the efficiency ' + fmt(e / 100, 2) + ' gives ' + show(f(GE) / 1e6, 2) + ' MW.', hint: 'Mass per second = density × volume per second. Then power = (mass per second) × g × h × efficiency.', meta: { Q: Q, h: h, e: e } });
  });
});
T('ADV-T16', 'adv', 80, 'Energy to speed up from a moving start', function () {
  return tryGen('ADV-T16', function () {
    const m = pick([1000, 1200, 1500]), v1 = pick([10, 15, 20]), v2 = pick([25, 30, 35]), W = 0.5 * m * (v2 * v2 - v1 * v1);
    return numQ({ n: 2, unit: ' J', right: W,
      prompt: 'A ' + m + ' kg car speeds up from ' + v1 + ' m/s to ' + v2 + ' m/s. How much net work must be done on it?',
      wrongs: [[0.5 * m * Math.pow(v2 - v1, 2), 'KE depends on v², so the change in KE is ½ m (v₂² − v₁²), not ½ m (v₂ − v₁)².'], [0.5 * m * v2 * v2, 'This is the final KE. The car already had KE at ' + v1 + ' m/s, so only the difference needs to be supplied.'], [0.5 * m * Math.pow(v2 + v1, 2), 'This is not a change in anything. Work = ΔKE = final KE − initial KE.']],
      explain: 'Net work = change in KE = ½ m v₂² − ½ m v₁² = ½ (' + m + ')(' + v2 + '² − ' + v1 + '²) = ' + show(W, 2) + ' J.', hint: 'Net work equals final KE minus initial KE. Square each speed first, then subtract.', meta: { m: m, v1: v1, v2: v2 } });
  });
});
T('ADV-T17', 'adv', 85, 'Speed at the bottom of a pendulum swing', function () {
  return tryGen('ADV-T17', function () {
    const L = pick([1.0, 1.5, 2.0, 2.5]), th = pick([35, 40, 50, 55]), c = Math.cos(th * Math.PI / 180), f = gg => Math.sqrt(2 * gg * L * (1 - c));
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: 'A pendulum bob on a ' + fmt(L, 2) + ' m string is pulled aside until the string makes a ' + th + '° angle with the vertical, then released from rest. How fast is the bob moving at the bottom of its swing?',
      wrongs: [[Math.sqrt(2 * GE * L), 'The bob does not fall the full length of the string. It falls only L (1 − cos θ).'], [Math.sqrt(2 * GE * L * c), 'The height dropped is L (1 − cos θ), not L cos θ. L cos θ is the height of the bob BELOW the pivot at the start.'], [Math.sqrt(2 * GE * L * Math.sin(th * Math.PI / 180)), 'The vertical drop is L (1 − cos θ), not L sin θ. L sin θ is the sideways displacement.']],
      explain: 'At the start the bob is L cos θ below the pivot, and at the bottom it is L below the pivot, so it falls h = L (1 − cos θ). Then ½ m v² = m g h gives v = √(2 g L (1 − cos θ)) = ' + show(f(GE), 2) + ' m/s.', hint: 'Draw the picture. The bob falls from L cos θ below the pivot to L below it. What is the drop?', meta: { L: L, th: th } });
  });
});
T('ADV-T18', 'adv', 88, 'A hanging mass pulls a block along a table', function () {
  return tryGen('ADV-T18', function () {
    const m1 = pick([2.0, 3.0, 4.0, 5.0]), m2 = pick([1.0, 2.0, 3.0]), d = pick([0.50, 1.0, 1.5, 2.0]), f = gg => Math.sqrt(2 * m2 * gg * d / (m1 + m2));
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: 'A ' + fmt(m1, 2) + ' kg block sits on a frictionless table. A string runs over a light, frictionless pulley at the edge to a ' + fmt(m2, 2) + ' kg mass that hangs below. The system is released from rest. How fast are the masses moving after the hanging mass has dropped ' + fmt(d, 2) + ' m?',
      wrongs: [[Math.sqrt(2 * GE * d), 'This is the speed of a freely falling object. Here the falling mass also has to pull the block along, so both masses share the energy.'], [Math.sqrt(2 * m2 * GE * d / m1), 'The KE belongs to BOTH masses, so the denominator should be m₁ + m₂.'], [Math.sqrt(m2 * GE * d / (m1 + m2)), 'This left out the 2. m₂ g d = ½ (m₁ + m₂) v² gives v² = 2 m₂ g d ÷ (m₁ + m₂).']],
      explain: 'The hanging mass loses PE = m₂ g d. That energy becomes KE of both masses, which move at the same speed: m₂ g d = ½ (m₁ + m₂) v². So v = √(2 m₂ g d ÷ (m₁ + m₂)) = ' + show(f(GE), 2) + ' m/s.', hint: 'Energy lost by the hanging mass (m₂ g d) goes into the KE of both masses together.', meta: { m1: m1, m2: m2, d: d } });
  });
});
T('ADV-T19', 'adv', 90, 'The best possible engine (Carnot limit)', function () {
  return tryGen('ADV-T19', function () {
    const Tc = pick([20, 30, 50, 100]), Th = pick([300, 400, 500, 600]), eff = 100 * (1 - (Tc + 273) / (Th + 273));
    return numQ({ n: 2, unit: '%', right: eff,
      prompt: 'The maximum possible efficiency of any heat engine is 1 − T<sub>cold</sub> ÷ T<sub>hot</sub>, where both temperatures must be in kelvins (K = °C + 273). An engine takes in heat at ' + Th + ' °C and gives off waste heat at ' + Tc + ' °C. What is its maximum possible efficiency?',
      wrongs: [[100 * (1 - Tc / Th), 'The formula needs kelvins, not °C. Add 273 to each temperature first.'], [100 * (Tc + 273) / (Th + 273), 'This is T<sub>cold</sub> ÷ T<sub>hot</sub>, the fraction of heat that must be wasted. The efficiency is 1 minus that.'], [100 * (1 - Tc / (Th + 273)), 'Both temperatures must be converted to kelvins, not just one.']],
      explain: 'T<sub>cold</sub> = ' + Tc + ' + 273 = ' + (Tc + 273) + ' K and T<sub>hot</sub> = ' + Th + ' + 273 = ' + (Th + 273) + ' K. Efficiency = 1 − ' + (Tc + 273) + ' ÷ ' + (Th + 273) + ' = ' + fmt(eff / 100, 2) + ', or ' + show(eff, 2) + '%. No real engine can beat this.', hint: 'Convert both temperatures to kelvins before you divide.', meta: { Tc: Tc, Th: Th } });
  });
});
T('ADV-T20', 'adv', 80, 'Energy from converting mass: E = mc²', function () {
  return tryGen('ADV-T20', function () {
    const g = pick([0.5, 1.0, 2.0, 5.0]), m = g / 1000, E = m * 9e16;
    return numQ({ n: 2, unit: ' J', right: E,
      prompt: 'Einstein’s equation is E = m c², where c = 3.0 × 10<sup>8</sup> m/s. How much energy is released if ' + fmt(g, 2) + ' g of mass is completely converted into energy?',
      wrongs: [[g * 9e16, 'The mass must be in kilograms. ' + fmt(g, 2) + ' g = ' + fmt(m, 2) + ' kg, so this answer is 1000 times too big.'], [0.5 * m * 9e16, 'The ½ belongs to kinetic energy. Einstein’s equation is E = m c².'], [m * 3e8, 'The speed of light must be squared: E = m c².']],
      explain: 'm = ' + fmt(g, 2) + ' g = ' + fmt(m, 2) + ' kg. E = m c² = (' + fmt(m, 2) + ')(3.0 × 10⁸)² = ' + show(E, 2) + ' J.', hint: 'Convert grams to kilograms first, then square c.', meta: { g: g } });
  });
});
T('ADV-T21', 'adv', 70, 'Kilowatt-hours to joules', function () {
  return tryGen('ADV-T21', function () {
    const P = pick([0.50, 0.80, 1.2, 1.5, 2.0]), hr = pick([0.50, 1.0, 2.0, 3.0]), E = P * 1000 * hr * 3600;
    return numQ({ n: 2, unit: ' J', right: E,
      prompt: 'A ' + fmt(P, 2) + ' kW heater runs for ' + fmt(hr, 2) + ' hours. How much energy does it use, in joules?',
      wrongs: [[P * 1000 * hr, 'This is in watt-hours, not joules. 1 hour = 3600 s, and joules need seconds.'], [P * 1000 * hr * 60, 'This used minutes. A joule is a watt-SECOND, so convert hours to 3600 seconds.'], [P * hr * 3600, 'The power must be in watts first: ' + fmt(P, 2) + ' kW = ' + fmt(P * 1000, 2) + ' W.']],
      explain: 'P = ' + fmt(P * 1000, 2) + ' W and t = ' + fmt(hr, 2) + ' h × 3600 s/h = ' + show(hr * 3600, 3) + ' s. E = P t = ' + show(E, 2) + ' J. (That is ' + fmt(P * hr, 2) + ' kWh.)', hint: 'Joules = watts × seconds. Convert kW to W and hours to seconds.', meta: { P: P, hr: hr } });
  });
});
T('ADV-T22', 'adv', 88, 'Fuel needed to speed up a car', function () {
  return tryGen('ADV-T22', function () {
    const m = pick([900, 1200, 1500]), v = pick([15, 20, 25, 30]), e = pick([0.20, 0.25, 0.30]), KE = 0.5 * m * v * v, grams = KE / (e * 4.6e7) * 1000;
    return numQ({ n: 2, unit: ' g', right: grams,
      prompt: 'A ' + m + ' kg car accelerates from rest to ' + v + ' m/s. The engine is ' + Math.round(e * 100) + '% efficient, and gasoline contains 4.6 × 10<sup>7</sup> J per kilogram. How many grams of gasoline does it take to supply the car’s kinetic energy? (Ignore air resistance and friction.)',
      wrongs: [[KE / 4.6e7 * 1000, 'This assumes a 100% efficient engine. Real engines need much more fuel than the useful energy.'], [m * v * v / (e * 4.6e7) * 1000, 'This left out the ½ in KE = ½ m v².'], [KE * e / 4.6e7 * 1000, 'The engine needs MORE fuel energy than the useful output, so divide by the efficiency.']],
      explain: 'KE = ½ m v² = ' + show(KE, 3) + ' J. Fuel energy = KE ÷ efficiency = ' + show(KE / e, 3) + ' J. Mass of gasoline = ' + show(KE / e, 3) + ' ÷ (4.6 × 10⁷ J/kg) = ' + show(grams / 1000, 2) + ' kg = ' + show(grams, 2) + ' g.', hint: 'Find the KE first. Divide by the efficiency to get the fuel energy. Then divide by the energy in each kilogram of fuel.', meta: { m: m, v: v, e: e } });
  });
});
T('ADV-T23', 'adv', 85, 'Extra work to stretch a spring that is already stretched', function () {
  return tryGen('ADV-T23', function () {
    const k = pick([100, 200, 400, 500]), x1 = pick([0.050, 0.10, 0.20]), x2 = pick([0.20, 0.30, 0.40]);
    if (x2 <= x1 * 1.4) return null;
    const W = 0.5 * k * (x2 * x2 - x1 * x1);
    return numQ({ n: 2, unit: ' J', right: W,
      prompt: 'A spring with k = ' + k + ' N/m is already stretched ' + fmt(x1, 2) + ' m. How much additional work is needed to stretch it to ' + fmt(x2, 2) + ' m?',
      wrongs: [[0.5 * k * Math.pow(x2 - x1, 2), 'Spring energy depends on x², so the energy change is ½ k (x₂² − x₁²), not ½ k (x₂ − x₁)².'], [0.5 * k * x2 * x2, 'This is the total energy stored at ' + fmt(x2, 2) + ' m. The spring already held some at ' + fmt(x1, 2) + ' m, so subtract it.'], [k * (x2 - x1), 'This treats the force as constant at k times the extra stretch. The force keeps growing as the spring stretches, so use the energy: ½ k (x₂² − x₁²).']],
      explain: 'Extra work = U₂ − U₁ = ½ k x₂² − ½ k x₁² = ½ (' + k + ')(' + fmt(x2, 2) + '² − ' + fmt(x1, 2) + '²) = ' + show(W, 2) + ' J.', hint: 'Find the spring energy at each stretch and subtract. Square the stretch before you subtract.', meta: { k: k, x1: x1, x2: x2 } });
  });
});
F('ADV-F01', 'adv', 78, 'A 2.0 kg ball is lowered 3.0 m vertically in one trip and 3.0 m vertically in another trip along a long, winding frictionless slide. How does the work done by gravity compare in the two trips?', 'It is the same in both: m g × (vertical drop) = 59 J, no matter what path is taken',
  [['It is greater for the long winding slide because the path is longer', 'Gravity is a conservative force. The work depends only on the vertical drop, not on the path length.'], ['It is greater for the vertical drop because the ball is moving straight down', 'Both have the same vertical drop. The work done by gravity depends only on that.'], ['It is zero for the winding slide because the force is not always along the path', 'Gravity does positive work on the parts going downhill and negative work on parts going uphill. The net is m g × (net drop).']],
  'Gravity is a conservative force: the work it does depends only on the start and end heights. W = m g Δh = (2.0)(9.8)(3.0) = 59 J.');
F('ADV-F02', 'adv', 75, 'A 2.0 kg object speeds up from 3.0 m/s to 5.0 m/s. What is the net work done on it?', '16 J',
  [['4.0 J', 'This is ½ m (v₂ − v₁)². Work = ΔKE = ½ m (v₂² − v₁²).'], ['34 J', 'This is ½ m (v₂² + v₁²). Work is the DIFFERENCE in KE, not the sum.'], ['25 J', 'This is the final KE of ½ m v₂². The object already had some KE, so subtract it.']],
  'Work–energy theorem: net work = ΔKE = ½ (2.0)(5.0² − 3.0²) = 16 J.');
F('ADV-F03', 'adv', 85, 'A ball on a string moves in a horizontal circle at a constant speed. The string pulls toward the center with tension T. How much work does the tension do on the ball in one full circle?', 'Zero, because the force is always perpendicular to the ball’s motion',
  [['A positive amount, because the force is not zero', 'Work needs force in the direction of the motion. The tension points to the center, while the motion is along the circle.'], ['A negative amount, because the ball keeps turning', 'The force is perpendicular to the motion at every instant, so no work is done, positive or negative.'], ['T times the circumference', 'This would only be right if the force were along the path. It is perpendicular to it.']],
  'W = F d cos θ with θ = 90° gives zero. That is why the ball’s speed and KE stay constant.');
F('ADV-F04', 'adv', 92, 'A satellite moves in a circular orbit. Compared with its kinetic energy, its total energy (KE + gravitational PE, with PE = 0 at infinity) is', 'equal in size but negative: total energy = −KE',
  [['twice the kinetic energy and positive', 'Gravitational PE is negative, and it is twice as large in size as the KE. The total is negative.'], ['equal to the kinetic energy and positive', 'The negative PE (−2 KE) makes the total −KE, which is less than zero.'], ['zero', 'A total of zero means the satellite is just barely able to escape. A satellite in orbit is bound, so its total is negative.']],
  'In a circular orbit KE = G M m ÷ 2r and PE = −G M m ÷ r, so E = KE + PE = −G M m ÷ 2r = −KE. A negative total means the satellite is bound to the planet.');
F('ADV-F05', 'adv', 55, 'A kilowatt-hour (kWh) is a unit of', 'energy, equal to 3.6 × 10⁶ J',
  [['power, equal to 1000 W', 'A kilowatt is a unit of power. A kilowatt-hour multiplies power by time, which makes energy.'], ['energy, equal to 1000 J', '1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J.'], ['power, equal to 3600 W', 'Power × time is energy, not power.']],
  '1 kWh = (1000 W)(3600 s) = 3.6 × 10⁶ J. Electric companies sell energy by the kWh.');
F('ADV-F06', 'adv', 82, 'Two objects collide in an isolated system with no outside forces. Which statement is always true?', 'Total momentum is conserved. Kinetic energy is conserved only if the collision is elastic',
  [['Total kinetic energy is always conserved, and momentum is conserved only if the collision is elastic', 'It is the other way around. Momentum is always conserved when no outside force acts.'], ['Neither momentum nor kinetic energy is conserved', 'Momentum is always conserved in an isolated system.'], ['Both are conserved only if the objects stick together', 'When objects stick together, momentum is conserved but a lot of kinetic energy is lost.']],
  'Momentum is conserved in every isolated collision. KE is conserved only in elastic collisions, where no energy goes into heat, sound, or deformation.');
F('ADV-F07', 'adv', 70, 'A box slides along the floor and slows to a stop. What is the sign of the work done by the friction force on the box?', 'Negative, because the friction force points opposite the motion',
  [['Positive, because friction is a force', 'Work is positive only if the force has a component along the motion. Friction opposes it.'], ['Zero, because the final speed is zero', 'The work equals the change in KE, which is negative here, so it is not zero.'], ['Positive, because the box loses energy', 'Losing energy means NEGATIVE work was done on it.']],
  'W = F d cos 180° = −F d. By the work–energy theorem, W = ΔKE is negative as the box slows.');
F('ADV-F08', 'adv', 85, 'A moving ball makes a head-on elastic collision with an identical ball at rest. Right after the collision, what happens?', 'The first ball stops and the second ball moves off with the first ball’s original speed',
  [['Both balls move off at half the original speed', 'This conserves momentum, but the total KE would be cut in half. In an elastic collision KE must be conserved too.'], ['The two balls stick together and move off slowly', 'That would be an inelastic collision. Here the balls bounce.'], ['The first ball bounces back with the same speed and the second stays at rest', 'This does not conserve momentum.']],
  'Conserving both momentum and kinetic energy for equal masses gives a swap of velocities: the first ball stops and the second leaves with the first’s speed.');
F('ADV-F09', 'adv', 78, 'The escape speed from a planet depends on which of these?', 'The mass and radius of the planet, but not the mass of the escaping object',
  [['The mass of the escaping object and the mass of the planet', 'The mass of the escaping object cancels: ½ m v² = G M m ÷ R gives v = √(2 G M ÷ R).'], ['Only the radius of the planet', 'It also depends on the planet’s mass M.'], ['The direction the object is launched', 'Only the launch speed matters for escaping, not the direction, as long as the path does not run into the planet.']],
  'v = √(2 G M ÷ R). A feather and a rocket need the same launch speed to escape (ignoring air).');
F('ADV-F10', 'adv', 88, 'PE = m g h works well near Earth’s surface. Why does it become inaccurate for an object at a height comparable to Earth’s radius?', 'Because g gets weaker with distance, so the force is no longer constant over the climb',
  [['Because mass changes with height', 'Mass does not change with height. The pull of gravity does.'], ['Because the object’s KE changes with height', 'KE is a separate quantity. The problem is that g is not constant.'], ['Because energy is not conserved in space', 'Energy is conserved everywhere. The simple formula just assumes a constant g.']],
  'The correct gravitational PE is −G M m ÷ r. The formula m g h assumes g is constant, which is only true when h is small compared with Earth’s radius.');
F('ADV-F11', 'adv', 92, 'The graph of an object’s potential energy U against position x has a steep downward slope at a certain point. What does that tell you about the force on the object there?', 'The force is large and points toward increasing x (the direction PE decreases)',
  [['The force is large and points toward decreasing x', 'The force points the direction that PE goes DOWN, which is toward increasing x here.'], ['The force is zero, because the object is at a steep point', 'The force is zero where the slope is zero (the bottom of a valley, or the top of a hill), not where the slope is steep.'], ['The force is small, because PE is changing slowly', 'A steep slope means PE changes quickly, so the force is large.']],
  'F = −dU/dx: the force is the negative of the slope of the PE curve. A steep downward slope means a large force toward increasing x.');
