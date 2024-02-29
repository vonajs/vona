import { CabloyApplication } from '@cabloy/core';
import { ExtendSchemaBuilder } from './schemaBuilder.js';

export function ExtendKnex(app: CabloyApplication) {
  ExtendSchemaBuilder(app);
}
