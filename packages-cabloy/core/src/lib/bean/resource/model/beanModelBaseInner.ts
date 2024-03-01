import is from 'is-type-of';
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

  async columns(_tableName?: string) {
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

  async default(_data?) {
    // xx
  }

  async create(data, ...args) {
    const data2 = await this.prepareData(data);
    const res = await (<any>this).insert(data2, ...args);
    return res.insertId;
  }

  async write(data, ...args) {
    const data2 = await this.prepareData(data);
    return await (<any>this).update(data2, ...args);
  }

  _rowCheck(row) {
    if ((!this.table || !this.disableInstance) && row.iid === undefined) {
      row.iid = this.ctx.instance.id;
    }
    if (this.table && !this.disableDeleted && row.deleted === undefined) {
      row.deleted = 0;
    }
  }

  _insertRowsCheck(rows) {
    if (!Array.isArray(rows)) return this._rowCheck(rows);
    for (const row of rows) {
      this._rowCheck(row);
    }
  }

  // ///////////

  async query(...args) {
    return await this.ctx.model.query(...args);
  }

  async queryOne(...args) {
    return await this.ctx.model.queryOne(...args);
  }

  async select(...args) {
    const _args = [] as any;
    if (this.table) _args.push(this.table);
    for (const arg of args) _args.push(arg);
    _args[1] = _args[1] || {};
    _args[1].where = _args[1].where || {};
    this._rowCheck(_args[1].where);
    return await this.ctx.model.select(..._args);
  }

  async count(...args) {
    const _args = [] as any;
    if (this.table) _args.push(this.table);
    for (const arg of args) _args.push(arg);
    _args[1] = _args[1] || {};
    this._rowCheck(_args[1]);
    return await this.ctx.model.count(..._args);
  }

  async get(...args) {
    // console.log(this.constructor.name, arguments);
    const _args = [] as any;
    if (this.table) _args.push(this.table);
    for (const arg of args) _args.push(arg);
    _args[1] = _args[1] || {};
    // if (_args[1].id) {
    //   return this.ctx.db[method].apply(this.ctx.db, _args);
    // }
    this._rowCheck(_args[1]);
    return await this.ctx.model.get(..._args);
  }

  async insert(...args) {
    if (args.length === 0) {
      args.push({});
    }
    if (this.table) {
      args.unshift(this.table);
    }
    this._insertRowsCheck(args[1]);
    return await this.ctx.model.insert(...args);
  }

  async update(...args) {
    const _args = [] as any;
    if (this.table) _args.push(this.table);
    for (const arg of args) _args.push(arg);
    if (_args[2] && _args[2].where) {
      this._rowCheck(_args[2].where);
    }
    return await this.ctx.model.update(..._args);
  }

  async delete(...args) {
    const _args = [] as any;
    if (this.table) _args.push(this.table);
    for (const arg of args) _args.push(arg);
    _args[1] = _args[1] || {};
    this._rowCheck(_args[1]);
    if (this.table && !this.disableDeleted) {
      const sql = this.ctx.model.format('UPDATE ?? SET deleted=1 ', [_args[0]]) + this.ctx.model._where(_args[1]);
      return this.ctx.model.query(sql);
    }
    return await this.ctx.model.delete(..._args);
  }
}

[
  'literals', //
  'escape',
  'escapeId',
  'format',
  '_formatValue',
  '_formatWhere',
  '_where',
  '_orders',
  'raw',
  '_query',
  '_selectColumns',
  '_limit',
].forEach(method => {
  Object.defineProperty(BeanModelBaseInner.prototype, method, {
    get() {
      if (is.function(this.ctx.db[method])) {
        return function (this: any, ...args) {
          return this.ctx.db[method](...args);
        };
      }
      // property
      return this.ctx.db[method];
    },
  });
});
