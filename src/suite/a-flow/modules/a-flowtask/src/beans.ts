const versionManager = require('./bean/version.manager.js');
const flowNodeStartEventAtom = require('./bean/flow.node.startEventAtom.js');
const flowNodeEndEventAtom = require('./bean/flow.node.endEventAtom.js');
const flowNodeActivityUserTask = require('./bean/flow.node.activityUserTask.js');
const localContextTask = require('./bean/local.context.task.js');
const localFlowTask = require('./bean/local.flow.task.js');
const localProcedure = require('./bean/local.procedure.js');
const localRight = require('./bean/local.right.js');
const beanFlowTask = require('./bean/bean.flowTask.js');
const statsTaskClaimings = require('./bean/stats.taskClaimings.js');
const statsTaskHandlings = require('./bean/stats.taskHandlings.js');
const ioMessageWorkflow = require('./bean/io.message.workflow.js');

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
