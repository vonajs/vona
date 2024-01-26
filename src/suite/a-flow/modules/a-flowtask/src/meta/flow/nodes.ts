import defaults from './defaults.js';

const nodes = {
  // events
  startEventAtom: {
    title: 'StartEventAtom',
    group: 'atom',
    bean: 'startEventAtom',
    icon: { f7: ':flow:start-event-atom' },
    validator: {
      module: __ThisModule__,
      validator: 'startEventAtom',
    },
  },
  endEventAtom: {
    title: 'EndEventAtom',
    group: 'atom',
    bean: 'endEventAtom',
    icon: { f7: ':flow:end-event-atom' },
    validator: {
      module: __ThisModule__,
      validator: 'endEventAtom',
    },
  },
  // activities
  activityUserTask: {
    title: 'ActivityUserTask',
    group: 'atom',
    bean: 'activityUserTask',
    icon: { f7: ':flow:activity-user-task' },
    validator: {
      module: __ThisModule__,
      validator: 'activityUserTask',
    },
  },
};

for (const key in nodes) {
  const node = nodes[key];
  node.options = {};
  if (defaults[key]) {
    node.options.default = defaults[key];
  }
}

export default nodes;
