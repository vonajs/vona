import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import z from 'zod';
import { EntityProduct } from '../entity/product.tsx';

export interface IDtoOptionsProductQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductQuery>({
  openapi: { filter: { table: 'testRestProduct' } },
  fields: {
    createdAt: z.string().optional(),
  },
})
export class DtoProductQuery extends $Dto.queryPage(EntityProduct, ['name', 'createdAt']) {
  // remove .min(3)
  @Api.field(v.optional())
  name?: string;
}
