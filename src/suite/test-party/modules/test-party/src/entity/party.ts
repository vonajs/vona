import { EntityItemBase } from '@cabloy/core';

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
