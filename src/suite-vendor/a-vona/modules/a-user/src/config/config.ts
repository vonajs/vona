import type knex from 'knex';
import type { VonaApplication } from 'vona';
import type { IServiceRecord } from 'vona-module-a-web';

export function config(_app: VonaApplication) {
  return {
    tableIdentity: {
      user: {
        userIdPrimary(this: knex.Knex.TableBuilder) {
          return this.increments();
        },
        userId(this: knex.Knex.TableBuilder, columnName: string) {
          return this.integer(columnName); // default is null
        },
      },
      auth: {
        authIdPrimary(this: knex.Knex.TableBuilder) {
          return this.increments();
        },
        authId(this: knex.Knex.TableBuilder, columnName: string) {
          return this.integer(columnName);
        },
      },
    },
    passportAdapter: 'home-user:passportAdapter' as keyof IServiceRecord,
  };
}
