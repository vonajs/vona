import { createBeanDecorator } from 'vona';
import type { IDecoratorEntityOptions } from '../types/onion/entity.js';

const __tableNames = new Set();

export function Entity(options?: IDecoratorEntityOptions): ClassDecorator;
export function Entity(table?: string): ClassDecorator;
export function Entity(options?: IDecoratorEntityOptions | string): ClassDecorator {
  if (!options) options = {};
  if (typeof options === 'string') {
    options = { table: options } as unknown as IDecoratorEntityOptions;
  }
  // tableName
  const tableName = options.table;
  if (__tableNames.has(tableName)) {
    throw new Error(`entity table exists: ${tableName}`);
  }
  __tableNames.add(tableName);
  return createBeanDecorator('entity', options);
}
