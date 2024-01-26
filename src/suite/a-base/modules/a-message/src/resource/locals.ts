export * from '../local/ioMessageUniformBase.js';
export * from '../local/message.js';

import { LocalIoMessageUniformBase } from '../local/ioMessageUniformBase.js';
import { LocalMessage } from '../local/message.js';

export interface IModuleLocal {
  ioMessageUniformBase: LocalIoMessageUniformBase;
  message: LocalMessage;
}
