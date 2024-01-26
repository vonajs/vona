import versionManager from './bean/version.manager.js';
import beanFields from './bean/bean.fields.js';
import summerCacheFieldsRightOfAtomClass from './bean/summer.cache.fieldsRightOfAtomClass.js';
import summerCacheFieldsRightOfUser from './bean/summer.cache.fieldsRightOfUser.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  fields: {
    bean: beanFields,
    global: true,
  },
  // summer
  'summer.cache.fieldsRightOfAtomClass': {
    bean: summerCacheFieldsRightOfAtomClass,
  },
  'summer.cache.fieldsRightOfUser': {
    bean: summerCacheFieldsRightOfUser,
  },
};
