import type { Constructable } from 'vona';
import type { IDecoratorEntityOptions } from '../types/onion/entity.ts';
import { appMetadata, appResource, cast } from 'vona';
import { SymbolDecoratorRuleColumn } from 'vona-module-a-openapi';

export function $column<T>(classEntity: (() => Constructable<T>) | Constructable<T>, extract: (classEntity: T) => any): string {
  return $columns(classEntity, extract) as unknown as string;
}

export function $columns<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
  extract: (classEntity: T) => any | any[] | undefined,
): string | string[] | undefined {
  const columnsAll = $columnsAll(classEntity);
  return extract(columnsAll as any);
}

export function $columnsAll<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
): Record<string, string> {
  const columns = appMetadata.getMetadata<Record<string, string>>(SymbolDecoratorRuleColumn, _prepareClassEntity(classEntity).prototype);
  return columns!;
}

export function $tableColumns<T>(
  classEntity: (() => Constructable<T>) | Constructable<T>,
  extract: (classEntity: T) => any | any[] | undefined,
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
