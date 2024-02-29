import knex from 'knex';

knex.SchemaBuilder.extend('fetchDatabases', function () {
  return this;
});
