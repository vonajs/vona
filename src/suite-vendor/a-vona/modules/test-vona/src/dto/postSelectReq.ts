import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { $makeSchema, Api, v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import z from 'zod';
import { render } from 'zova-rest-cabloy-basic-admin';

import { EntityPost } from '../entity/post.ts';

export interface IDtoOptionsPostSelectReq extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPostSelectReq>({
  openapi: { filter: { table: 'testVonaPost' } },
  fields: {
    createdAt: $makeSchema(
      render.order(-2, 'max'),
      ZovaRender.field('basic-date:formFieldDate'),
      render.cell('basic-date:date'),
      ZovaRender.field('basic-date:formFieldDateRange', undefined, 'filter'),
      v.filterTransform('a-web:dateRange'),
      z.string().optional(),
    ),
  },
})
export class DtoPostSelectReq extends $Dto.queryPage(EntityPost, ['title', 'createdAt']) {
  // @Api.field(v.optional())
  // title?: string;

  @Api.field(
    v.filter({
      table: 'testVonaUser',
      joinOn: ['userId', 'testVonaUser.id'],
      originalName: 'name',
      op: '_eqI_',
    }),
    v.optional(),
  )
  userName?: string;

  // @Api.field(v.filterTransform('a-web:dateRange', { separator: '~' }), v.optional())
  // createdAt?: string;
}
