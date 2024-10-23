import { Local } from 'vona';
import { LocalIoInnerQueuePushDirect } from './local.ioInner/local.ioInner_queuePushDirect.js';

@Service()
export class ServiceIoInner extends LocalIoInnerQueuePushDirect {}
