import schemas from './meta/validation/schemas.js';
// static
import staticApps from './meta/static/apps.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
export const meta = {
  base: {
    atoms: {
      app: {
        info: {
          bean: 'app',
          title: 'App',
          tableName: 'aApp',
          tableNameModes: {
            full: 'aAppViewFull',
          },
          inner: true,
          resource: true,
          language: false,
          category: true,
          tag: false,
          comment: false,
          attachment: false,
          layout: {
            config: {
              atomList: 'layoutAtomListApp',
            },
          },
        },
        actions: {
          write: {
            enableOnStatic: null,
          },
        },
        validator: 'app',
        search: {
          validator: 'appSearch',
        },
      },
    },
    statics: {
      'a-app:app': {
        items: staticApps,
      },
      'a-baselayout.layout': {
        items: staticLayouts,
      },
      'a-base.resource': {
        items: staticResources,
      },
    },
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
  index: {
    indexes: { aApp: 'createdAt,updatedAt,atomId' },
  },
};
