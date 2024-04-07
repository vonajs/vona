import schemas from './meta/validation/schemas.js';
// static
import staticResources from './meta/static/resources.js';
// cli commands
import cliCommands from './meta/cli/commands.js';
// meta
export const meta = {
  base: {
    atoms: {},
    statics: {
      'a-base:resource': {
        items: staticResources,
      },
    },
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
  cli: {
    commands: cliCommands,
  },
};
