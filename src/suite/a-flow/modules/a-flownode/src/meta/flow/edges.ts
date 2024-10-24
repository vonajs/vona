import { __ThisModule__ } from '../../.metadata/this.js';
import defaults from './defaults.js';

const edges = {
  sequence: {
    title: 'Sequence',
    bean: 'sequence',
    validator: {
      module: __ThisModule__,
      validator: 'sequence',
    },
  },
};

for (const key in edges) {
  const node = edges[key];
  node.options = {};
  if (defaults[key]) {
    node.options.default = defaults[key];
  }
}

export default edges;
