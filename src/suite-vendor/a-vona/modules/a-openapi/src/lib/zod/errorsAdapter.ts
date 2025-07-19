import type { VonaApplication } from 'vona';
import { setErrorMapDefault, setErrorMapSchema } from '@cabloy/zod-errors-custom';
import { setSchemaRefCustom } from '@cabloy/zod-query';
import { createSchemaRef } from '../schema/schema.ts';

export function errorsAdapter(app: VonaApplication) {
  setErrorMapDefault((text: string, ...args: any[]) => {
    return app.meta.text(text, ...args);
  });
  setErrorMapSchema((text: string, ...args: any[]) => {
    return app.meta.text(text, ...args);
  });
  setSchemaRefCustom((params: any[]) => {
    return createSchemaRef(params);
  });
}
