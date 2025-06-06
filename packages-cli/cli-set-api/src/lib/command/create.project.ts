export default {
  bean: 'create.project',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Project',
    usage: 'vona :create:project projectName [--template=] [--force]',
  },
  options: {
    template: {
      description: 'template',
      type: 'string',
    },
    force: {
      description: 'force',
      type: 'boolean',
    },
  },
  groups: {
    default: {
      questions: {
        template: {
          type: 'select',
          message: 'Specify the project template',
          choices: [
            { name: 'basic', message: 'basic' },
          ],
        },
      },
    },
    moduleInfo: {
      questions: {
        name: {
          type: 'input',
          message: 'project name',
          initial: {
            expression: 'context.argv._[0]',
          },
          required: true,
        },
      },
    },
  },
};
