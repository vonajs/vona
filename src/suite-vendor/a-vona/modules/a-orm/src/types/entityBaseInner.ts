import { Api, v } from 'vona-module-a-openapiutils';

import { $locale } from '../.metadata/locales.ts';
import { EntityBaseEmpty } from './entityBaseEmpty.ts';

export class EntityBaseInner extends EntityBaseEmpty {
  @Api.field(
    v.title($locale('CreatedAt')),
    v.renderOrder(-2, 'max'),
    v.renderComponent('date'),
    v.renderComponent('dateRange', undefined, 'filter'),
    v.filterTransform('a-web:dateRange'),
  )
  createdAt: Date;

  @Api.field(
    v.title($locale('UpdatedAt')),
    v.renderOrder(-1, 'max'),
    v.renderComponent('date'),
    v.renderComponent('dateRange', undefined, 'filter'),
    v.filterTransform('a-web:dateRange'),
  )
  updatedAt: Date;

  @Api.field(v.title($locale('Deleted')), v.visible(false), v.default(false))
  deleted: boolean;

  @Api.field(v.title($locale('InstanceId')), v.visible(false), v.default(0))
  iid: number;
}
