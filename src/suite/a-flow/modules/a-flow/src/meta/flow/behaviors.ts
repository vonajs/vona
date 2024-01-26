import defaults from './defaults.js';

const behaviors = {
  // base
  base: {
    title: 'Base',
    bean: 'base',
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
