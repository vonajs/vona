import { __ThisModule__ } from '../../../resource/this.js';
import Listener from './listener/set01_startEventAtom.spec.js';

const content = {
  listener: Listener,
  process: {
    nodes: [
      {
        id: 'startEvent_1',
        name: 'Drafting',
        type: 'startEventAtom',
        options: {
          atom: {
            module: __ThisModule__,
            atomClassName: 'purchaseOrder',
          },
          conditionExpression: "atom._flowDefKey==='set01_startEventAtom'",
        },
      },
      {
        id: 'activity_1',
        name: 'ActivityNone',
        type: 'activityNone',
      },
      {
        id: 'endEvent_1',
        name: 'End',
        type: 'endEventAtom',
      },
    ],
    edges: [
      {
        id: 'edge_1',
        source: 'startEvent_1',
        target: 'activity_1',
      },
      {
        id: 'edge_2',
        source: 'activity_1',
        target: 'endEvent_1',
      },
    ],
  },
};
const definition = {
  atomName: 'Test_Set01_StartEvent_Atom',
  atomStaticKey: 'set01_startEventAtom',
  atomRevision: 1,
  description: '',
  content: JSON.stringify(content),
};
export default definition;
