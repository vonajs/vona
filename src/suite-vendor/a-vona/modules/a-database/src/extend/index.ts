import type { VonaApplication } from 'vona';
import { ExtendSchemaBuilder } from './schemaBuilder.ts';
import { ExtendTableBuilder } from './tableBuilder.ts';

export function ExtendKnex(app: VonaApplication) {
  if (app.meta.inApp) {
    ExtendSchemaBuilder(app);
    ExtendTableBuilder(app);
  }
}
