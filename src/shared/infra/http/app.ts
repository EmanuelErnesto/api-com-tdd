import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import db from '../knex/databaseShared';
import ErrorHandler from './middlewares/ErrorHandler';

const app = express();

// db.on('query', query => {
//   console.log({
//     sql: query.sql,
//     bindings: query.bindings ? query.bindings.join(',') : '',
//   });
// })
//   .on('query-response', response => {
//     console.log(response);
//   })
//   .on('error', error => console.log(error));

app.use(express.json());
app.use(cors());

app.use('/api/v1', routes);
app.use(ErrorHandler);

export { app };
