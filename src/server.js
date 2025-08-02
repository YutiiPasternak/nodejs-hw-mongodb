import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouters from './routers/contacts.js';
import process from 'process';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import router from './routers/index.js';
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(cookieParser());

  app.use('/', router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
};
