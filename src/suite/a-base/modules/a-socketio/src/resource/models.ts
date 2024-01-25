export * from '../model/messageClass.js';
export * from '../model/message.js';
export * from '../model/messageSync.js';

import { ModelMessageClass } from '../model/messageClass.js';
import { ModelMessage } from '../model/message.js';
import { ModelMessageSync } from '../model/messageSync.js';

export interface IModuleModel {
  messageClass: ModelMessageClass;
  message: ModelMessage;
  messageSync: ModelMessageSync;
}
