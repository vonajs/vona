const schemas = require('./meta/validation/schemas.js');
const staticLayouts = require('./meta/static/layouts.js');
const staticResources = require('./meta/static/resources.js');
// meta
const meta = {
  base: {
    resources: {
      button: {
        title: 'Sidebar Button',
      },
      panel: {
        title: 'Sidebar Panel',
      },
    },
    statics: {
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
    schemas: {},
  },
};
module.exports = meta;
