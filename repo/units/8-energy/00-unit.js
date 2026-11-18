'use strict';
/* ======================= UNIT DEFINITION =======================
   Everything unit-specific that is not a question. Another unit swaps this block and the question banks. */
const UNIT = {
  id: 'energy', grade: 8, codePrefix: 'G8E',
  title: 'Unit 3: Energy',
  subtitle: 'Kinetic and potential energy, conservation, work, power, and efficiency',
  minShow: 10,          // fewer attempts than this: "not enough data yet"
  minTrust: 20,         // about this many attempts and the score is mostly real data
  k: 20,                // prior weight in the difficulty blend
  topics: [
    { id: 'what',  name: 'What is energy?', idea: 'Energy is the ability to cause a change or the ability to do work. The unit is the joule (J). Every form of energy is kinetic energy (motion), potential energy (stored), or a mix of both.' },
    { id: 'ke',    name: 'Kinetic energy', idea: 'KE = ½ m v². Mass in kg, speed in m/s, answer in joules. Speed is squared: double the speed and the KE is 4 times bigger.' },
    { id: 'pe',    name: 'Gravitational potential energy', idea: 'PE = m g h, with g = 9.8 m/s² on Earth. Mass in kg, height in m, answer in joules. Height is NOT squared: double the height and the PE doubles.' },
    { id: 'cons',  name: 'Conservation of mechanical energy', idea: 'Mechanical energy is KE + PE. If nothing is lost, PEi + KEi = PEf + KEf. A falling object turns PE into KE, so m g h = ½ m v². In real life some mechanical energy becomes thermal energy and sound.' },
    { id: 'work',  name: 'Work', idea: 'Work is force times distance: W = F d. The force must be in the same direction as the motion. Work is measured in joules (J), and 1 J = 1 N·m.' },
    { id: 'power', name: 'Power', idea: 'Power is the rate at which work is done: P = W ÷ t. The unit is the watt (W), and 1 W = 1 J/s. Same work in less time means more power.' },
    { id: 'mach',  name: 'Simple machines and ramps', idea: 'A simple machine does work in one movement. It can reduce the force or change its direction, but it does not reduce the total work. A ramp needs less force but a longer distance.' },
    { id: 'eff',   name: 'Efficiency', idea: 'Efficiency = (work output ÷ work input) × 100, always a percentage under 100%. The missing energy is not destroyed: it becomes thermal energy (friction), sound, and other non-useful forms.' }
  ],
  chal: { id: 'chal', name: 'Challenge', idea: 'This goes beyond the test, but it’s good to know!' },
  adv:  { id: 'adv',  name: 'Super Advanced', idea: 'High-school and college level. Use energy conservation, the work–energy idea (net work = change in KE), and careful algebra.' },
  quizzes: [
    { id: 'q1', name: 'Quiz 1: Kinetic and potential energy', topics: ['what', 'ke', 'pe', 'cons'] },
    { id: 'q2', name: 'Quiz 2: Work', topics: ['work'] },
    { id: 'q3', name: 'Quiz 3: Power, machines, and efficiency', topics: ['power', 'mach', 'eff'] }
  ]
};
UNIT.topicById = {}; UNIT.topics.forEach(t => UNIT.topicById[t.id] = t); UNIT.topicById.chal = UNIT.chal; UNIT.topicById.adv = UNIT.adv;
