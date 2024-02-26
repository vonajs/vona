export * from '../local/local.client.js';
export * from '../local/local.clientFactory.js';

import { LocalClient } from '../local/local.client.js';
import { LocalClientFactory } from '../local/local.clientFactory.js';

export interface IModuleLocal {
  client: LocalClient;
  clientFactory: LocalClientFactory;
}
