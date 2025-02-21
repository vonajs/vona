import atomClasses from './meta/atomClass/atomClasses.ts';
// static
import staticApps from './meta/static/apps.ts';
import staticDicts from './meta/static/dicts.ts';
import staticLayouts from './meta/static/layouts.ts';
import staticResources from './meta/static/resources.ts';
import keywords from './meta/validation/keywords.ts';
import schemas from './meta/validation/schemas.ts';
// meta
export const meta = {
  base: {
    atoms: atomClasses,
    statics: {
      'a-app:app': {
        items: staticApps,
      },
      'a-dict:dict': {
        items: staticDicts,
      },
      'a-baselayout:layout': {
        items: staticLayouts,
      },
      'a-base:resource': {
        items: staticResources,
      },
    },
  },
  validation: {
    validators: {},
    keywords,
    schemas,
  },
  index: {
    indexes: {},
  },
};
