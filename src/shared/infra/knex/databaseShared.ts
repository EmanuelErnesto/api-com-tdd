import knex from 'knex';
import knexfile from './knexfile';

const databaseShared = knex(knexfile);

export default databaseShared;
