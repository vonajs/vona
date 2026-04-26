import type { ISchemaRenderComponentPresetRecord, TypeSchemaScene } from 'vona-module-a-openapi';
import type z from 'zod';

import { _generalSchemaRest } from './utils.ts';

export function schemaRenderComponent<
  K extends keyof ISchemaRenderComponentPresetRecord,
  T extends z.ZodType,
>(name: K, options?: ISchemaRenderComponentPresetRecord[K], scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options2 =
      options !== undefined ? { render: name, preset: { [name]: options } } : { render: name };
    return _generalSchemaRest(schema, options2, scene);
  };
}
