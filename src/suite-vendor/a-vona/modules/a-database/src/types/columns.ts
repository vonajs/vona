import type { Constructable } from 'vona';
import type { IDecoratorEntityOptions } from './onion/entity.ts';
import { appMetadata, appResource } from 'vona';
import { SymbolDecoratorRuleColumn } from 'vona-module-a-openapi';

export function $column<T>(classEntity: () => Constructable<T>, extract: (classEntity: T) => any): string {
  return $columns(classEntity, extract) as unknown as string;
}

export function $columns<T>(
  classEntity: () => Constructable<T>,
  extract: (classEntity: T) => any | any[] | undefined,
): string | string[] | undefined {
  const columns = appMetadata.getMetadata(SymbolDecoratorRuleColumn, classEntity().prototype);
  return extract(columns as any);
}

export function $tableColumns<T>(
  classEntity: () => Constructable<T>,
  extract: (classEntity: T) => any | any[] | undefined,
): Record<string, string | string[] | undefined> {
  // tableName
  const beanOptionsEntity = appResource.getBean(classEntity());
  const entityOptions = beanOptionsEntity?.options as IDecoratorEntityOptions;
  const tableName = entityOptions.table!;
  // columns
  const names = $columns(classEntity, extract);
  return { [tableName]: names };
}
