import { __ThisModule__ } from '../../../.metadata/this.js';

const content = {
  listener: null,
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
          conditionExpression: "atom._flowDefKey==='set01_atomAssigneesConfirmation'",
        },
      },
      {
        id: 'activity_1',
        name: 'Review',
        type: 'activityUserTask',
        options: {
          assignees: {
            roles: 'superuser',
          },
          confirmation: true,
          bidding: true,
          allowForward: true,
          allowSubstitute: true,
        },
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
  atomName: 'Test_Set01_Atom_AssigneesConfirmation',
  atomStaticKey: 'set01_atomAssigneesConfirmation',
  atomRevision: 3,
  description: '',
  content: JSON.stringify(content),
};
export default definition;
