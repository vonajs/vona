export default {
  bean: 'create.entity',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Entity',
    usage: 'vona :create:entity name [--module=]',
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
        name: {
          type: 'input',
          message: 'name',
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
