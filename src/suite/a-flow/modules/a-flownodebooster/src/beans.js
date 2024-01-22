const versionManager = require('./bean/version.manager.js');
const queueGateway = require('./bean/queue.gateway.js');
const flowNodeGatewayExclusive = require('./bean/flow.node.gatewayExclusive.js');
const flowNodeGatewayParallel = require('./bean/flow.node.gatewayParallel.js');
const flowNodeGatewayInclusive = require('./bean/flow.node.gatewayInclusive.js');

module.exports = {
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
