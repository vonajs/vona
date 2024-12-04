import { appMetadata, appResource, Constructable, IDecoratorEntityOptions } from 'vona';

export const SymbolDecoratorRuleColumn = Symbol('SymbolDecoratorRuleColumn');

export function column<T>(classEntity: Constructable<T>, extract: (classEntity: T) => any): string {
  const columns = appMetadata.getMetadata(SymbolDecoratorRuleColumn, classEntity.prototype);
  return extract(columns as any);
}

export function columns<T>(classEntity: Constructable<T>, extract: (classEntity: T) => any | any[]): string[] {
  const columns = appMetadata.getMetadata(SymbolDecoratorRuleColumn, classEntity.prototype);
  const names = extract(columns as any);
  return Array.isArray(names) ? names : [names];
}

export function tableColumns<T>(
  classEntity: Constructable<T>,
  extract: (classEntity: T) => any | any[],
): Record<string, string[]> {
  // tableName
  const beanOptionsEntity = appResource.getBean(classEntity);
  const entityOptions = beanOptionsEntity?.options as IDecoratorEntityOptions;
  const tableName = entityOptions.table!;
  // columns
  const names = columns(classEntity, extract);
  return { [tableName]: names };
}
