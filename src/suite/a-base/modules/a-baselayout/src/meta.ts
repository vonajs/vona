import schemas from './meta/validation/schemas.js';
// static
import staticResources from './meta/static/resources.js';
// meta
export const meta = {
  base: {
    atoms: {
      layout: {
        info: {
          bean: 'layout',
          title: 'Layout',
          tableName: 'aLayout',
          tableNameModes: {
            full: 'aLayoutViewFull',
          },
          inner: true,
          resource: true,
          comment: false,
          attachment: false,
          fields: {
            dicts: {
              layoutTypeCode: {
                dictKey: 'a-dictbooster:dictLayoutType',
              },
            },
          },
        },
        actions: {
          write: {
            enableOnStatic: null,
          },
        },
        validator: 'layout',
        search: {
          validator: 'layoutSearch',
        },
      },
    },
    statics: {
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
};
