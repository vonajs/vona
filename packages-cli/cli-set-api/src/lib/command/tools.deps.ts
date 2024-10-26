export default {
  bean: 'tools.deps',
  info: {
    version: '5.0.0',
    title: 'Cli: Tools: Deps',
    usage: 'vona :tools:deps [--mode] [--force]',
  },
  options: {
    mode: {
      description: 'mode',
      type: 'string',
    },
    force: {
      description: 'force',
      type: 'boolean',
    },
  },
};
