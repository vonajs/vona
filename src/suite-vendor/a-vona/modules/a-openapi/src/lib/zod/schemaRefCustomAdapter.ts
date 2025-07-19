import type { VonaApplication } from 'vona';
import { setSchemaRefCustom } from '@cabloy/zod-query';
import { createSchemaRef } from '../schema/schema.ts';

export function schemaRefCustomAdapter(_app: VonaApplication) {
  setSchemaRefCustom((params: any[]) => {
    return createSchemaRef(params);
  });
}
