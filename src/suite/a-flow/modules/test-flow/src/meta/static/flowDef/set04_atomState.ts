import { __ThisModule__ } from '../../../.metadata/this.js';
import Listener from './listener/set04_atomState.spec.js';

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
          conditionExpression: "atom._flowDefKey==='set04_atomState'",
          task: {
            // atomState: 1, // state: drafting
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
          atomStateTip: 'Reviewing',
          // atomState: 2,
          assignees: {
            // users: '1,2',
            // roles: '1,2',
            // vars: 'flowUser',
            vars: 'auto',
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
            mode: 'allowAllFieldsReadWrite',
            details: {
              'test-flow:purchaseOrderDetail': {
                mode: 'allowAllFieldsReadWrite',
              },
            },
          },
        },
      },
      {
        id: 'activity_2',
        name: 'PayMoney',
        type: 'activityUserTask',
        options: {
          // atomState: 3,
          assignees: {
            vars: 'auto',
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
            mode: 'custom',
            custom: {
              module: 'test-flow',
              schema: 'payMoney',
            },
          },
          fieldsMapping: {
            payMoneyPerson: 'user.id',
            payMoneyTime: 'new Date()',
          },
        },
      },
      {
        id: 'activity_3',
        name: 'ReceiveGoods',
        type: 'activityUserTask',
        options: {
          // atomState: 4,
          assignees: {
            vars: 'auto',
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
            mode: 'custom',
            custom: {
              module: 'test-flow',
              schema: 'receiveGoods',
            },
          },
          fieldsMapping: {
            receiveGoodsPerson: 'user.id',
            receiveGoodsTime: 'new Date()',
          },
        },
      },
      {
        id: 'endEvent_1',
        name: 'End',
        type: 'endEventAtom',
        options: {},
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
        target: 'activity_2',
      },
      {
        id: 'edge_3',
        source: 'activity_2',
        target: 'activity_3',
      },
      {
        id: 'edge_4',
        source: 'activity_3',
        target: 'endEvent_1',
      },
    ],
  },
};
const definition = {
  atomName: 'Test_Set04_Atom_AtomState',
  atomStaticKey: 'set04_atomState',
  atomRevision: 3,
  description: '',
  content: JSON.stringify(content),
};
export default definition;
