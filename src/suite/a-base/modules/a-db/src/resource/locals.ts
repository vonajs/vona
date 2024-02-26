export * from '../local/local.client.js';

import { LocalClient } from '../local/local.client.js';

export interface IModuleLocal {
  client: LocalClient;
}
