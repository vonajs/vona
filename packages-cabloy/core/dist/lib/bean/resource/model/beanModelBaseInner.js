"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanModelBaseInner = void 0;
const is_type_of_1 = __importDefault(require("is-type-of"));
const beanBase_js_1 = require("../../beanBase.js");
const resource_js_1 = require("../../../core/resource.js");
let __columns = {};
class BeanModelBaseInner extends beanBase_js_1.BeanBase {
    get __beanOptions() {
        return resource_js_1.appResource.getBean(this.__beanFullName__);
    }
    get __modelOptions() {
        const beanOptions = this.__beanOptions;
        return beanOptions?.options;
    }
    get table() {
        return this.__modelOptions.table;
    }
    get options() {
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
    async columns(tableName) {
        tableName = tableName || this.table;
        let columns = __columns[tableName];
        if (!columns) {
            const list = await this.ctx.db.query(`show columns from ${this.ctx.db.format('??', tableName)}`);
            columns = __columns[tableName] = {};
            for (const item of list) {
                columns[item.Field] = item;
            }
        }
        return columns;
    }
    columnsClear(tableName) {
        tableName = tableName || this.table;
        const exists = __columns[tableName];
        delete __columns[tableName];
        return exists;
    }
    columnsClearAll() {
        const exists = Object.keys(__columns).length > 0;
        __columns = {};
        return exists;
    }
    async prepareData(item) {
        // columns
        const columns = await this.columns();
        // data
        const data = {};
        for (const columnName in columns) {
            if (item[columnName] !== undefined) {
                data[columnName] = item[columnName];
            }
        }
        return data;
    }
    async default(data) {
        data = data || {};
        // columns
        const columns = await this.columns();
        for (const columnName in columns) {
            const column = columns[columnName];
            data[columnName] = this._coerceTypeOfDefault(column);
        }
        return data;
    }
    _coerceTypeOfDefault(column) {
        // type
        let type = column.Type;
        const pos = type.indexOf('(');
        if (pos > -1)
            type = type.substring(0, pos);
        // default value
        const value = column.Default;
        // coerce
        if (value === null)
            return value;
        if (['timestamp'].includes(type) && value === 'CURRENT_TIMESTAMP')
            return new Date();
        if (['bit', 'bool'].includes(type))
            return Boolean(value);
        if (['float', 'double'].includes(type))
            return Number(value);
        if (['tinyint', 'smallint', 'mediumint', 'int', 'bigint'].includes(type))
            return Number(value);
        // others
        return value;
    }
    async create(data, ...args) {
        const data2 = await this.prepareData(data);
        const res = await this.insert(data2, ...args);
        return res.insertId;
    }
    async write(data, ...args) {
        const data2 = await this.prepareData(data);
        return await this.update(data2, ...args);
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
        if (!Array.isArray(rows))
            return this._rowCheck(rows);
        for (const row of rows) {
            this._rowCheck(row);
        }
    }
    // ///////////
    async query(...args) {
        return await this.ctx.db.query(...args);
    }
    async queryOne(...args) {
        return await this.ctx.db.queryOne(...args);
    }
    async select(...args) {
        const _args = [];
        if (this.table)
            _args.push(this.table);
        for (const arg of args)
            _args.push(arg);
        _args[1] = _args[1] || {};
        _args[1].where = _args[1].where || {};
        this._rowCheck(_args[1].where);
        return await this.ctx.db.select(..._args);
    }
    async count(...args) {
        const _args = [];
        if (this.table)
            _args.push(this.table);
        for (const arg of args)
            _args.push(arg);
        _args[1] = _args[1] || {};
        this._rowCheck(_args[1]);
        return await this.ctx.db.count(..._args);
    }
    async get(...args) {
        // console.log(this.constructor.name, arguments);
        const _args = [];
        if (this.table)
            _args.push(this.table);
        for (const arg of args)
            _args.push(arg);
        _args[1] = _args[1] || {};
        // if (_args[1].id) {
        //   return this.ctx.db[method].apply(this.ctx.db, _args);
        // }
        this._rowCheck(_args[1]);
        return await this.ctx.db.get(..._args);
    }
    async insert(...args) {
        if (args.length === 0) {
            args.push({});
        }
        if (this.table) {
            args.unshift(this.table);
        }
        this._insertRowsCheck(args[1]);
        return await this.ctx.db.insert(...args);
    }
    async update(...args) {
        const _args = [];
        if (this.table)
            _args.push(this.table);
        for (const arg of args)
            _args.push(arg);
        if (_args[2] && _args[2].where) {
            this._rowCheck(_args[2].where);
        }
        return await this.ctx.db.update(..._args);
    }
    async delete(...args) {
        const _args = [];
        if (this.table)
            _args.push(this.table);
        for (const arg of args)
            _args.push(arg);
        _args[1] = _args[1] || {};
        this._rowCheck(_args[1]);
        if (this.table && !this.disableDeleted) {
            const sql = this.ctx.db.format('UPDATE ?? SET deleted=1 ', [_args[0]]) + this.ctx.db._where(_args[1]);
            return this.ctx.db.query(sql);
        }
        return await this.ctx.db.delete(..._args);
    }
}
exports.BeanModelBaseInner = BeanModelBaseInner;
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
            if (is_type_of_1.default.function(this.ctx.db[method])) {
                return function (...args) {
                    return this.ctx.db[method](...args);
                };
            }
            // property
            return this.ctx.db[method];
        },
    });
});
//# sourceMappingURL=beanModelBaseInner.js.map