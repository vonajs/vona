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
  // auth
  const configFieldAuth = configTableIdentity.fields.auth[configTableIdentity.current.auth];
  delete TableBuilder.prototype.authIdPrimary;
  delete TableBuilder.prototype.authId;
  knex.TableBuilder.extend('authIdPrimary', function (this: knex.Knex.TableBuilder) {
    return configFieldAuth.authIdPrimary.call(this);
  });
  knex.TableBuilder.extend('authId', function (this: knex.Knex.TableBuilder, columnName: string) {
    return configFieldAuth.authId.call(this, columnName);
  });
}

declare module 'knex' {
  namespace Knex {
    interface TableBuilder {
      userIdPrimary(): Knex.ColumnBuilder;
      userId(columnName: string): Knex.ColumnBuilder;
      authIdPrimary(): Knex.ColumnBuilder;
      authId(columnName: string): Knex.ColumnBuilder;
    }
  }
}
