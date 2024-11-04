import { appResource } from '../../../index.js';
import { Constructable, IDecoratorModelOptions } from '../index.js';
import { parseModuleName } from './util.js';

const __tableNames = new Set();

export function Model(options: IDecoratorModelOptions): ClassDecorator {
  return function (target) {
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
      scene: 'model',
      name: options.name,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
