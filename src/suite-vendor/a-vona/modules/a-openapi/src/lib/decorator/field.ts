import type { MetadataKey } from 'vona';
import type { z } from 'zod';
import type { SchemaLike } from '../../types/decorator.ts';
import { appMetadata, registerMappedClassMetadataKey } from 'vona';
import { SymbolDecoratorRule, SymbolDecoratorRuleColumn } from '../../types/decorator.ts';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.ts';

export function Field(...schemaLikes: SchemaLike[]): PropertyDecorator {
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
