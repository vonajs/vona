import { Local } from 'vona';
import { LocalIoInnerQueuePushDirect } from './local.ioInner/local.ioInner_queuePushDirect.js';

@Local()
export class LocalIoInner extends LocalIoInnerQueuePushDirect {}
