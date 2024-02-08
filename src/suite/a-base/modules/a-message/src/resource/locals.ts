export * from '../local/message.js';
export * from '../local/virtual.ioMessageUniformBase.js';

import { LocalMessage } from '../local/message.js';
import { BeanIoMessageUniformBase } from '../local/virtual.ioMessageUniformBase.js';

export interface IModuleLocal {
  message: LocalMessage;
  ioMessageUniformBase: BeanIoMessageUniformBase;
}
