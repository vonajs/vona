import versionManager from './bean/version.manager.js';
import atomFlowDef from './bean/atom.flowDef.js';
import flowBehaviorBase from './bean/flow.behavior.base.js';
import localContextFlow from './bean/local.context.flow.js';
import localContextNode from './bean/local.context.node.js';
import localContextEdge from './bean/local.context.edge.js';
import localFlowFlow from './bean/local.flow.flow.js';
import localFlowNode from './bean/local.flow.node.js';
import localFlowEdge from './bean/local.flow.edge.js';
import localFlowListener from './bean/local.flow.listener.js';
import localProcedure from './bean/local.procedure.js';
import beanFlow from './bean/bean.flow.js';
import beanFlowDef from './bean/bean.flowDef.js';
import statsFlowInitiateds from './bean/stats.flowInitiateds.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // atom
  'atom.flowDef': {
    bean: atomFlowDef,
  },
  // flow behavior
  'flow.behavior.base': {
    bean: flowBehaviorBase,
  },
  // local
  'local.context.flow': {
    bean: localContextFlow,
  },
  'local.context.node': {
    bean: localContextNode,
  },
  'local.context.edge': {
    bean: localContextEdge,
  },
  'local.flow.flow': {
    bean: localFlowFlow,
  },
  'local.flow.node': {
    bean: localFlowNode,
  },
  'local.flow.edge': {
    bean: localFlowEdge,
  },
  'local.flow.listener': {
    bean: localFlowListener,
  },
  'local.procedure': {
    bean: localProcedure,
  },
  // global
  flow: {
    bean: beanFlow,
    global: true,
  },
  flowDef: {
    bean: beanFlowDef,
    global: true,
  },
  // stats
  'stats.flowInitiateds': {
    bean: statsFlowInitiateds,
  },
};
