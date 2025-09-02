import { Api, v } from 'vona-module-a-openapi';
import z from 'zod';

export class DtoQueryBase {
  @Api.field(v.optional(), v.array(String, { separator: ',' }))
  columns?: string[];

  @Api.field(v.optional(), z.object({}).passthrough())
  where?: object;

  @Api.field(v.optional(), z.union([z.string(), z.array(z.array(z.string()))]))
  orders?: string | string[][];
}
