import defaults from './defaults.js';

const behaviors = {
  // Overtime
  overtime: {
    title: 'Overtime',
    bean: 'overtime',
    icon: { f7: ':outline:timer-outline' },
    validator: {
      module: __ThisModule__,
      validator: 'overtime',
    },
  },
};

for (const key in behaviors) {
  const behavior = behaviors[key];
  behavior.options = {};
  if (defaults[key]) {
    behavior.options.default = defaults[key];
  }
}

export default behaviors;
