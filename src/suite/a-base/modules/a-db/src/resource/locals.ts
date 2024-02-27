export * from '../local/local.client.js';
export * from '../local/local.transaction.js';

import { LocalClient } from '../local/local.client.js';
import { LocalTransaction } from '../local/local.transaction.js';

export interface IModuleLocal {
  client: LocalClient;
  transaction: LocalTransaction;
}
