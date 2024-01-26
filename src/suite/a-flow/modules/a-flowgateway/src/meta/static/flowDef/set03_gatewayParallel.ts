import Listener from './listener/set03_gatewayParallel.spec.js';

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
        name: 'Gateway Parallel(out)',
        type: 'gatewayParallel',
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
        id: 'gateway_2',
        name: 'Gateway Parallel(in)',
        type: 'gatewayParallel',
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
        name: '',
        source: 'gateway_1',
        target: 'activity_1',
      },
      {
        id: 'edge_3',
        name: '',
        source: 'gateway_1',
        target: 'activity_2',
      },
      {
        id: 'edge_4',
        name: '',
        source: 'activity_1',
        target: 'gateway_2',
      },
      {
        id: 'edge_5',
        name: '',
        source: 'activity_2',
        target: 'gateway_2',
      },
      {
        id: 'edge_6',
        name: '',
        source: 'gateway_2',
        target: 'endEvent_1',
      },
    ],
  },
};
const definition = {
  atomName: 'Test_Set03_Gateway_Parallel',
  atomStaticKey: 'set03_gatewayParallel',
  atomRevision: 1,
  description: '',
  content: JSON.stringify(content),
};
export default definition;
