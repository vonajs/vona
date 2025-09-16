import type { MetadataKey } from 'vona';
import type { SchemaLike } from 'vona-module-a-openapiutils';
import { appMetadata } from 'vona';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.ts';
import { getTargetDecoratorRules } from '../utils.ts';

export function Field(...schemaLikes: SchemaLike[]): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    // rules
    const rules = getTargetDecoratorRules(target);
    // rule
    const metaType = appMetadata.getDesignType(target, prop);
    rules[prop as string] = makeSchemaLikes(schemaLikes, metaType);
  };
}
