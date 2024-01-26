export * from '../local/redis.js';
export * from '../local/procedure.js';
export * from '../local/ioInner.js';
export * from '../local/io.js';
export * from '../local/messageClass.js';
export * from '../local/message.js';

import { LocalRedis } from '../local/redis.js';
import { LocalProcedure } from '../local/procedure.js';
import { LocalIoInner } from '../local/ioInner.js';
import { LocalIo } from '../local/io.js';
import { LocalMessageClass } from '../local/messageClass.js';
import { LocalMessage } from '../local/message.js';

export interface IModuleLocal {
  redis: LocalRedis;
  procedure: LocalProcedure;
  ioInner: LocalIoInner;
  io: LocalIo;
  messageClass: LocalMessageClass;
  message: LocalMessage;
}
