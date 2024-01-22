const startEventAtom_0 = require('./flow.node.startEventAtom/flow.node.startEventAtom_0.js');
const startEventAtom_condition = require('./flow.node.startEventAtom/flow.node.startEventAtom_condition.js');
const startEventAtom_match = require('./flow.node.startEventAtom/flow.node.startEventAtom_match.js');
const startEventAtom_flowActions = require('./flow.node.startEventAtom/flow.node.startEventAtom_flowActions.js');
const startEventAtom_actionRightViewWorkflow = require('./flow.node.startEventAtom/flow.node.startEventAtom_actionRightViewWorkflow.js');

module.exports = module.meta.util.mixinClasses(startEventAtom_0, [
  startEventAtom_condition,
  startEventAtom_match,
  startEventAtom_flowActions,
  startEventAtom_actionRightViewWorkflow,
]);
