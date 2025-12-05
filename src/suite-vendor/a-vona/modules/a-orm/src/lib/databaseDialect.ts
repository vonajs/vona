import type { IDecoratorDatabaseDialectOptions } from '../types/index.ts';
import { createBeanDecorator } from 'vona';

export function DatabaseDialect<T extends IDecoratorDatabaseDialectOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('databaseDialect', options);
}
