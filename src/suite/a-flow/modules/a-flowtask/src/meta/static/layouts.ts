const layoutFlowItemBase = require('./layout/layoutFlowItemBase.js');
const layoutFlowListBase = require('./layout/layoutFlowListBase.js');
const layoutFlowTaskAtomBase = require('./layout/layoutFlowTaskAtomBase.js');
const layoutFlowTaskListBase = require('./layout/layoutFlowTaskListBase.js');

const layouts = [
  layoutFlowItemBase, //
  layoutFlowListBase,
  layoutFlowTaskAtomBase,
  layoutFlowTaskListBase,
];
module.exports = layouts;
