const Listener = require('./listener/set03_gatewayExclusive.spec.js');

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
        id: 'gateway_1',
        name: 'Gateway Exclusive',
        type: 'gatewayExclusive',
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
        name: '',
        source: 'startEvent_1',
        target: 'gateway_1',
      },
      {
        id: 'edge_2',
        name: 'x=1',
        source: 'gateway_1',
        target: 'endEvent_1',
        options: {
          conditionExpression: "context.vars.get('x')===1",
        },
      },
      {
        id: 'edge_3',
        name: 'x=2',
        source: 'gateway_1',
        target: 'endEvent_2',
        options: {
          conditionExpression: "context.vars.get('x')===2",
        },
      },
    ],
  },
};
const definition = {
  atomName: 'Test_Set03_Gateway_Exclusive',
  atomStaticKey: 'set03_gatewayExclusive',
  atomRevision: 2,
  description: '',
  content: JSON.stringify(content),
};
export default definition;
