import { __ThisModule__ } from '../../../.metadata/this.js';
import Listener from './listener/set01_atomUserTask.spec.js';

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
          conditionExpression: "atom._flowDefKey==='set01_atomUserTask'",
          task: {
            fieldsRight: {
              mode: 'allowAllFieldsReadWrite',
              details: {
                'test-flow:purchaseOrderDetail': {
                  mode: 'allowAllFieldsReadWrite',
                },
              },
            },
          },
        },
      },
      {
        id: 'activity_1',
        name: 'Review',
        type: 'activityUserTask',
        options: {
          assignees: {
            // users: '1,2',
            // roles: '1,2',
            vars: 'flowUser',
          },
          confirmation: false,
          bidding: false,
          completionCondition: {
            // passed: 1,
            // rejected: '100%',
          },
          // rejectedNode:null,
          // allowRejectTask: true,
          // allowCancelFlow: false,
          allowForward: true,
          allowSubstitute: true,
          fieldsRight: {
            mode: 'allowSpecificFields',
            basic: { read: true, write: false },
            fields: [
              { name: 'atomName', read: true, write: true },
              { name: 'description', read: true, write: true },
            ],
          },
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
  atomName: 'Test_Set01_Atom_UserTask',
  atomStaticKey: 'set01_atomUserTask',
  atomRevision: 4,
  description: '',
  content: JSON.stringify(content),
};
export default definition;
