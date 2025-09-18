import type { MetadataKey } from 'vona';
import type { SchemaLike } from 'vona-module-a-openapiutils';
import { appMetadata } from 'vona';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.ts';
import { mergeFieldOpenapiMetadata } from '../utils.ts';

export function Field(...schemaLikes: SchemaLike[]): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const metaType = appMetadata.getDesignType(target, prop);
    const schema = makeSchemaLikes(schemaLikes, metaType);
    mergeFieldOpenapiMetadata(target, prop as string, schema);
  };
}
