import type { Constructable } from 'vona';
import type { ITableRecord, TypeEntityMeta } from '../types/index.ts';
import type { IDecoratorEntityOptions } from '../types/onion/entity.ts';
import { isClass } from '@cabloy/utils';
import { appMetadata, appResource, cast } from 'vona';
import { SymbolDecoratorRuleColumn } from 'vona-module-a-openapiutils';

export function $column<T>(key: keyof T): keyof T {
  return key;
}

export function $columns<T>(key?: (keyof T) | Array<keyof T> | undefined): (keyof T) | Array<keyof T> | undefined {
  return key;
}

export function $columnsAll<T, TableName extends boolean>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
  withTableName?: TableName,
): TableName extends true ? TypeEntityMeta<T> : Omit<TypeEntityMeta<T>, '$table'> {
  const classEntity2 = _prepareClassEntity(classEntity);
  const columns = appMetadata.getMetadata<Record<string, string>>(SymbolDecoratorRuleColumn, classEntity2.prototype);
  if (!withTableName) return columns! as any;
  // tableName
  const tableName = $tableName(classEntity2);
  return { ...columns, $table: tableName } as any;
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

function _prepareClassEntity<T>(classEntity: (() => Constructable<T>) | Constructable<T>): Constructable<T> {
  return isClass(classEntity) ? classEntity as Constructable<T> : cast(classEntity)();
}
