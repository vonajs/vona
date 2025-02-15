import type { VonaApplication } from 'vona';
import { ExtendSchemaBuilder } from './schemaBuilder.js';
import { ExtendTableBuilder } from './tableBuilder.js';

export function ExtendKnex(app: VonaApplication) {
  if (app.meta.inApp) {
    ExtendSchemaBuilder(app);
    ExtendTableBuilder(app);
  }
}
