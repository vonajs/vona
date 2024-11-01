export default {
  bean: 'tools.deps',
  info: {
    version: '5.0.0',
    title: 'Cli: Tools: Deps',
    usage: 'vona :tools:deps [--tsc] [--force]',
  },
  options: {
    tsc: {
      description: 'tsc',
      type: 'boolean',
    },
    force: {
      description: 'force',
      type: 'boolean',
    },
  },
};
