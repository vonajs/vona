import { Bean } from '@cabloy/core';
import { BeanIoMessageBase } from 'cabloy-module-api-a-socketio';

@Bean({ scene: 'io.message' })
export class IoMessageWorkflow extends BeanIoMessageBase {}
