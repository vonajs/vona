import { __ThisModule__ } from '../../../resource/this.js';

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
          conditionExpression: "atom._flowDefKey==='set02_behaviorOvertime'",
        },
      },
      {
        id: 'activity_1',
        name: 'Review',
        type: 'activityUserTask',
        options: {
          assignees: {
            vars: 'flowUser',
          },
        },
        behaviors: [
          {
            id: 'behavior_1',
            name: 'Overtime',
            type: 'overtime',
            color: '#FF3B30',
            options: {
              cancelActivity: true,
              timeDuration: 3000,
            },
          },
        ],
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
      {
        id: 'edge_3',
        source: 'activity_1',
        target: 'startEvent_1',
        behavior: 'behavior_1',
      },
    ],
  },
};
const definition = {
  atomName: 'Test_Set02_Behavior_Overtime',
  atomStaticKey: 'set02_behaviorOvertime',
  atomRevision: 3,
  description: '',
  content: JSON.stringify(content),
};
export default definition;
