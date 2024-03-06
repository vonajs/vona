import { BeanBase } from '../../beanBase.js';
import { IModelOptions } from './type.js';
import { appResource } from '../../../core/resource.js';
import { IDecoratorModelOptions } from '../../../decorator/index.js';

export class BeanModelBaseInner extends BeanBase {
  protected get __beanOptions() {
    return appResource.getBean((<any>this).__beanFullName__);
  }

  protected get __modelOptions() {
    const beanOptions = this.__beanOptions;
    return beanOptions?.options as IDecoratorModelOptions;
  }

  get table(): string {
    return this.__modelOptions.table;
  }

  get options(): IModelOptions {
    return this.__modelOptions.options;
  }

  get disableDeleted() {
    return this.options.disableDeleted === undefined
      ? this.app.config.model.disableDeleted
      : this.options.disableDeleted;
  }

  get disableInstance() {
    return this.options.disableInstance === undefined
      ? this.app.config.model.disableInstance
      : this.options.disableInstance;
  }

  async columns(_tableName?: string): Promise<any> {
    // xx
  }

  columnsClear(_tableName) {
    // xx
  }

  columnsClearAll() {
    // xx
  }

  async prepareData(_item) {
    // xx
  }

  async default<T = any>(_data?: T): Promise<T> {
    return _data!;
    // xx
  }

  async create(_data, ..._args) {
    return 0;
    // xx
  }

  async write(_data, ..._args) {
    // xx
  }

  // ///////////

  async query(..._args) {
    throw new Error('------------ model.query');
    // xx
  }

  async queryOne(..._args) {
    throw new Error('------------ model.queryOne');
    // xx
  }

  async select(..._args) {
    // xx
  }

  async count(..._args) {
    // xx
  }

  async get(..._args) {
    // xx
  }

  async insert(..._args) {
    // xx
  }

  async update(..._args) {
    // xx
  }

  async delete(..._args) {
    // xx
  }
}
