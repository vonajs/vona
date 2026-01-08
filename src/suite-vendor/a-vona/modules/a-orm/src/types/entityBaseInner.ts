import { Api, v } from 'vona-module-a-openapiutils';
import { $locale } from '../.metadata/locales.ts';
import { EntityBaseEmpty } from './entityBaseEmpty.ts';

export class EntityBaseInner extends EntityBaseEmpty {
  @Api.field(
    v.title($locale('CreatedAt')),
    v.order(-2, 'max'),
    v.filterDateRange(),
    v.date(),
  )
  createdAt: Date;

  @Api.field(
    v.title($locale('UpdatedAt')),
    v.order(-1, 'max'),
    v.filterDateRange(),
    v.date(),
  )
  updatedAt: Date;

  @Api.field(v.title($locale('Deleted')), v.visible(false), v.default(false))
  deleted: boolean;

  @Api.field(v.title($locale('InstanceId')), v.visible(false), v.default(0))
  iid: number;
}
