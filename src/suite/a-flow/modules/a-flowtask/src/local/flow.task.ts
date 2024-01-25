import { Bean } from '@cabloy/core';
import { LocalFlowTaskMessage } from './local.flow.task/local.flow.task_message.js';

@Bean({ scene: 'local.flow' })
export class LocalFlowTask extends LocalFlowTaskMessage {}
