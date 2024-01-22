const Listener = require('./listener/set03_gatewayInclusive.spec.js');

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
        name: 'Gateway Inclusive(out)',
        type: 'gatewayInclusive',
      },
      {
        id: 'activity_1',
        name: 'ActivityNone',
        type: 'activityNone',
      },
      {
        id: 'activity_2',
        name: 'ActivityNone',
        type: 'activityNone',
      },
      {
        id: 'activity_3',
        name: 'ActivityNone',
        type: 'activityNone',
      },
      {
        id: 'gateway_2',
        name: 'Gateway Inclusive(in)',
        type: 'gatewayInclusive',
      },
      {
        id: 'endEvent_1',
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
        name: 'x===1',
        source: 'gateway_1',
        target: 'activity_1',
        options: {
          conditionExpression: "context.vars.get('x')===1",
        },
      },
      {
        id: 'edge_3',
        name: 'x===2',
        source: 'gateway_1',
        target: 'activity_2',
        options: {
          conditionExpression: "context.vars.get('x')===2",
        },
      },
      {
        id: 'edge_4',
        name: 'x===1',
        source: 'gateway_1',
        target: 'activity_3',
        options: {
          conditionExpression: "context.vars.get('x')===1",
        },
      },
      {
        id: 'edge_5',
        name: '',
        source: 'activity_1',
        target: 'gateway_2',
      },
      {
        id: 'edge_6',
        name: '',
        source: 'activity_2',
        target: 'gateway_2',
      },
      {
        id: 'edge_7',
        name: '',
        source: 'activity_3',
        target: 'gateway_2',
      },
      {
        id: 'edge_8',
        name: '',
        source: 'gateway_2',
        target: 'endEvent_1',
      },
    ],
  },
};
const definition = {
  atomName: 'Test_Set03_Gateway_Inclusive',
  atomStaticKey: 'set03_gatewayInclusive',
  atomRevision: 2,
  description: '',
  content: JSON.stringify(content),
};
module.exports = definition;
