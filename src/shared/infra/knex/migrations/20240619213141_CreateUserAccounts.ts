import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('accounts', tableColumn => {
    tableColumn.increments('id').primary(),
      tableColumn.string('name').notNullable(),
      tableColumn
        .integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('accounts');
}
