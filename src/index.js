import dotenv from 'dotenv';
dotenv.config();
import { setupServer } from './server';
import { initMongoConnection } from './db/initMongoConnection.js';

const start = async () => {
  await initMongoConnection();
  setupServer();
};

start();
