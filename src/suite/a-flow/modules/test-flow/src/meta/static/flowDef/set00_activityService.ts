import { __ThisModule__ } from '../../../resource/this.js';
import Listener from './listener/set00_activityService.spec.js';

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
        id: 'activity_1',
        name: 'ActivityService',
        type: 'activityService',
        options: {
          bean: {
            module: __ThisModule__,
            name: 'test',
          },
          parameterExpression: 'context.vars.get(`echo`)',
        },
      },
      {
        id: 'activity_2',
        name: 'ActivityNone',
        type: 'activityNone',
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
        target: 'endEvent_1',
      },
    ],
  },
};
const definition = {
  atomName: 'Test_Set00_Activity_Service',
  atomStaticKey: 'set00_activityService',
  atomRevision: 1,
  description: '',
  content: JSON.stringify(content),
};
export default definition;
