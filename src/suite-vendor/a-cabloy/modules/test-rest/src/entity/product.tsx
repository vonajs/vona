import type { IDecoratorEntityOptions } from 'vona-module-a-orm';

import { $makeSchema, Api, v } from 'vona-module-a-openapiutils';
import { Entity, EntityBase } from 'vona-module-a-orm';
import z from 'zod';
import { render } from 'zova-rest-cabloy-basic-admin';

import { $locale } from '../.metadata/locales.ts';

export interface IEntityOptionsProduct extends IDecoratorEntityOptions<'_custom'> {}

@Entity<IEntityOptionsProduct>('testRestProduct', {
  openapi: { title: $locale('ProductInfo') },
  fields: {
    _custom: $makeSchema(v.title('Custom'), v.optional(), z.string()),
  },
})
export class EntityProduct extends EntityBase {
  @Api.field(
    v.title($locale('Name')),
    v.min(3, $locale('ZodErrorStringMin')),
    v.required(),
    render.order(1),
    render.cell('basic-table:actionView'),
  )
  name: string;

  @Api.field(v.title($locale('Description')), render.order(2), v.optional())
  description?: string;

  @Api.field(
    v.title($locale('Price')),
    v.min(0, $locale('ZodErrorNumberMin')),
    v.required(),
    render.order(3),
    ZovaRender.field('basic-currency:formFieldCurrency'),
    render.cell('basic-currency:currency'),
  )
  price: number;

  @Api.field(v.title($locale('Quantity')), render.order(4), v.default(0))
  quantity: number;

  @Api.field(
    v.title($locale('Amount')),
    v.required(),
    render.order(5),
    ZovaRender.field('basic-currency:formFieldCurrency'),
    render.cell('basic-currency:currency'),
  )
  amount: number;
}
