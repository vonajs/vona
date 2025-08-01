import type { IDecoratorEntityOptions } from '../types/onion/entity.ts';
import { createBeanDecorator } from 'vona';
import { mergeFieldsOpenapiMetadata } from 'vona-module-a-openapi';

// const __tableNames = new Set();

export function Entity<T extends IDecoratorEntityOptions<any>>(options?: T): ClassDecorator;
export function Entity<T extends IDecoratorEntityOptions<any>>(table?: string, options?: Omit<T, 'table'>): ClassDecorator;
export function Entity<T extends IDecoratorEntityOptions<any>>(table?: T | string, options?: T): ClassDecorator {
  if (typeof table === 'string') {
    options = Object.assign({}, options, { table });
  } else {
    options = table || {} as any;
  }
  // // tableName
  // const tableName = options.table;
  // if (__tableNames.has(tableName)) {
  //   throw new Error(`entity table exists: ${tableName}`);
  // }
  // __tableNames.add(tableName);
  return createBeanDecorator('entity', options, false, target => {
    mergeFieldsOpenapiMetadata(target);
  });
}
