import type { IDecoratorEntityOptions } from '../types/onion/entity.ts';
import { createBeanDecorator } from 'vona';

// const __tableNames = new Set();

export function Entity(options?: IDecoratorEntityOptions): ClassDecorator;
export function Entity(table?: string, options?: Omit<IDecoratorEntityOptions, 'table'>): ClassDecorator;
export function Entity(table?: IDecoratorEntityOptions | string, options?: IDecoratorEntityOptions | string): ClassDecorator {
  if (typeof table === 'string') {
    options = Object.assign({}, options, { table });
  } else {
    options = table || {};
  }
  // // tableName
  // const tableName = options.table;
  // if (__tableNames.has(tableName)) {
  //   throw new Error(`entity table exists: ${tableName}`);
  // }
  // __tableNames.add(tableName);
  return createBeanDecorator('entity', options);
}
