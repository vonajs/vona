import { EntityItemBase } from 'vona-module-a-base';

export interface EntityParty extends EntityItemBase {
  personCount: number;
  partyTypeCode: number;
  partyTime: Date;
  partyCountry: string;
  partyCity: string;
  partyExpenseCount: number;
  partyExpenseAmount: number;
  partySummary: string;
  partyOverPerson: number;
  partyOverTime: Date;
}
