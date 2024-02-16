export * from '../model/party.js';
export * from '../model/partyExpense.js';

import { ModelParty } from '../model/party.js';
import { ModelPartyExpense } from '../model/partyExpense.js';

export interface IModuleModel {
  party: ModelParty;
  partyExpense: ModelPartyExpense;
}
