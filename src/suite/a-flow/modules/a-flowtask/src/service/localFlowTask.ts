import { Service } from 'vona';
import { LocalFlowTaskMessage } from './local.flow.task/local.flow.task_message.js';

@Service()
export class ServiceLocalFlowTask extends LocalFlowTaskMessage {}
