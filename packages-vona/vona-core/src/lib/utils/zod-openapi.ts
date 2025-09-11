import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

export function zodExtendOpenApi() {
  extendZodWithOpenApi(z);
}
