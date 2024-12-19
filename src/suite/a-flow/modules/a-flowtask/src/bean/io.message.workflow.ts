import { BeanTemp } from 'vona-module-a-bean';

import { BeanIoMessageBase } from 'vona-module-a-socketio';

@BeanTemp({ scene: 'io.message' })
export class IoMessageWorkflow extends BeanIoMessageBase {}
