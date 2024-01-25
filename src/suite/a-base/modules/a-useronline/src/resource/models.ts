export * from '../model/userOnline.js';
export * from '../model/userOnlineHistory.js';

import { ModelUserOnline } from '../model/userOnline.js';
import { ModelUserOnlineHistory } from '../model/userOnlineHistory.js';

export interface IModuleModel {
  userOnline: ModelUserOnline;
  userOnlineHistory: ModelUserOnlineHistory;
}
