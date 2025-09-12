import type { Constructable } from 'vona';
import type { TypeOpenapiMetadata } from '../types/rest.ts';
import { isClass } from '@cabloy/utils';
import { ZodMetadata } from '@cabloy/zod-openapi';
import { appMetadata, appResource, cast, deepExtend, registerMappedClassMetadataKey } from 'vona';
import { SymbolDecoratorRule, SymbolDecoratorRuleColumn } from 'vona-module-a-openapiutils';
import { z } from 'zod';

export function getTargetDecoratorRules(target: object) {
  registerMappedClassMetadataKey(target, SymbolDecoratorRule, {
    partialClass: (meta: z.ZodType) => {
      return meta.optional();
    },
  });
  return appMetadata.getOwnMetadataMap(true, SymbolDecoratorRule, target);
}

export function getTargetDecoratorRuleColumns(target: object) {
  registerMappedClassMetadataKey(target, SymbolDecoratorRuleColumn);
  return appMetadata.getOwnMetadataMap(true, SymbolDecoratorRuleColumn, target);
}

export function mergeFieldsOpenapiMetadata(target: Constructable) {
  // rules
  const rules = getTargetDecoratorRules(target.prototype);
  // beanOptions
  const beanOptions = appResource.getBean(target);
  const fields = cast(beanOptions?.options)?.fields;
  if (!fields) return;
  for (const key in fields) {
    const field: TypeOpenapiMetadata | z.ZodType = fields[key];
    if (!field) continue;
    const schemaCurrent: z.ZodType | undefined = rules[key] as any;
    const metadataCurrent = schemaCurrent ? ZodMetadata.getOpenapiMetadata(schemaCurrent) : undefined;
    if (Object.prototype.hasOwnProperty.call(field, 'parseAsync')) {
      const schema: z.ZodType = field as any;
      // todo: metadata中是否包含refId，如果包含就要排除，然后把metadata合并至field中
      const metadataCustom = ZodMetadata.getOpenapiMetadata(schema);
      const refIdCurrent = ZodMetadata.getRefId(schemaCurrent!);
      const refId = ZodMetadata.getRefId(schema);
      rules[key] = schema.openapi(deepExtend({}, metadataCurrent, metadataCustom));
      const refIdNew = ZodMetadata.getRefId(rules[key] as any);
      console.log(refIdNew);
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

export function prepareClassType<T>(classType: (() => Constructable<T>) | Constructable<T>): Constructable<T> {
  return isClass(classType) ? classType as Constructable<T> : cast(classType)();
}
