import type { Constructable } from 'vona';
import type { TypeOpenapiMetadata } from 'vona-module-a-openapi';
import type z from 'zod';
import type { ITableRecord, TypeEntityMeta } from '../types/index.ts';
import type { IDecoratorEntityOptions } from '../types/onion/entity.ts';
import { isClass } from '@cabloy/utils';
import { appMetadata, appResource, cast, useApp } from 'vona';
import { getTargetDecoratorRules } from 'vona-module-a-openapi';
import { SymbolDecoratorRuleColumn } from 'vona-module-a-openapiutils';

export function $column<T>(key: keyof T): keyof T {
  return key;
}

export function $columns<T>(key?: (keyof T) | Array<keyof T> | undefined): (keyof T) | Array<keyof T> | undefined {
  return key;
}

export function $columnsAll<T, TableName extends boolean, Meta extends boolean>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
  withTableName?: TableName,
  withMeta?: Meta,
): TableName extends true ?
      (Meta extends true ? TypeEntityMeta<T> : Omit<TypeEntityMeta<T>, '$comment' | '$default'>) :
      (Meta extends true ? Omit<TypeEntityMeta<T>, '$table'> : Omit<TypeEntityMeta<T>, '$table' | '$comment' | '$default'>) {
  const classEntity2 = _prepareClassEntity(classEntity);
  let columns = appMetadata.getMetadata<Record<string, string>>(SymbolDecoratorRuleColumn, classEntity2.prototype);
  if (withTableName) {
    const tableName = $tableName(classEntity2);
    columns = { ...columns, $table: tableName } as any;
  }
  if (withMeta) {
    const comments = $tableComments(classEntity2);
    const defaults = $tableDefaults(classEntity2);
    columns = { ...columns, $comment: comments, $default: defaults } as any;
  }
  return columns as any;
}

export function $tableColumns<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
  key?: (keyof T) | Array<keyof T> | undefined,
): Record<keyof ITableRecord, (keyof T) | Array<keyof T> | undefined> {
  // tableName
  const tableName = $tableName(classEntity);
  return { [tableName]: key } as any;
}

export function $tableName<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
): keyof ITableRecord {
  const beanOptionsEntity = appResource.getBean(_prepareClassEntity(classEntity));
  const entityOptions = beanOptionsEntity?.options as IDecoratorEntityOptions;
  return entityOptions.table!;
}

export function $tableComments<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
): Record<string, string> {
  const app = useApp();
  const classEntity2 = _prepareClassEntity(classEntity);
  // rules
  const rules = getTargetDecoratorRules(classEntity2.prototype);
  const comments = {};
  for (const key in rules) {
    const rule = rules[key] as z.ZodSchema;
    const comment = rule._def.openapi?.metadata?.description || rule._def.openapi?.metadata?.title;
    comments[key] = comment ? app.meta.text(comment) : '';
  }
  // table comment
  const beanOptions = appResource.getBean(classEntity2);
  if (beanOptions) {
    const openapi: TypeOpenapiMetadata = cast(beanOptions.options)?.openapi;
    const comment = openapi?.description || openapi?.title;
    cast(comments).$table = comment ? app.meta.text(comment) : '';
  }
  // ok
  return comments;
}

export function $tableDefaults<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
): Record<string, string> {
  const classEntity2 = _prepareClassEntity(classEntity);
  // rules
  const rules = getTargetDecoratorRules(classEntity2.prototype);
  const defaults = {};
  for (const key in rules) {
    const rule = rules[key] as z.ZodSchema;
    defaults[key] = rule._def.openapi?.metadata?.default;
  }
  // ok
  return defaults;
}

function _prepareClassEntity<T>(classEntity: (() => Constructable<T>) | Constructable<T>): Constructable<T> {
  return isClass(classEntity) ? classEntity as Constructable<T> : cast(classEntity)();
}
