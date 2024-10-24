import { Bean } from 'vona';
import { LocalFlowFlowMessage } from './local.flow.flow/local.flow.flow_message.js';

@Bean({ scene: 'service.local' })
export class ServiceLocalFlow extends LocalFlowFlowMessage {}
