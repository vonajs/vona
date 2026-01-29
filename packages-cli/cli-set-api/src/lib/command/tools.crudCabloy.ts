export default {
  bean: 'tools.crudCabloy',
  info: {
    version: '5.0.0',
    title: 'Cli: Tools: Crud Cabloy',
    usage: 'vona :tools:crudCabloy resourceName [--module=]',
  },
  options: {
    module: {
      description: 'module name',
      type: 'string',
    },
  },
  groups: {
    default: {
      questions: {
        resourceName: {
          type: 'input',
          message: 'resourceName',
          initial: {
            expression: 'context.argv._[0]',
          },
          required: true,
        },
        module: {
          type: 'input',
          message: 'module name',
          required: true,
        },
      },
    },
  },
};
