import defaults from './defaults.js';

const nodes = {
  // gateways
  gatewayExclusive: {
    title: 'GatewayExclusive',
    group: 'gateway',
    bean: 'gatewayExclusive',
    icon: { f7: ':flow:gateway-exclusive' },
  },
  gatewayParallel: {
    title: 'GatewayParallel',
    group: 'gateway',
    bean: 'gatewayParallel',
    icon: { f7: ':flow:gateway-parallel' },
  },
  gatewayInclusive: {
    title: 'GatewayInclusive',
    group: 'gateway',
    bean: 'gatewayInclusive',
    icon: { f7: ':flow:gateway-inclusive' },
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
