export default {
  bean: 'bin.demo',
  info: {
    version: '5.0.0',
    title: 'Cli: Bin: Demo',
    usage: 'vona :bin:demo [index.ts] [--flavor=]',
  },
  options: {
    flavor: {
      description: 'flavor',
      type: 'string',
    },
  },
};
