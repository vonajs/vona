export * from '../model/auth.js';
export * from '../model/authProvider.js';

import { ModelAuth } from '../model/auth.js';
import { ModelAuthProvider } from '../model/authProvider.js';

export interface IModuleModel {
  auth: ModelAuth;
  authProvider: ModelAuthProvider;
}
