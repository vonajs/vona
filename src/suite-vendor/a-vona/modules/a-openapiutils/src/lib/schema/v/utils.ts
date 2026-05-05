import type { TypeFormSchemaScene } from 'vona-module-a-openapi';
import type z from 'zod';

export function _generalSchemaRest<T extends z.ZodType>(
  schema: T,
  options: any,
  scene?: TypeFormSchemaScene,
) {
  return schema.openapi(scene ? { rest: { [scene]: options } } : { rest: options });
}
