import type { Constructable } from 'vona';
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

export function $columnsAll<T, TableName extends boolean, Comment extends boolean>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
  withTableName?: TableName,
  withComment?: Comment,
): TableName extends true ?
      (Comment extends true ? TypeEntityMeta<T> : Omit<TypeEntityMeta<T>, '$comment'>) :
      (Comment extends true ? Omit<TypeEntityMeta<T>, '$table'> : Omit<TypeEntityMeta<T>, '$table' | '$comment'>) {
  const classEntity2 = _prepareClassEntity(classEntity);
  let columns = appMetadata.getMetadata<Record<string, string>>(SymbolDecoratorRuleColumn, classEntity2.prototype);
  if (withTableName) {
    const tableName = $tableName(classEntity2);
    columns = { ...columns, $table: tableName } as any;
  }
  if (withComment) {
    const comments = $tableComments(classEntity2);
    columns = { ...columns, $comment: comments } as any;
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
  // rules
  const rules = getTargetDecoratorRules(_prepareClassEntity(classEntity).prototype);
  const comments = {};
  for (const key in rules) {
    const rule = rules[key] as z.ZodSchema;
    const title = rule._def.openapi?.metadata?.title || rule._def.openapi?.metadata?.description;
    comments[key] = title ? app.meta.text(title) : '';
  }
  return comments;
}

function _prepareClassEntity<T>(classEntity: (() => Constructable<T>) | Constructable<T>): Constructable<T> {
  return isClass(classEntity) ? classEntity as Constructable<T> : cast(classEntity)();
}
