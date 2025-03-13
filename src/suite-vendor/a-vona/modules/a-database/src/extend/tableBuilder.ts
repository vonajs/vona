import type { VonaApplication } from 'vona';
import type { TableIdentityType } from '../types/tableIdentity.ts';
import knex from 'knex';

export interface IBasicFieldsOptions {
  idType?: TableIdentityType;
  id?: boolean;
  timestamps?: boolean;
  deleted?: boolean;
  iid?: boolean;
}

export function ExtendTableBuilder(_app: VonaApplication) {
  knex.TableBuilder.extend('basicFields', function (options?: IBasicFieldsOptions) {
    options = options || ({} as IBasicFieldsOptions);
    if (options.id !== false) {
      if (options.idType === 'string') {
        this.bigIncrements();
      } else if (options.idType === 'number') {
        this.increments();
      } else {
        this.increments();
      }
    }
    if (options.timestamps !== false) this.timestamps(true, true, true);
    if (options.deleted !== false) this.boolean('deleted').defaultTo(false);
    if (options.iid !== false) this.integer('iid').defaultTo(0);
    return this;
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
      int0(columnName: string): Knex.ColumnBuilder;
      int1(columnName: string): Knex.ColumnBuilder;
      atomId(): Knex.ColumnBuilder;
      itemId(): Knex.ColumnBuilder;
      userId(): Knex.ColumnBuilder;
      atomClassId(): Knex.ColumnBuilder;
      atomIdMain(): Knex.ColumnBuilder;
      atomClassIdMain(): Knex.ColumnBuilder;
      description(length?: number): Knex.ColumnBuilder;
      content(useText?: boolean): Knex.ColumnBuilder;
    }
  }
}
