import type { IDecoratorEntityOptions } from 'vona-module-a-orm';

import { $makeMetadata, $makeSchema, Api, v } from 'vona-module-a-openapiutils';
import { Entity, EntityBase } from 'vona-module-a-orm';
import z from 'zod';
import { ZovaRender } from 'zova-rest-cabloy-basic-admin';

import { $locale } from '../.metadata/locales.ts';

export interface IEntityOptionsProduct extends IDecoratorEntityOptions<'_custom'> {}

@Entity<IEntityOptionsProduct>('testRestProduct', {
  openapi: { title: $locale('ProductInfo') },
  fields: {
    id: $makeMetadata(ZovaRender.order(1, 'core')),
    createdAt: $makeMetadata(
      ZovaRender.order(-2, 'max'),
      ZovaRender.field('basic-date:formFieldDate'),
      ZovaRender.cell('basic-date:date'),
      ZovaRender.field('basic-date:formFieldDateRange', undefined, 'filter'),
      v.filterTransform('a-web:dateRange'),
    ),
    updatedAt: $makeMetadata(
      ZovaRender.order(-1, 'max'),
      ZovaRender.field('basic-date:formFieldDate'),
      ZovaRender.cell('basic-date:date'),
      ZovaRender.field('basic-date:formFieldDateRange', undefined, 'filter'),
      v.filterTransform('a-web:dateRange'),
    ),
    deleted: $makeMetadata(ZovaRender.visible(false)),
    iid: $makeMetadata(ZovaRender.visible(false)),
    _custom: $makeSchema(v.title('Custom'), v.optional(), z.string()),
  },
})
export class EntityProduct extends EntityBase {
  @Api.field(
    v.title($locale('Name')),
    v.min(3, $locale('ZodErrorStringMin')),
    v.required(),
    ZovaRender.order(1),
    ZovaRender.cell('basic-table:actionView'),
  )
  name: string;

  @Api.field(v.title($locale('Description')), v.optional(), ZovaRender.order(2))
  description?: string;

  @Api.field(
    v.title($locale('Price')),
    v.min(0, $locale('ZodErrorNumberMin')),
    v.required(),
    ZovaRender.order(3),
    ZovaRender.field('basic-currency:formFieldCurrency'),
    ZovaRender.cell('basic-currency:currency'),
  )
  price: number;

  @Api.field(v.title($locale('Quantity')), v.default(0), ZovaRender.order(4))
  quantity: number;

  @Api.field(
    v.title($locale('Amount')),
    v.required(),
    ZovaRender.order(5),
    ZovaRender.field('basic-currency:formFieldCurrency'),
    ZovaRender.cell('basic-currency:currency'),
  )
  amount: number;
}
