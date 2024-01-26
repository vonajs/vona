import atomClasses from './meta/atomClass/atomClasses.js';
import schemas from './meta/validation/schemas.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
import staticDicts from './meta/static/dicts.js';
// meta
const meta = {
  base: {
    atoms: atomClasses,
    statics: {
      'a-baselayout.layout': {
        items: staticLayouts,
      },
      'a-base.resource': {
        items: staticResources,
      },
      'a-dict.dict': {
        items: staticDicts,
      },
    },
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
  index: {
    indexes: {
      aUserOnline: 'createdAt,updatedAt,atomId,userId,onlineTimeLast,expireTime',
      aUserOnlineHistory: 'createdAt,updatedAt,userId,onlineTime',
    },
  },
};
export default meta;
