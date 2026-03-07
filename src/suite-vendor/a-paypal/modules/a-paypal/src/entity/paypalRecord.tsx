import type { TableIdentity } from 'table-identity';
import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import type { IPaypalOrderRecordOptions, IPaypalOrderRecordPayload } from '../types/paypal.ts';
import { Api, v } from 'vona-module-a-openapiutils';
import { Entity, EntityBase } from 'vona-module-a-orm';

export interface IEntityOptionsPaypalRecord extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsPaypalRecord>('paypalRecord')
export class EntityPaypalRecord extends EntityBase {
  @Api.field(v.tableIdentity())
  userId: TableIdentity;

  @Api.field(v.default(0))
  status: number;

  @Api.field()
  prepayId: string;

  @Api.field()
  payload: IPaypalOrderRecordPayload;

  @Api.field()
  options: IPaypalOrderRecordOptions;
}
