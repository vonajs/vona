const flowTask_0 = require('./bean.flowTask/bean.flowTask_0.js');
const flowTask_1 = require('./bean.flowTask/bean.flowTask_1.js');
const flowTask_atomState = require('./bean.flowTask/bean.flowTask_atomState.js');
const flowTask_flowData = require('./bean.flowTask/bean.flowTask_flowData.js');
const flowTask_nodeDoneCheck = require('./bean.flowTask/bean.flowTask_nodeDoneCheck.js');
const flowTask_schema = require('./bean.flowTask/bean.flowTask_schema.js');
const flowTask_checkViewWorkflow = require('./bean.flowTask/bean.flowTask_checkViewWorkflow.js');

module.exports = module.meta.util.mixinClasses(flowTask_0, [
  //
  flowTask_1,
  flowTask_atomState,
  flowTask_flowData,
  flowTask_nodeDoneCheck,
  flowTask_schema,
  flowTask_checkViewWorkflow,
]);
