import set00_simple from './flowDef/set00_simple.js';
import set00_edgeSequence from './flowDef/set00_edgeSequence.js';
import set00_activityNone from './flowDef/set00_activityNone.js';
import set00_activityService from './flowDef/set00_activityService.js';
// import set00_startEventTimer from './flowDef/set00_startEventTimer.js';
import set01_startEventAtom from './flowDef/set01_startEventAtom.js';
import set01_atomUserTask from './flowDef/set01_atomUserTask.js';
import set01_atomAssigneesConfirmation from './flowDef/set01_atomAssigneesConfirmation.js';
import set02_behaviorOvertime from './flowDef/set02_behaviorOvertime.js';
import set04_atomState from './flowDef/set04_atomState.js';

const flowDefs = [
  set00_simple,
  set00_edgeSequence,
  set00_activityNone,
  set00_activityService,
  //  set00_startEventTimer,
  set01_startEventAtom,
  set01_atomUserTask,
  set01_atomAssigneesConfirmation,
  set02_behaviorOvertime,
  set04_atomState,
];
export default flowDefs;
