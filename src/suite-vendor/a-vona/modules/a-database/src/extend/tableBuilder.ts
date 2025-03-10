import type { VonaApplication } from 'vona';
import knex from 'knex';
import TableBuilder from 'knex/lib/schema/tablebuilder.js';

export interface IBasicFieldsOptions {
  id?: boolean;
  timestamps?: boolean;
  deleted?: boolean;
  iid?: boolean;
}

export function ExtendTableBuilder(_app: VonaApplication) {
  delete TableBuilder.prototype.basicFields;
  knex.TableBuilder.extend('basicFields', function (options?: IBasicFieldsOptions) {
    options = options || ({} as IBasicFieldsOptions);
    if (options.id !== false) this.increments();
    if (options.timestamps !== false) this.timestamps(true, true, true);
    if (options.deleted !== false) this.boolean('deleted').defaultTo(false);
    if (options.iid !== false) this.integer('iid').defaultTo(0);
    return this;
  });
  delete TableBuilder.prototype.int0;
  knex.TableBuilder.extend('int0', function (this: knex.Knex.TableBuilder, columnName: string) {
    return this.integer(columnName).defaultTo(0);
  });
  delete TableBuilder.prototype.int1;
  knex.TableBuilder.extend('int1', function (this: knex.Knex.TableBuilder, columnName: string) {
    return this.integer(columnName).defaultTo(1);
  });
  ['description'].forEach(method => {
    delete TableBuilder.prototype[method];
    knex.TableBuilder.extend(method, function (this: knex.Knex.TableBuilder, length: number = 255) {
      return this.string(method, length);
    });
  });
  ['content'].forEach(method => {
    delete TableBuilder.prototype[method];
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
