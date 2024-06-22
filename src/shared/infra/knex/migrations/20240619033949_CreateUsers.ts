import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', tableColumn => {
    tableColumn.increments('id').primary();
    tableColumn.string('name').notNullable();
    tableColumn.string('email').notNullable().unique();
    tableColumn.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
