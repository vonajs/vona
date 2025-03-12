import type knex from 'knex';
import type { VonaApplication } from 'vona';
import type { TableIdentityType } from 'vona-module-a-database';
import type { IServiceRecord } from 'vona-module-a-web';

export function config(_app: VonaApplication) {
  return {
    passport: {
      refreshAuthToken: {
        recreate: true,
        refresh: true,
      },
    },
    tableIdentity: {
      current: {
        user: 'number' as TableIdentityType,
        auth: 'number' as TableIdentityType,
      },
      fields: {
        user: {
          number: {
            userIdPrimary(this: knex.Knex.TableBuilder) {
              return this.increments();
            },
            userId(this: knex.Knex.TableBuilder, columnName: string) {
              return this.integer(columnName); // default is null
            },
          },
          string: {
            userIdPrimary(this: knex.Knex.TableBuilder) {
              return this.bigIncrements();
            },
            userId(this: knex.Knex.TableBuilder, columnName: string) {
              return this.bigInteger(columnName); // default is null
            },
          },
        },
        auth: {
          number: {
            authIdPrimary(this: knex.Knex.TableBuilder) {
              return this.increments();
            },
            authId(this: knex.Knex.TableBuilder, columnName: string) {
              return this.integer(columnName);
            },
          },
          string: {
            authIdPrimary(this: knex.Knex.TableBuilder) {
              return this.bigIncrements();
            },
            authId(this: knex.Knex.TableBuilder, columnName: string) {
              return this.bigInteger(columnName);
            },
          },
        },
      },
    },
    adapter: {
      authToken: 'home-user:authTokenAdapter' as keyof IServiceRecord,
      passport: 'home-user:passportAdapter' as keyof IServiceRecord,
      userInner: 'home-user:userInnerAdapter' as keyof IServiceRecord,
    },
  };
}
