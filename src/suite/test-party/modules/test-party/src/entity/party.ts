import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('testParty')
export class EntityParty extends EntityItemBase {
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
