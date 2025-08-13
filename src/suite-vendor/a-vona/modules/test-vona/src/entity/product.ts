import type { IDecoratorEntityOptions, TableIdentity } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';
import { Entity, EntityBase } from 'vona-module-a-orm';
import { $locale } from '../.metadata/index.ts';

export interface IEntityOptionsProduct extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsProduct>('testVonaProduct', { independent: true })
export class EntityProduct extends EntityBase {
  @Api.field(v.openapi({ title: $locale('Name') }))
  name: string;

  @Api.field(v.title($locale('Price')))
  price: number;

  @Api.field(v.title($locale('Quantity')))
  quantity: number;

  @Api.field(v.title($locale('Amount')))
  amount: number;

  @Api.field(v.tableIdentity())
  orderId: TableIdentity;
}
