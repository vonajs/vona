import { appMetadata, MetadataKey, registerMappedClassMetadataKey } from 'vona';
import { z } from 'zod';
import { SchemaLike, SymbolDecoratorRule, SymbolDecoratorRuleColumn } from '../../types/decorator.js';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.js';

export function Rule(...schemaLikes: SchemaLike[]): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    //
    registerMappedClassMetadataKey(target, SymbolDecoratorRule, {
      partialClass: (meta: z.ZodSchema) => {
        return meta.optional();
      },
    });
    // rule
    const metaType = appMetadata.getDesignType(target, prop);
    const rule = makeSchemaLikes(schemaLikes, metaType);
    // rules
    const rules = appMetadata.getOwnMetadataMap(true, SymbolDecoratorRule, target);
    rules[prop] = rule;
    //
    registerMappedClassMetadataKey(target, SymbolDecoratorRuleColumn);
    const columns = appMetadata.getOwnMetadataMap(true, SymbolDecoratorRuleColumn, target);
    columns[prop] = prop;
  };
}
