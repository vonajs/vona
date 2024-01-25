import { Bean } from '@cabloy/core';
import { LocalFlowFlowMessage } from './local.flow.flow/local.flow.flow_message.js';

@Bean({ scene: 'local.flow' })
export class LocalFlowFlow extends LocalFlowFlowMessage {}
