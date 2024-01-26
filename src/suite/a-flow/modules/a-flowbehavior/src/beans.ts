import versionManager from './bean/version.manager.js';
import flowBehaviorOvertime from './bean/flow.behavior.overtime.js';
import queueOvertime from './bean/queue.overtime.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // flow behavior
  'flow.behavior.overtime': {
    bean: flowBehaviorOvertime,
  },
  // queue
  'queue.overtime': {
    bean: queueOvertime,
  },
};
