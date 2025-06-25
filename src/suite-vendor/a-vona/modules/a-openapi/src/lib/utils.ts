import type { Constructable } from 'vona';
import type { TypeOpenAPIMetadata } from '../types/rest.ts';
import { appMetadata, appResource, cast, deepExtend, registerMappedClassMetadataKey } from 'vona';
import { SymbolDecoratorRule, SymbolDecoratorRuleColumn } from 'vona-module-a-openapiutils';
import { z } from 'zod';

export function getTargetDecoratorRules(target: object) {
  registerMappedClassMetadataKey(target, SymbolDecoratorRule, {
    partialClass: (meta: z.ZodSchema) => {
      return meta.optional();
    },
  });
  return appMetadata.getOwnMetadataMap(true, SymbolDecoratorRule, target);
}

export function getTargetDecoratorRuleColumns(target: object) {
  registerMappedClassMetadataKey(target, SymbolDecoratorRuleColumn);
  return appMetadata.getOwnMetadataMap(true, SymbolDecoratorRuleColumn, target);
}

export function mergeFieldsOpenAPIMetadata(target: Constructable) {
  // rules
  const rules = getTargetDecoratorRules(target.prototype);
  // beanOptions
  const beanOptions = appResource.getBean(target);
  const fields = cast(beanOptions?.options)?.fields;
  if (!fields) return;
  for (const key in fields) {
    const field: TypeOpenAPIMetadata | z.ZodSchema = fields[key];
    if (!field) continue;
    const schemaCurrent: z.ZodSchema | undefined = rules[key] as any;
    if (Object.prototype.hasOwnProperty.call(field, 'parseAsync')) {
      const schema: z.ZodSchema = field as any;
      rules[key] = schema.openapi(deepExtend({}, schemaCurrent?._def.openapi?.metadata, schema._def.openapi?.metadata));
    } else {
      // use deepExtend for sure strict
      if (schemaCurrent) {
        rules[key] = schemaCurrent.openapi(deepExtend({}, schemaCurrent._def.openapi?.metadata, field));
      } else {
        rules[key] = z.any().openapi(deepExtend({}, field));
      }
    }
  }
}
