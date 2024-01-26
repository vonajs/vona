import versionManager from './bean/version.manager.js';
import flowNodeStartEventAtom from './bean/flow.node.startEventAtom.js';
import flowNodeEndEventAtom from './bean/flow.node.endEventAtom.js';
import flowNodeActivityUserTask from './bean/flow.node.activityUserTask.js';
import localContextTask from './bean/local.context.task.js';
import localFlowTask from './bean/local.flow.task.js';
import localProcedure from './bean/local.procedure.js';
import localRight from './bean/local.right.js';
import beanFlowTask from './bean/bean.flowTask.js';
import statsTaskClaimings from './bean/stats.taskClaimings.js';
import statsTaskHandlings from './bean/stats.taskHandlings.js';
import ioMessageWorkflow from './bean/io.message.workflow.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // flow
  'flow.node.startEventAtom': {
    bean: flowNodeStartEventAtom,
  },
  'flow.node.endEventAtom': {
    bean: flowNodeEndEventAtom,
  },
  'flow.node.activityUserTask': {
    bean: flowNodeActivityUserTask,
  },
  // local
  'local.context.task': {
    bean: localContextTask,
  },
  'local.flow.task': {
    bean: localFlowTask,
  },
  'local.procedure': {
    bean: localProcedure,
  },
  'local.right': {
    bean: localRight,
  },
  // global
  flowTask: {
    bean: beanFlowTask,
    global: true,
  },
  // stats
  'stats.taskClaimings': {
    bean: statsTaskClaimings,
  },
  'stats.taskHandlings': {
    bean: statsTaskHandlings,
  },
  // io
  'io.message.workflow': {
    bean: ioMessageWorkflow,
  },
};
