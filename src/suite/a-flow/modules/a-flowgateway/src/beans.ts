import versionManager from './bean/version.manager.js';
import queueGateway from './bean/queue.gateway.js';
import flowNodeGatewayExclusive from './bean/flow.node.gatewayExclusive.js';
import flowNodeGatewayParallel from './bean/flow.node.gatewayParallel.js';
import flowNodeGatewayInclusive from './bean/flow.node.gatewayInclusive.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // queue
  'queue.gateway': {
    bean: queueGateway,
  },
  // flow
  'flow.node.gatewayExclusive': {
    bean: flowNodeGatewayExclusive,
  },
  'flow.node.gatewayParallel': {
    bean: flowNodeGatewayParallel,
  },
  'flow.node.gatewayInclusive': {
    bean: flowNodeGatewayInclusive,
  },
};
