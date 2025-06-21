import type { Constructable } from 'vona';
import type { TypeMetaEntity } from '../types/entity.ts';
import type { IDecoratorEntityOptions } from '../types/onion/entity.ts';
import { appMetadata, appResource, cast } from 'vona';
import { SymbolDecoratorRuleColumn } from 'vona-module-a-openapi';

export function $column<T>(classEntity: (() => Constructable<T>) | Constructable<T>, extract: (classEntity: TypeMetaEntity<T>) => any): string {
  return $columns(classEntity, extract) as unknown as string;
}

export function $columns<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
  extract: (classEntity: TypeMetaEntity<T>) => any | any[] | undefined,
): string | string[] | undefined {
  const columnsAll = $columnsAll(classEntity, true);
  return extract(columnsAll as any);
}

export function $columnsAll<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
  withTableName?: boolean,
): Record<string, string> {
  const classEntity2 = _prepareClassEntity(classEntity);
  const columns = appMetadata.getMetadata<Record<string, string>>(SymbolDecoratorRuleColumn, classEntity2.prototype);
  if (!withTableName) return columns!;
  // tableName
  const tableName = $tableName(classEntity2);
  return { ...columns, $table: tableName };
}

export function $tableColumns<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
  extract: (classEntity: TypeMetaEntity<T>) => any | any[] | undefined,
): Record<string, string | string[] | undefined> {
  // tableName
  const tableName = $tableName(classEntity);
  // columns
  const names = $columns(classEntity, extract);
  return { [tableName]: names };
}

export function $tableName<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
): string {
  const beanOptionsEntity = appResource.getBean(_prepareClassEntity(classEntity));
  const entityOptions = beanOptionsEntity?.options as IDecoratorEntityOptions;
  return entityOptions.table!;
}

function _prepareClassEntity<T>(classEntity: (() => Constructable<T>) | Constructable<T>): Constructable<T> {
  return classEntity.name ? classEntity as Constructable<T> : cast(classEntity)();
}
