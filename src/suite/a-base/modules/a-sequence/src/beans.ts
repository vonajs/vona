import versionManager from './bean/version.manager.js';
import sequenceSimple from './bean/sequence.simple.js';
import beanSequence from './bean/bean.sequence.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // sequence
  'sequence.simple': {
    bean: sequenceSimple,
  },
  // global
  sequence: {
    bean: beanSequence,
    global: true,
  },
};
