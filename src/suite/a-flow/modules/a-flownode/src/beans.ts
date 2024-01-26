import versionManager from './bean/version.manager.js';
import queueStartEventTimer from './bean/queue.startEventTimer.js';
import flowEdgeSequence from './bean/flow.edge.sequence.js';
import flowNodeStartEventNone from './bean/flow.node.startEventNone.js';
import flowNodeStartEventTimer from './bean/flow.node.startEventTimer.js';
import flowNodeEndEventNone from './bean/flow.node.endEventNone.js';
import flowNodeActivityNone from './bean/flow.node.activityNone.js';
import flowNodeActivityService from './bean/flow.node.activityService.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // queue
  'queue.startEventTimer': {
    bean: queueStartEventTimer,
  },
  // flow
  'flow.edge.sequence': {
    bean: flowEdgeSequence,
  },
  'flow.node.startEventNone': {
    bean: flowNodeStartEventNone,
  },
  'flow.node.startEventTimer': {
    bean: flowNodeStartEventTimer,
  },
  'flow.node.endEventNone': {
    bean: flowNodeEndEventNone,
  },
  'flow.node.activityNone': {
    bean: flowNodeActivityNone,
  },
  'flow.node.activityService': {
    bean: flowNodeActivityService,
  },
};
