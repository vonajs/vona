import { CabloyApplication } from 'vona';
import { ExtendSchemaBuilder } from './schemaBuilder.js';
import { ExtendTableBuilder } from './tableBuilder.js';

export function ExtendKnex(app: CabloyApplication) {
  if (app.meta.inApp) {
    ExtendSchemaBuilder(app);
    ExtendTableBuilder(app);
  }
}
