import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapiutils';
import { Entity, EntityBase } from 'vona-module-a-orm';
import { $locale } from '../.metadata/locales.ts';

export interface IEntityOptionsProduct extends IDecoratorEntityOptions<'_custom'> {}

@Entity<IEntityOptionsProduct>('startTestProduct', {
  openapi: { title: $locale('ProductInfo') },
  fields: {
    _custom: {
      title: 'Custom',
      rest: {
        render: 'text',
      },
    },
  },
})
export class EntityProduct extends EntityBase {
  @Api.field(
    v.title($locale('Name')),
    v.order(1),
    v.render('actionView', 'table'),
    v.min(3, $locale('ZodErrorStringMin')),
    v.required(),
  )
  name: string;

  @Api.field(
    v.title($locale('Description')),
    v.order(2),
    v.optional(),
  )
  description?: string;

  @Api.field(
    v.title($locale('Price')),
    v.order(3),
    v.currency(),
    v.min(0, $locale('ZodErrorNumberMin')),
    v.required(),
  )
  price: number;

  @Api.field(
    v.title($locale('Quantity')),
    v.order(4),
    v.default(0),
  )
  quantity: number;

  @Api.field(
    v.title($locale('Amount')),
    v.order(5),
    v.currency(),
    v.required(),
  )
  amount: number;
}
