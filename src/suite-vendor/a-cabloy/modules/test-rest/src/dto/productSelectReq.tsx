import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import z from 'zod';

import { EntityProduct } from '../entity/product.tsx';

export interface IDtoOptionsProductSelectReq extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductSelectReq>({
  openapi: { filter: { table: 'testRestProduct' } },
  fields: {
    name: z.string().optional(),
    createdAt: z.string().optional(),
  },
})
export class DtoProductSelectReq extends $Dto.queryPage(EntityProduct, ['name', 'createdAt']) {}
