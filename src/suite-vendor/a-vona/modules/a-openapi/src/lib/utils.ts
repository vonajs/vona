import type { Constructable } from 'vona';
import type { TypeDecoratorRules } from 'vona-module-a-openapiutils';
import type { TypeOpenapiMetadata } from '../types/rest.ts';
import { isClass, isEmptyObject } from '@cabloy/utils';
import { ZodMetadata } from '@cabloy/zod-openapi';
import { appMetadata, appResource, cast, deepExtend, registerMappedClassMetadataKey } from 'vona';
import { SymbolDecoratorRule } from 'vona-module-a-openapiutils';
import { z } from 'zod';

export function getTargetDecoratorRules(target: object, disableRegisterMetadata?: boolean): TypeDecoratorRules {
  if (!disableRegisterMetadata) {
    registerMappedClassMetadataKey(target, SymbolDecoratorRule, {
      partialClass: (meta: z.ZodType) => {
        return meta.optional();
      },
    });
  }
  return appMetadata.getOwnMetadataMap(true, SymbolDecoratorRule, target);
}

export function getTargetDecoratorRuleColumns(target: object): string[] {
  const rules = getTargetDecoratorRules(target, true);
  return Object.keys(rules);
}

export function getTargetDecoratorRuleColumnsMap(target: object): Record<string, string> {
  const columns = getTargetDecoratorRuleColumns(target);
  const map = {};
  for (const column of columns) {
    map[column] = column;
  }
  return map;
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
    const schemaCurrent = rules[key];
    const metadataCurrent = schemaCurrent ? ZodMetadata.getOpenapiMetadata(schemaCurrent) : undefined;
    if (Object.prototype.hasOwnProperty.call(field, 'parseAsync')) {
      const schema: z.ZodType = field as any;
      const metadataCustom = ZodMetadata.getOpenapiMetadata(schema);
      rules[key] = schema.openapi(deepExtend({}, metadataCurrent, metadataCustom));
    } else {
      // use deepExtend for sure strict
      if (schemaCurrent) {
        rules[key] = schemaCurrent.openapi(deepExtend({}, metadataCurrent, field));
      } else {
        rules[key] = z.any().openapi(deepExtend({}, field));
      }
    }
  }
}

export function mergeFieldOpenapiMetadata(target: object, prop: string, fieldRule?: TypeOpenapiMetadata | z.ZodType) {
  if (!fieldRule) return;
  // rules
  const rules = getTargetDecoratorRules(target);
  // rule
  const schemaCurrent = rules[prop];
  const metadataCurrent = schemaCurrent ? ZodMetadata.getOpenapiMetadata(schemaCurrent) : undefined;
  // merge
  if (Object.prototype.hasOwnProperty.call(fieldRule, 'parseAsync')) {
    const schema: z.ZodType = fieldRule as any;
    if (isEmptyObject(metadataCurrent)) {
      rules[prop] = schema;
    } else {
      const metadataCustom = ZodMetadata.getOpenapiMetadata(schema);
      rules[prop] = schema.openapi(deepExtend({}, metadataCurrent, metadataCustom));
    }
  } else {
    // use deepExtend for sure strict
    if (schemaCurrent) {
      if (!isEmptyObject(fieldRule)) {
        rules[prop] = schemaCurrent.openapi(deepExtend({}, metadataCurrent, fieldRule));
      }
    } else {
      rules[prop] = z.any().openapi(deepExtend({}, fieldRule));
    }
  }
}

export function prepareClassType<T>(classType: (() => Constructable<T>) | Constructable<T>): Constructable<T> {
  return isClass(classType) ? classType as Constructable<T> : cast(classType)();
}
