import { config } from 'dotenv';
config();
import { app } from './app';
const server = app;

const PORT = process.env.WEB_API_PORT;

server.listen(PORT);
