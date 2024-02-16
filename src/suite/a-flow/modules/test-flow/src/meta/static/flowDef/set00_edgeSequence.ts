import Listener from './listener/set00_edgeSequence.spec.js';

const content = {
  listener: Listener,
  process: {
    nodes: [
      {
        id: 'startEvent_1',
        name: 'Start',
        type: 'startEventNone',
      },
      {
        id: 'endEvent_1',
        name: 'End',
        type: 'endEventNone',
      },
      {
        id: 'endEvent_2',
        name: 'End',
        type: 'endEventNone',
      },
    ],
    edges: [
      {
        id: 'edge_1',
        name: 'x=1',
        source: 'startEvent_1',
        target: 'endEvent_1',
        options: {
          conditionExpression: "context.vars.get('x')===1",
        },
      },
      {
        id: 'edge_2',
        name: 'x=2',
        source: 'startEvent_1',
        target: 'endEvent_2',
        options: {
          conditionExpression: `
              contextNode.vars.get('x')===2
            `,
        },
      },
    ],
  },
};
const definition = {
  atomName: 'Test_Set00_Edge_Sequence',
  atomStaticKey: 'set00_edgeSequence',
  atomRevision: 2,
  description: '',
  content: JSON.stringify(content),
};
export default definition;
