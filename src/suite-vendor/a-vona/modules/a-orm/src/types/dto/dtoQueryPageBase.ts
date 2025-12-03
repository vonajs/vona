import { Api, v } from 'vona-module-a-openapi';
import z from 'zod';
import { DtoQueryBase } from './dtoQueryBase.ts';

export class DtoQueryPageBase extends DtoQueryBase {
  @Api.field(z.number().min(1).default(1))
  pageNo: number;

  @Api.field(v.optional(), z.number().min(1))
  pageSize?: number;
}
