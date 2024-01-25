export * from '../local/io.js';
export * from '../local/messageClass.js';
export * from '../local/message.js';

import { LocalIo } from '../local/io.js';
import { LocalMessageClass } from '../local/messageClass.js';
import { LocalMessage } from '../local/message.js';

export interface IModuleLocal {
  io: LocalIo;
  messageClass: LocalMessageClass;
  message: LocalMessage;
}
