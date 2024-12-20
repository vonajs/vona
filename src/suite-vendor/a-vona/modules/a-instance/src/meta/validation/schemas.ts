import { __ThisModule__ } from '../../.metadata/this.js';

// instance
const instance = {
  type: 'object',
  properties: {
    // Basic Info
    __groupBasicInfo: {
      ebType: 'group-flatten',
      ebParams: {
        titleHidden: true,
      },
    },
    name: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Subdomain',
      ebReadOnly: true,
    },
    // Basic Info
    __groupBasicInfo2: {
      ebType: 'group-flatten',
      ebParams: {
        titleHidden: true,
      },
    },
    title: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Title',
    },
    // Basic Info
    __groupBasicInfo3: {
      ebType: 'group-flatten',
      ebGroupWhole: true,
      ebParams: {
        titleHidden: true,
      },
    },
    config: {
      type: 'string',
      ebType: 'json',
      ebTitle: 'Config',
      ebParams: {
        target: '',
        actionSave: true,
        actionDone: true,
        actions: [
          {
            name: 'preview',
            actionModule: __ThisModule__,
            actionComponent: 'action',
            icon: { f7: '::preview' },
            navigateOptions: { target: '_self' },
          },
        ],
      },
      // notEmpty: true,
    },
  },
};

const schemas = { instance };

export default schemas;
