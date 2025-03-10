import type { VonaApplication } from 'vona';
import knex from 'knex';
import TableBuilder from 'knex/lib/schema/tablebuilder.js';
import { __ThisModule__ } from '../.metadata/this.ts';

export function ExtendKnex(app: VonaApplication) {
  ExtendTableBuilder(app);
}

export function ExtendTableBuilder(app: VonaApplication) {
  const scope = app.bean.scope(__ThisModule__);
  const configTableIdentity = scope.config.tableIdentity;
  // user
  const configFieldUser = configTableIdentity.fields.user[configTableIdentity.current.user];
  delete TableBuilder.prototype.userIdPrimary;
  delete TableBuilder.prototype.userId;
  knex.TableBuilder.extend('userIdPrimary', function (this: knex.Knex.TableBuilder) {
    return configFieldUser.userIdPrimary.call(this);
  });
  knex.TableBuilder.extend('userId', function (this: knex.Knex.TableBuilder, columnName: string) {
    return configFieldUser.userId.call(this, columnName);
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
