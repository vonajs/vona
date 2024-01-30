import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
// meta
export const meta = {
  base: {
    resources: {
      button: {
        title: 'Tabbar Button',
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
};
