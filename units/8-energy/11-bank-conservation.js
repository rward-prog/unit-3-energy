'use strict';
/* ===== Topic: Conservation of mechanical energy (IDs start with CON-) ===== */

/* A drawn track for the "ball rolls from A to G" questions. A is the highest start, C the lowest point, G a little lower than A. */
function rollTrack() {
  const pts = [['A', 30, 90], ['B', 90, 52], ['C', 150, 6], ['D', 210, 42], ['E', 270, 66], ['F', 330, 30], ['G', 400, 80]];
  const X = p => p[1], Y = p => 175 - p[2] * 1.5;
  let d = 'M ' + X(pts[0]) + ' ' + Y(pts[0]);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = X(p1) + (X(p2) - X(p0)) / 6, c1y = Y(p1) + (Y(p2) - Y(p0)) / 6, c2x = X(p2) - (X(p3) - X(p1)) / 6, c2y = Y(p2) - (Y(p3) - Y(p1)) / 6;
    d += ' C ' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ', ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ', ' + X(p2) + ' ' + Y(p2);
  }
  const dots = pts.map(p => '<circle cx="' + X(p) + '" cy="' + Y(p) + '" r="5" fill="currentColor"/><text x="' + X(p) + '" y="' + (Y(p) - 11) + '" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">' + p[0] + '</text>').join('');
  const label = 'A ball rolls along a curved track. The track passes through points A to G. A is the highest point where the ball starts, C is the lowest point, and G is a little lower than A.';
  return '<svg viewBox="0 0 440 190" width="100%" style="max-width:480px;color:inherit" role="img" aria-label="' + label + '"><title>' + label + '</title>' +
    '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="3"/><line x1="10" y1="182" x2="430" y2="182" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>' + dots + '</svg>';
}
const _TRACK_INTRO = '<p>A ball starts at rest at point A and rolls along the track to point G. Friction and air resistance are small but not zero.</p>' + rollTrack();
F('CON-F01', 'cons', 25, _TRACK_INTRO + '<p>At which point does the ball have the greatest kinetic energy?</p>', 'C',
  [['A', 'The ball starts at rest at A, so its KE is zero there. A is where the PE is greatest.'], ['E', 'E is high up, so much of the ball’s energy is stored there. KE is greatest at the lowest point.'], ['G', 'G is almost as high as A, so the ball is moving slowly there. KE is greatest at the lowest point.']],
  'The ball is lowest at C, so its PE is smallest and its KE is greatest.');
F('CON-F02', 'cons', 20, _TRACK_INTRO + '<p>At which point does the ball have the maximum potential energy?</p>', 'A',
  [['C', 'C is the lowest point, so the PE is the smallest.'], ['D', 'D is partway down, so it has less PE than A.'], ['G', 'G is a little lower than A, so it has slightly less PE.']],
  'PE depends on height. A is the highest point on the track.');
F('CON-F03', 'cons', 20, _TRACK_INTRO + '<p>At which point does the ball have the least potential energy?</p>', 'C',
  [['A', 'A is the highest point, so the PE is the greatest there.'], ['E', 'E is well above the lowest point.'], ['G', 'G is high on the track, close to A.']],
  'PE depends on height. C is the lowest point, so PE is the least.');
F('CON-F04', 'cons', 40, _TRACK_INTRO + '<p>Why is point G a little lower than point A? In other words, why can’t the ball go back up to the height where it started?</p>', 'Friction and air resistance changed some of the ball’s mechanical energy into thermal energy and sound',
  [['Gravity gets weaker as the ball moves to the right', 'Gravity is the same all along the track.'], ['The ball loses mass as it rolls', 'The ball’s mass stays the same. Its mechanical energy is what decreased.'], ['Energy is destroyed whenever a ball rolls downhill', 'Energy is never destroyed. It changes form, here into thermal energy and sound.']],
  'The ball can only rise as high as its remaining mechanical energy allows. Friction and air resistance turned some of it into thermal energy and sound, so G is lower than A.');
F('CON-F05', 'cons', 30, _TRACK_INTRO + '<p>At point D, which statement is true?</p>', 'The ball has both kinetic energy and potential energy',
  [['The ball has only kinetic energy', 'D is above the lowest point, so the ball also has stored (potential) energy.'], ['The ball has only potential energy', 'The ball is moving at D, so it has kinetic energy too.'], ['The ball has no mechanical energy', 'Mechanical energy is KE + PE, and the ball has both here.']],
  'At D the ball is moving and is above the lowest point, so it has kinetic energy and potential energy.');
F('CON-F06', 'cons', 15, 'Mechanical energy is', 'the sum of an object’s kinetic energy and potential energy',
  [['the energy stored in the bonds of a machine', 'That is chemical energy.'], ['only the kinetic energy of the parts of a machine', 'Mechanical energy includes potential energy too.'], ['the work a machine does in one second', 'That is power.']],
  'Total mechanical energy = KE + PE.');
F('CON-F07', 'cons', 15, 'A flowerpot falls from a windowsill toward the ground. Ignoring air resistance, what happens to its kinetic energy and its potential energy as it falls?', 'The kinetic energy increases and the potential energy decreases',
  [['The kinetic energy decreases and the potential energy increases', 'It is the other way around: the pot is losing height and gaining speed.'], ['Both increase', 'The pot is losing height, so its potential energy decreases.'], ['Both stay the same', 'The pot speeds up and loses height, so both change.']],
  'Falling lowers the pot (PE down) and speeds it up (KE up). The total stays about the same.');
F('CON-F08', 'cons', 25, 'A cart rolls from level ground up a long hill. Ignoring friction, what happens to its KE, its PE, and its total mechanical energy?', 'KE decreases, PE increases, and the total mechanical energy stays the same',
  [['KE increases, PE decreases, and the total stays the same', 'That is what happens going down the hill. Going up, the cart slows down and gains height.'], ['KE decreases, PE increases, and the total increases', 'The energy only changes form. With no friction the total stays constant.'], ['KE and PE both decrease', 'Climbing raises the cart, so its PE increases.']],
  'Climbing trades KE for PE. With no friction, KE + PE does not change.');
F('CON-F09', 'cons', 25, 'Which equation states that mechanical energy is conserved?', 'PEᵢ + KEᵢ = PEf + KEf',
  [['PEᵢ − KEᵢ = PEf − KEf', 'The total is the SUM of PE and KE, not the difference.'], ['PEᵢ = KEf only, always', 'This is only true when all of the energy starts as PE and ends as KE. In general the sums are equal.'], ['KE = ½ m v² = m g h', 'These are two energy formulas, not a statement that the total is conserved.']],
  'Mechanical energy is conserved when the initial sum PEᵢ + KEᵢ equals the final sum PEf + KEf.');
F('CON-F10', 'cons', 30, 'A pendulum swings from its highest point to its lowest point. Ignoring friction, at the lowest point the pendulum bob has', 'maximum kinetic energy and minimum potential energy',
  [['maximum potential energy and minimum kinetic energy', 'That describes the highest point of the swing, where the bob stops for an instant.'], ['maximum kinetic energy and maximum potential energy', 'When KE is at its maximum, PE is at its minimum. They trade off.'], ['no energy at all', 'The bob is moving fastest here, so it has the most kinetic energy.']],
  'At the bottom, the height (PE) is smallest and the speed (KE) is greatest.');
F('CON-F11', 'cons', 35, 'An object is dropped from rest. Halfway down, ignoring air resistance, how does its kinetic energy compare with its potential energy?', 'They are equal',
  [['KE is twice the PE', 'Halfway down, half of the starting PE has become KE and half is still PE.'], ['KE is zero', 'KE is zero only at the very start.'], ['PE is zero', 'PE is zero only at the ground.']],
  'Total ME = starting PE. Halfway down, half the height is gone, so half the energy has become KE. KE = PE.');
F('CON-F12', 'cons', 40, 'Two balls, one heavy and one light, are dropped from the same height. Ignoring air resistance, how do their speeds compare just before they hit the ground?', 'They are the same',
  [['The heavy ball is faster', 'In m g h = ½ m v², the mass cancels. Mass does not change the speed.'], ['The light ball is faster', 'In m g h = ½ m v², the mass cancels. Mass does not change the speed.'], ['It depends on how hard they are dropped', 'Dropping from rest means the starting KE is zero for both.']],
  'm g h = ½ m v² gives v = √(2 g h). The mass cancels, so only the height matters.');
F('CON-F13', 'cons', 35, 'A moving ball has all of its kinetic energy turn into potential energy as it rises straight up and stops for an instant at the top. At the top, which of these is true?', 'Its KE is zero and its PE is at its maximum',
  [['Its KE is at its maximum', 'The ball is momentarily stopped, so KE = ½ m v² = 0.'], ['Its PE is zero', 'The ball is at its highest point, so the PE is the greatest.'], ['Its mechanical energy is zero', 'Mechanical energy is KE + PE. Here it is all PE, but it is not zero.']],
  'At the top v = 0 so KE = 0, and all of the mechanical energy is potential energy.');
F('CON-F14', 'cons', 30, 'A ball dropped from 2.0 m bounces back to only 1.4 m. What happened to the missing mechanical energy?', 'It changed into thermal energy and sound, mostly when the ball hit the floor',
  [['It was destroyed', 'Energy is never destroyed. It changes form.'], ['It was stored in the ball as extra weight', 'A ball does not gain weight when it bounces.'], ['It turned into more kinetic energy', 'Then the ball would bounce higher, not lower.']],
  'The ball and floor warm up a little and the impact makes a sound. That energy is no longer mechanical, so the ball cannot rise as high.');
F('CON-F15', 'cons', 35, 'A roller coaster car is released from rest at the top of the first hill. Ignoring friction, where is the car moving fastest?', 'At the bottom of the first drop',
  [['At the top of the first hill', 'The car starts at rest at the top, so its speed is zero.'], ['At the top of a smaller hill later on', 'Smaller hills are lower than the start, but any hill top still means less speed than the lowest point.'], ['Everywhere, because energy is conserved', 'The total energy is constant, but it trades between PE and KE, so the speed changes.']],
  'The lowest point has the smallest PE and the largest KE, so the speed is greatest there.');
F('CON-F16', 'cons', 35, 'A ball is thrown straight up. At the top of its path, which energy has the greatest value compared with the rest of the trip?', 'Gravitational potential energy',
  [['Kinetic energy', 'The ball stops at the top, so KE is zero.'], ['Thermal energy', 'Thermal energy changes only a little (air resistance).'], ['Chemical energy', 'Chemical energy was used by the thrower. It is not stored in the ball.']],
  'At the top the ball is highest, so its PE is greatest and its KE is zero.');

T('CON-T1', 'cons', 50, 'Speed at the bottom of a drop (from rest)', function () {
  return tryGen('CON-T1', function () {
    const m = pick([2, 3, 5, 8, 10, 20, 50]), h = pick([5, 8, 10, 12, 15, 20, 25, 30, 45]), f = gg => Math.sqrt(2 * gg * h);
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: 'A ' + d2(m) + ' kg object is dropped from rest from a height of ' + d2(h) + ' m. Ignoring air resistance, how fast is it moving just before it hits the ground?',
      wrongs: [[2 * GE * h, 'This is v², not v. Take the square root at the end.'], [Math.sqrt(GE * h), 'This left out the 2. From m g h = ½ m v² you get v = √(2 g h).'], [GE * h / 2, 'Do not forget the square root. v² = 2 g h, so v = √(2 g h).']],
      explain: 'm g h = ½ m v², so v = √(2 g h) = √(2 × 9.8 × ' + d2(h) + ') = ' + show(f(GE), 2) + ' m/s. The mass cancels.', hint: 'Set the starting PE equal to the ending KE: m g h = ½ m v². The m cancels.', meta: { h: h } });
  });
});
T('CON-T2', 'cons', 50, 'Maximum height of an object launched upward', function () {
  return tryGen('CON-T2', function () {
    const m = pick([0.5, 1, 2, 3, 5]), v = pick([10, 12, 15, 18, 20, 24, 30]), f = gg => v * v / (2 * gg);
    return numQ({ n: 2, unit: ' m', right: f(GE), gf: f,
      prompt: 'A ' + fmt(m, 2) + ' kg ball is launched straight up from ground level at ' + d2(v) + ' m/s. Ignoring air resistance, what maximum height does it reach?',
      wrongs: [[v * v / GE, 'This left out the 2. From ½ m v² = m g h you get h = v² ÷ (2 g).'], [v / (2 * GE), 'The speed must be squared: h = v² ÷ (2 g).'], [2 * v * v / GE, 'The 2 belongs in the denominator, not the numerator.']],
      explain: 'All the KE becomes PE: ½ m v² = m g h, so h = v² ÷ (2 g) = ' + d2(v) + '² ÷ (2 × 9.8) = ' + show(f(GE), 2) + ' m.', hint: 'At the top the ball stops, so all of its starting KE has become PE. Set ½ m v² = m g h.', meta: { v: v } });
  });
});
T('CON-T3', 'cons', 65, 'Speed after a drop that starts with some speed', function () {
  return tryGen('CON-T3', function () {
    const m = pick([0.5, 1, 2, 4, 6]), h = pick([9, 12, 15, 20, 30]), v0 = pick([4, 6, 8, 10, 12]), f = gg => Math.sqrt(v0 * v0 + 2 * gg * h);
    return numQ({ n: 2, unit: ' m/s', right: f(GE), gf: f,
      prompt: 'A ' + fmt(m, 2) + ' kg rock is thrown straight down from the top of a cliff ' + d2(h) + ' m above the water. Its starting speed is ' + d2(v0) + ' m/s. Ignoring air resistance, how fast is it moving when it hits the water?',
      wrongs: [[v0 + Math.sqrt(2 * GE * h), 'Speeds do not add like this. Energies add: ½ m v₀² + m g h = ½ m v².'], [Math.sqrt(2 * GE * h), 'This ignores the rock’s starting KE. The rock had energy of motion before it fell.'], [Math.sqrt(v0 * v0 + GE * h), 'This dropped the 2. The equation is v² = v₀² + 2 g h.']],
      explain: 'PE₍start₎ + KE₍start₎ = KE₍end₎: m g h + ½ m v₀² = ½ m v². So v = √(v₀² + 2 g h) = √(' + d2(v0) + '² + 2 × 9.8 × ' + d2(h) + ') = ' + show(f(GE), 2) + ' m/s.', hint: 'Add the starting PE and starting KE. That total equals the KE at the bottom.', meta: { v0: v0, h: h } });
  });
});
T('CON-T4', 'cons', 55, 'Potential energy lost in a bounce', function () {
  return tryGen('CON-T4', function () {
    const m = pick([0.10, 0.20, 0.30, 0.50, 0.80]), h1 = pick([3.0, 4.0, 5.0, 6.0, 8.0]), h2 = pick([1.0, 1.5, 2.0, 2.5, 3.5]);
    if (h2 >= h1 - 0.9) return null;
    const f = gg => m * gg * (h1 - h2);
    return numQ({ n: 2, unit: ' J', right: f(GE), gf: f,
      prompt: 'A ' + fmt(m, 2) + ' kg ball is dropped from a height of ' + d2(h1) + ' m. After it bounces, it rises to only ' + d2(h2) + ' m. How much potential energy did the ball lose?',
      wrongs: [[m * GE * h1, 'This is the PE at the start. The loss is the starting PE minus the PE at the top of the bounce.'], [m * GE * h2, 'This is the PE the ball still has at the top of the bounce, not what it lost.'], [m * GE * (h1 + h2), 'The loss is a difference, not a sum.']],
      explain: 'Lost PE = m g (h₁ − h₂) = (' + fmt(m, 2) + ')(9.8)(' + d2(h1) + ' − ' + d2(h2) + ') = ' + show(f(GE), 2) + ' J. That energy became thermal energy and sound.', hint: 'Find the PE at each height, then subtract. Or use m g × (change in height).', meta: { m: m, h1: h1, h2: h2 } });
  });
});
T('CON-T5', 'cons', 45, 'Kinetic energy from total mechanical energy and PE', function () {
  return tryGen('CON-T5', function () {
    const ME = pick([2000, 4000, 5000, 6000, 8000, 10000, 20000, 50000]), PE = sig(ME * pick([0.2, 0.3, 0.4, 0.6, 0.7]), 2), KE = ME - PE;
    const what = pick(['a roller coaster car', 'a skier', 'a skateboarder', 'a sled']);
    return numQ({ n: 2, unit: ' J', right: KE,
      prompt: 'The total mechanical energy of ' + what + ' on a frictionless slope is ' + show(ME, 2) + ' J. At one point on the slope its potential energy is ' + show(PE, 2) + ' J. How much kinetic energy does it have at that point?',
      wrongs: [[ME + PE, 'KE and PE are parts of the total. KE = total − PE, so it cannot be bigger than the total.'], [PE, 'This is the PE. KE is the other part of the total.'], [ME, 'This is the total, but part of it is PE.']],
      explain: 'ME = KE + PE, so KE = ME − PE = ' + show(ME, 2) + ' − ' + show(PE, 2) + ' = ' + show(KE, 2) + ' J.', hint: 'Total mechanical energy = KE + PE. Subtract the part you know.', meta: { ME: ME, PE: PE } });
  });
});
T('CON-T6', 'cons', 70, 'Energy lost to friction on a slide', function () {
  return tryGen('CON-T6', function () {
    const m = pick([20, 30, 40, 50]), h = pick([3.0, 4.0, 5.0, 6.0]), v = pick([3.0, 4.0, 5.0, 6.0, 7.0]);
    if (v * v >= 2 * GE * h * 0.8) return null;
    const f = gg => m * gg * h - 0.5 * m * v * v;
    return numQ({ n: 2, unit: ' J', right: f(GE), gf: f,
      prompt: 'A ' + d2(m) + ' kg child starts from rest at the top of a slide ' + d2(h) + ' m high. At the bottom she is moving at ' + d2(v) + ' m/s. How much mechanical energy was changed into thermal energy by friction?',
      wrongs: [[m * GE * h, 'This is all of the starting PE. Part of it became the child’s KE, so only the rest was lost.'], [0.5 * m * v * v, 'This is the KE she still has at the bottom, not the energy lost.'], [m * GE * h + 0.5 * m * v * v, 'The lost energy is a difference (starting energy minus ending energy), not a sum.']],
      explain: 'Starting PE = m g h = ' + show(m * GE * h, 3) + ' J. Ending KE = ½ m v² = ' + show(0.5 * m * v * v, 3) + ' J. Lost = ' + show(f(GE), 2) + ' J.', hint: 'Lost energy = starting mechanical energy − ending mechanical energy.', meta: { m: m, h: h, v: v } });
  });
});
