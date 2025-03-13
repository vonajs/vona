import type { VonaApplication } from 'vona';
import type { TableIdentityType } from '../types/tableIdentity.ts';
import knex from 'knex';
import { __ThisModule__ } from '../.metadata/this.ts';

export interface IBasicFieldsOptions {
  id?: boolean;
  timestamps?: boolean;
  deleted?: boolean;
  iid?: boolean;
}

export function ExtendTableBuilder(app: VonaApplication) {
  const scope = app.bean.scope(__ThisModule__);
  function _basicFields(this: knex.Knex.TableBuilder, options?: IBasicFieldsOptions, idType?: TableIdentityType) {
    options = options || ({} as IBasicFieldsOptions);
    if (options.id !== false) {
      const _idType = idType ?? scope.config.table.idType;
      if (_idType === 'string') {
        this.bigIncrements();
      } else if (_idType === 'number') {
        this.increments();
      }
    }
    if (options.timestamps !== false) this.timestamps(true, true, true);
    if (options.deleted !== false) this.boolean('deleted').defaultTo(false);
    if (options.iid !== false) this.integer('iid').defaultTo(0);
    return this;
  }

  knex.TableBuilder.extend('basicFields', function (this: knex.Knex.TableBuilder, options?: IBasicFieldsOptions) {
    _basicFields.call(this, options, undefined);
    return this;
  });
  knex.TableBuilder.extend('basicFieldsSimple', function (this: knex.Knex.TableBuilder, options?: IBasicFieldsOptions) {
    _basicFields.call(this, options, 'number');
    return this;
  });
  knex.TableBuilder.extend('userId', function (this: knex.Knex.TableBuilder, columnName?: string) {
    const _idType = scope.config.table.idType;
    if (_idType === 'string') {
      return this.bigInteger(columnName ?? 'userId'); // default value is null
    } else if (_idType === 'number') {
      return this.integer(columnName ?? 'userId'); // default value is null
    }
  });
  knex.TableBuilder.extend('int0', function (this: knex.Knex.TableBuilder, columnName: string) {
    return this.integer(columnName).defaultTo(0);
  });
  knex.TableBuilder.extend('int1', function (this: knex.Knex.TableBuilder, columnName: string) {
    return this.integer(columnName).defaultTo(1);
  });
  ['description'].forEach(method => {
    knex.TableBuilder.extend(method, function (this: knex.Knex.TableBuilder, length: number = 255) {
      return this.string(method, length);
    });
  });
  ['content'].forEach(method => {
    knex.TableBuilder.extend(method, function (this: knex.Knex.TableBuilder, useText?: boolean) {
      return useText ? this.text(method) : this.json(method);
    });
  });
}

declare module 'knex' {
  namespace Knex {
    interface TableBuilder {
      basicFields(options?: IBasicFieldsOptions): Knex.TableBuilder;
      basicFieldsSimple(options?: IBasicFieldsOptions): Knex.TableBuilder;
      userId(columnName?: string): Knex.ColumnBuilder;
      int0(columnName: string): Knex.ColumnBuilder;
      int1(columnName: string): Knex.ColumnBuilder;
      description(length?: number): Knex.ColumnBuilder;
      content(useText?: boolean): Knex.ColumnBuilder;
    }
  }
}
