import type { IDecoratorEntityOptions } from '../types/onion/entity.ts';
import { createBeanDecorator } from 'vona';
import { mergeFieldsOpenAPIMetadata } from 'vona-module-a-openapi';

// const __tableNames = new Set();

export function Entity<T extends IDecoratorEntityOptions<any>>(options?: Omit<T, '_fieldsMore_'>): ClassDecorator;
export function Entity<T extends IDecoratorEntityOptions<any>>(table?: string, options?: Omit<T, '_fieldsMore_' | 'table'>): ClassDecorator;
export function Entity<T extends IDecoratorEntityOptions<any>>(table?: T | string, options?: Omit<T, '_fieldsMore_'>): ClassDecorator {
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
  return createBeanDecorator('entity', options, false, false, target => {
    mergeFieldsOpenAPIMetadata(target);
  });
}
