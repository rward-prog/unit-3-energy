'use strict';
/* ======================= STUDY NOTES (vocabulary matches the unit notes) ======================= */
const FORMULAS = [
  ['Kinetic energy', 'KE = ½ m v²', 'mass in kg, speed in m/s, energy in joules (J)'],
  ['Gravitational potential energy', 'PE = m g h', 'g = 9.8 m/s² on Earth, height in m, energy in J'],
  ['Conservation of mechanical energy', 'PE<sub>i</sub> + KE<sub>i</sub> = PE<sub>f</sub> + KE<sub>f</sub>', 'falling from rest with no losses: m g h = ½ m v²'],
  ['Work', 'W = F d', 'force in N, distance in m (in the direction of the force), work in J'],
  ['Power', 'P = W ÷ t', 'work in J, time in s, power in watts (W); 1 W = 1 J/s'],
  ['Efficiency', 'Efficiency = (work output ÷ work input) × 100', 'or (power output ÷ power input) × 100, always a percent']
];
const NOTES = {
  what: [
    '<b>Energy</b> is the ability to cause a change, or the ability to do work. Its SI unit is the <b>joule (J)</b>. One joule is the energy needed to push with 1 N of force through 1 m, so 1 J = 1 N·m.',
    'Every form of energy can be classified as <b>kinetic energy</b> (the energy of a moving object) or <b>potential energy</b> (the stored energy of an object in relation to its position, shape, or interaction with other objects).',
    '<b>Chemical energy</b> is stored in the bonds between atoms: a form of potential energy (gasoline, pizza). <b>Electric energy</b> carries an electric current: a form of kinetic energy.',
    '<b>Sound</b> and <b>light</b> energy are carried by waves and include both kinetic and potential energy. <b>Thermal energy</b> is the sum of the kinetic and potential energies of the particles that make up an object.',
    'A moving object that is also high up or stretched has <b>both</b> kinds, such as a bird in flight or a roller coaster car at the top of a hill.',
    'The <b>law of conservation of energy</b>: the amount of energy in a closed system stays constant. Energy cannot be created or destroyed. It changes form.',
    'Energy transformations: a toaster changes electrical energy into thermal energy. A power plant changes chemical energy (burning fuel) into thermal energy (steam), then mechanical energy (turbine), then electrical energy.'
  ],
  ke: [
    '<b>KE = ½ m v²</b>. Use mass in kilograms and speed in meters per second so the answer comes out in joules.',
    '<b>Mass:</b> twice the mass is twice the KE. <b>Speed:</b> twice the speed is FOUR times the KE, and triple the speed is NINE times the KE, because speed is squared.',
    'Square ONLY the speed. (m v)² is a common mistake, and forgetting to square the speed gives a wrong answer almost every time.',
    '<b>Rearranging:</b> m = 2 KE ÷ v² and v = √(2 KE ÷ m).',
    'Grams must become kilograms first. 500 g = 0.500 kg.',
    'Round your answer to the fewest significant figures in the problem.'
  ],
  pe: [
    '<b>PE = m g h</b>, where g = 9.8 m/s² on Earth and h is the height above the ground (or above the reference level).',
    'Since weight = m g, <b>PE = weight × height</b>.',
    '<b>Height is NOT squared.</b> Twice the height is twice the PE. Twice the mass is twice the PE.',
    '<b>Rearranging:</b> m = PE ÷ (g h) and h = PE ÷ (m g).',
    '<b>Gain in PE</b> when something is lifted from h₁ to h₂: m g (h₂ − h₁). Use the CHANGE in height.',
    'On the Moon, g is smaller, so the same lift stores less PE.'
  ],
  cons: [
    '<b>Mechanical energy</b> is the energy an object has because of its motion or its position. <b>Total mechanical energy</b> is the sum of the potential and kinetic energy: ME = PE + KE.',
    'If mechanical energy is conserved: <b>ME<sub>i</sub> = ME<sub>f</sub></b>, or PE<sub>i</sub> + KE<sub>i</sub> = PE<sub>f</sub> + KE<sub>f</sub>.',
    '<b>Falling from rest:</b> all the PE becomes KE, so m g h = ½ m v² and v = √(2 g h). The mass cancels, so heavy and light objects hit the ground at the same speed (no air resistance).',
    '<b>Thrown up or down with a starting speed:</b> add the starting KE: PE<sub>i</sub> + KE<sub>i</sub> = PE<sub>f</sub> + KE<sub>f</sub>. A ball thrown up at v reaches h = v² ÷ (2 g).',
    '<b>How to set up any picture problem:</b> (1) Mark the two points, the START (initial) and the END (final). (2) Write PE<sub>i</sub> + KE<sub>i</sub> = PE<sub>f</sub> + KE<sub>f</sub>. (3) Fill in the terms you know: m g h for PE and ½ m v² for KE. A point on the ground has PE = 0. A point where the object stops for an instant has KE = 0. (4) The mass cancels. Solve for the unknown.',
    '<b>Thrown up:</b> at launch it is all KE. Higher up, KE shrinks and PE grows, and the total stays the same. <b>Thrown down:</b> it starts with BOTH PE and KE, and everything ends up as KE at the ground. KE = PE exactly halfway up in energy, which is half the maximum height.',
    '<b>Going up a hill</b> turns KE into PE. <b>Coming down</b> turns PE into KE. At the top of a rise, an object that stops for an instant has KE = 0 and the most PE.',
    '<b>In real life</b> some mechanical energy changes into thermal energy and sound (friction, air resistance, a ball hitting the floor). That is why a bounced ball does not return to its starting height. The lost energy = starting ME − ending ME.'
  ],
  work: [
    '<b>Work</b> is the force applied to an object times the distance the object moves in the direction of the force: <b>W = F d</b>. It is the transfer of energy to an object by a force that moves it.',
    'Unit: the <b>joule (J)</b>, which equals a newton-meter (N·m). Lifting an apple (1 N) 1 meter is 1 joule of work.',
    '<b>The force must be in the same direction as the motion.</b> Carrying a box level (force up, motion sideways) is not work. Pushing on a wall that does not move is not work. Gliding at a constant speed with no push needs no force, so no work.',
    '<b>Rearranging:</b> F = W ÷ d and d = W ÷ F.',
    'Lifting at a steady speed: the force equals the weight, so W = (m g) h. That is the PE gained.',
    '<b>Work vs. energy:</b> work is the action of making things change, and energy moves through the action of work.'
  ],
  power: [
    '<b>Power</b> is the rate at which work is done: <b>P = W ÷ t</b>. Another form: P = (F × d) ÷ t.',
    'The SI unit is the <b>watt (W)</b>: 1 W = 1 J/s. 1 kW = 1000 W.',
    '<b>Rearranging:</b> W = P × t and t = W ÷ P.',
    'Same work in less time means <b>more power</b>. Two people climbing the same stairs do the same work, but the faster one has more power.',
    '<b>Stair-climbing power:</b> measure your weight (or mass), the vertical height of the stairs, and the time. Work = m g h, then P = W ÷ t.'
  ],
  mach: [
    'A <b>simple machine</b> does work using one movement. The six types: <b>inclined plane, screw, lever, pulley, wedge, and wheel and axle</b>.',
    'Simple machines do not change the total work needed. They make the job easier by <b>reducing the force</b> or <b>changing the direction</b> of the force.',
    '<b>The trade-off:</b> an inclined plane lowers the force but the object must move a greater distance. A 30° ramp needs less force than an 80° ramp, but you travel farther and it likely takes longer.',
    'For a ramp: <b>work output = weight × height lifted</b>, and <b>work input = applied force × length of the ramp</b>.',
    'We always put <b>more work in than we get out</b>, because some energy is lost to friction, thermal energy, and other non-useful forms.',
    'In the ramp interactive the force changed with the angle, but the work stayed about 30 J for the 3 kg cart: m g h = 3 × 9.8 × 1.0 = 29.4 J.'
  ],
  eff: [
    '<b>Efficiency</b> compares work output to work input, and is always a percentage: <b>Efficiency = (work output ÷ work input) × 100</b>. It can also compare power output to power input.',
    'Efficiency is always under 100%. Machines are never 100% efficient because energy is lost as heat from friction between moving parts.',
    '<b>Useful output</b> = input − energy lost. An average engine wastes nearly 85% of its input on thermal energy (cooling system and exhaust) and friction.',
    '<b>Rearranging:</b> input = output ÷ efficiency (as a decimal), and output = input × efficiency.',
    'The lost energy is not destroyed. It becomes thermal energy and sound.',
    'To compare devices, calculate output ÷ input for each. The device with the biggest output is not always the most efficient.'
  ],
  chal: [
    '<b>Scaling puzzles:</b> multiply the mass factor by the SQUARE of the speed factor for KE. For PE, multiply the mass and height factors.',
    '<b>Work turns into speed:</b> with no friction, W = F d = ½ m v². With friction, net work = change in KE.',
    '<b>Braking distance:</b> friction must remove all the KE, so the distance grows with v². Doubling the speed makes the stopping distance 4 times longer.',
    '<b>Friction on a ramp:</b> energy at the top = energy at the bottom + work lost to friction (f × distance along the ramp).',
    '<b>Chains of machines:</b> multiply the efficiencies (as decimals). The whole is less efficient than the worst stage.',
    '<b>Motor problems:</b> useful output first (m g h), then input = output ÷ efficiency. For power, divide by the time too.'
  ],
  adv: [
    '<b>Work–energy theorem:</b> net work = change in kinetic energy, W<sub>net</sub> = ½ m v₂² − ½ m v₁². Always square each speed first, then subtract.',
    '<b>Work from a graph:</b> the area under a force-versus-position graph is the work. Split it into rectangles and triangles.',
    '<b>Springs:</b> elastic PE = ½ k x² (x in meters). A mass dropped onto a spring loses PE over H + x, so you need the quadratic formula.',
    '<b>Circular motion:</b> at the top of a loop, the minimum speed has gravity alone as the centripetal force: v² = g R. Then m g h = m g (2R) + ½ m g R gives h = 2.5 R. A force perpendicular to the motion does no work.',
    '<b>Gravity far from Earth:</b> PE = −G M m ÷ r. Escape speed v = √(2 G M ÷ R). In a circular orbit total energy = −KE.',
    '<b>Collisions:</b> momentum (m v) is conserved in every isolated collision. Kinetic energy is conserved only in an elastic collision. When objects stick together, the fraction of KE lost is M ÷ (m + M) when a mass m hits a resting mass M.',
    '<b>Power = F v.</b> Air drag grows with v², so the power to overcome drag grows with v³.',
    '<b>Rolling:</b> rolling objects split their energy between moving forward and spinning. A solid sphere has v = √(10 g h ÷ 7), slower than a sliding block at √(2 g h).',
    '<b>Heat engines:</b> the best possible efficiency is 1 − T<sub>cold</sub> ÷ T<sub>hot</sub>, with temperatures in kelvins. <b>E = m c²</b> connects mass and energy.'
  ]
};
const TIPS = [
  ['Write the formula first', 'Your test gives you the formulas, so find the right one and write it down before you touch the numbers. Then list what you know, what you want, and the units.'],
  ['Moving or raised? That picks KE or PE', 'If the object is moving, use KE = ½ m v². If it sits above the ground, use PE = m g h. If it is doing both, it has both kinds.'],
  ['Square only the speed', 'In KE = ½ m v², only the v is squared. Double the speed and the KE is four times bigger. Height in PE is NOT squared.'],
  ['Check your units before you calculate', 'Mass in kg, speed in m/s, height and distance in m, time in s. Grams and centimeters must be converted first. Kilowatts are 1000 watts.'],
  ['In falling problems, the mass cancels', 'm g h = ½ m v² gives v = √(2 g h). If the question gives a mass, it is probably extra information.'],
  ['Work needs motion in the direction of the force', 'Carrying a box level, holding a weight still, and pushing a wall that does not move are all zero work.'],
  ['Efficiency is output ÷ input and is under 100%', 'If your efficiency is over 100%, you flipped the fraction. If your input is smaller than your output, flip it back.'],
  ['Lost energy is not destroyed', 'When a question asks where the “lost” energy goes, the answer is thermal energy (and sound), from friction and air resistance.'],
  ['Eliminate what you know is wrong', 'Wrong choices often come from a forgotten ½, a forgotten square, a forgotten g, or a flipped fraction. Crossing out two turns a guess into a 50-50.'],
  ['Round to the fewest significant figures', 'If the numbers in the problem have two significant figures, give two significant figures in your answer.']
];
const WRITTEN = [
  { title: 'A falling ball’s energy',
    prompt: 'A ball is dropped from rest from a high shelf. Describe what happens to its potential energy, its kinetic energy, and its total mechanical energy as it falls toward the floor. Assume air resistance is small.',
    approaches: ['Say what happens to each of the three: PE, KE, and total ME.', 'Link the change in PE to the change in KE, and name the law that connects them.'],
    sample: 'As the ball falls, its height decreases, so its potential energy decreases. At the same time its speed increases, so its kinetic energy increases. The energy is changing form from potential to kinetic. Because air resistance is small, the total mechanical energy (KE + PE) stays about the same, which follows the law of conservation of energy.',
    why: ['It describes all three quantities.', 'It explains why each changes (height and speed).', 'It names the conservation idea and the condition (small air resistance).'] },
  { title: 'A cart rolls up a hill',
    prompt: 'A cart rolls from level ground up a long hill. What happens to the kinetic energy, the potential energy, and the total mechanical energy of the cart as it climbs? Explain, and say what changes if friction is not small.',
    approaches: ['Treat the frictionless case first, then add friction.', 'Use the words “changes form” and “thermal energy.”'],
    sample: 'As the cart climbs, it slows down, so its kinetic energy decreases. It also gets higher, so its potential energy increases. With no friction, the decrease in KE equals the increase in PE, so the total mechanical energy stays constant. If friction is not small, some mechanical energy changes into thermal energy, so the total mechanical energy decreases and the cart reaches a lower height.',
    why: ['It covers KE, PE, and total ME in order.', 'It ties the changes to speed and height.', 'It handles the friction case with the correct destination for the lost energy.'] },
  { title: 'Why a ramp does not save work',
    prompt: 'Explain how to calculate the work output and the work input of a ramp. Then explain why the work output is never equal to the work input, and what the ramp does make easier.',
    approaches: ['Define output and input for the ramp using force and distance.', 'Explain the trade-off between force and distance, and where the missing energy goes.'],
    sample: 'The work output of a ramp is the weight of the object times the height it is lifted, W = F d with the weight as the force and the height as the distance. The work input is the force you push with times the length of the ramp. A ramp makes the job easier because it lowers the force you need, but the object has to travel a greater distance, so the work is about the same. The work output is always less than the work input, because some of the energy is lost to friction and becomes thermal energy.',
    why: ['It gives both calculations clearly.', 'It states the force-versus-distance trade-off.', 'It explains the loss with friction and thermal energy.'] },
  { title: 'Where does the “lost” energy go?',
    prompt: 'A roller coaster car starts from rest at the top of a 90 m hill. Its actual speed at the bottom is less than the speed predicted by energy conservation. What happens to the “lost” energy? How would you calculate the efficiency of the ride?',
    approaches: ['Name the forces that remove mechanical energy, and the forms of energy that result.', 'Compare KE at the bottom with PE at the top.'],
    sample: 'The missing energy was not destroyed. Friction between the wheels and the track, and air resistance, changed some of the car’s mechanical energy into thermal energy and a little sound, so less is left as kinetic energy. To find the efficiency, divide the actual kinetic energy at the bottom (½ m v²) by the potential energy at the top (m g h), then multiply by 100 to get a percentage.',
    why: ['It says the energy is conserved, just changed in form.', 'It names the causes (friction, air resistance) and the results (thermal energy, sound).', 'It gives a correct efficiency plan using output ÷ input.'] },
  { title: 'Same work, different power',
    prompt: 'Two students climb the same flight of stairs. Student A has the same mass as Student B, but A takes 5 seconds and B takes 10 seconds. Compare the work each does and the power each uses. Explain your answer with the equations.',
    approaches: ['Find the work for each student using work = weight × height.', 'Use P = W ÷ t to compare the two powers.'],
    sample: 'They do the same work. Each student lifts the same weight through the same height, so W = m g h is the same for both. Their power is different, because power is the work divided by the time, P = W ÷ t. Student A does the same work in half the time, so A has twice as much power as B.',
    why: ['It decides work first and gives the reason.', 'It uses the equation P = W ÷ t.', 'It gives the ratio (twice as much) instead of just saying “more.”'] },
  { title: 'Super Advanced: why does speed matter so much for braking?',
    prompt: 'A car doubles its speed. Explain, using energy, why its braking distance increases by much more than a factor of two.',
    approaches: ['Say what the brakes must do to the car’s kinetic energy.', 'Compare how KE and the braking work depend on speed and distance.'],
    sample: 'To stop, the brakes (friction) must remove all of the car’s kinetic energy. The work done by friction is the friction force times the distance, so f d = ½ m v². The friction force is roughly the same, so d is proportional to v². Doubling the speed makes the kinetic energy four times larger, so the car needs four times the distance to stop.',
    why: ['It starts from the work–energy idea.', 'It shows the equation and the proportionality.', 'It reaches the number (four times) and explains why it is not two.'] }
];
