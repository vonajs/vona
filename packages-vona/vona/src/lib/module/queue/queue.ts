import { VonaApplication } from '../../../types/index.js';
import { QueueClient } from './queueClient.js';

export default function (app: VonaApplication, modules) {
  // all queues
  const ebQueues = (app.meta.queues = {});
}
