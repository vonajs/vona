import { extendZodWithOpenApi } from '@cabloy/zod-to-openapi';
import { z } from 'zod';

export function zodExtendOpenApi() {
  extendZodWithOpenApi(z);
}
