import { Bean } from 'vona';
import { LocalFlowTaskMessage } from './local.flow.task/local.flow.task_message.js';

@Bean({ scene: 'service.local' })
export class ServiceLocalFlowTask extends LocalFlowTaskMessage {}
