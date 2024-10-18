import { Bean } from 'vona';
import { BeanIoMessageBase } from 'vona-module-a-socketio';

@Bean({ scene: 'io.message' })
export class IoMessageWorkflow extends BeanIoMessageBase {}
