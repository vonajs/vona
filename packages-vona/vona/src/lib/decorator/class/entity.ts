import { appResource, IDecoratorEntityOptions } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

const __tableNames = new Set();

export function Entity(options?: IDecoratorEntityOptions): ClassDecorator;
export function Entity(table?: string): ClassDecorator;
export function Entity(options?: IDecoratorEntityOptions | string): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    if (typeof options === 'string') {
      options = { table: options } as unknown as IDecoratorEntityOptions;
    }
    // module
    const module = parseModuleName();
    // tableName
    const tableName = options.table;
    if (__tableNames.has(tableName)) {
      throw new Error(`model table exists: ${tableName}`);
    }
    __tableNames.add(tableName);
    // add
    appResource.addBean({
      module,
      scene: 'entity',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
