import { Api, v } from 'vona-module-a-openapiutils';
import { render } from 'zova-rest-cabloy-basic-admin';

import { $locale } from '../.metadata/locales.ts';
import { EntityBaseEmpty } from './entityBaseEmpty.ts';

export class EntityBaseInner extends EntityBaseEmpty {
  @Api.field(
    v.title($locale('CreatedAt')),
    v.filterTransform('a-web:dateRange'),
    render.order(-2, 'max'),
    render.field('basic-date:formFieldDate'),
    render.cell('basic-date:date'),
    render.field('basic-date:formFieldDateRange', undefined, 'filter'),
  )
  createdAt: Date;

  @Api.field(
    v.title($locale('UpdatedAt')),
    v.filterTransform('a-web:dateRange'),
    render.order(-1, 'max'),
    render.field('basic-date:formFieldDate'),
    render.cell('basic-date:date'),
    render.field('basic-date:formFieldDateRange', undefined, 'filter'),
  )
  updatedAt: Date;

  @Api.field(v.title($locale('Deleted')), v.default(false), render.visible(false))
  deleted: boolean;

  @Api.field(v.title($locale('InstanceId')), v.default(0), render.visible(false))
  iid: number;
}
