const flowTask_0 = require('./local.flow.task/local.flow.task_0.js');
const flowTask_appendHandleRemark = require('./local.flow.task/local.flow.task_appendHandleRemark.js');
const flowTask_assignees = require('./local.flow.task/local.flow.task_assignees.js');
const flowTask_cancelFlow = require('./local.flow.task/local.flow.task_cancelFlow.js');
const flowTask_claim = require('./local.flow.task/local.flow.task_claim.js');
const flowTask_complete = require('./local.flow.task/local.flow.task_complete.js');
const flowTask_event = require('./local.flow.task/local.flow.task_event.js');
const flowTask_init = require('./local.flow.task/local.flow.task_init.js');
const flowTask_recall = require('./local.flow.task/local.flow.task_recall.js');
const flowTask_forward = require('./local.flow.task/local.flow.task_forward.js');
const flowTask_substitute = require('./local.flow.task/local.flow.task_substitute.js');
const flowTask_schema = require('./local.flow.task/local.flow.task_schema.js');
const flowTask_actions = require('./local.flow.task/local.flow.task_actions.js');
const flowTask_notify = require('./local.flow.task/local.flow.task_notify.js');
const flowTask_message = require('./local.flow.task/local.flow.task_message.js');

module.exports = module.meta.util.mixinClasses(flowTask_0, [
  flowTask_appendHandleRemark,
  flowTask_assignees,
  flowTask_cancelFlow,
  flowTask_claim,
  flowTask_complete,
  flowTask_event,
  flowTask_init,
  flowTask_recall,
  flowTask_forward,
  flowTask_substitute,
  flowTask_schema,
  flowTask_actions,
  flowTask_notify,
  flowTask_message,
]);
