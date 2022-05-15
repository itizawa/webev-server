import express from 'express';

import { Server as httpServer, createServer } from 'http';
import cors from 'cors';
// import * as mongoose from 'mongoose';
// import * as mongoSanitize from 'express-mongo-sanitize';
import { requestLoggerMiddleware } from '~/middlewares';
import { setupExpressRoutes } from './presentation/controllers';

/*****************************
 * Main Process              *
 *****************************/
export class WebevApp {
  app: express.Express;
  port: number;
  httpServer: httpServer;

  constructor() {
    this.app = null;
    this.port = parseInt(process.env.PORT) || 8000;
    this.httpServer = null;
  }

  async init(): Promise<void> {
    this.setupExpress();
    // await this.setupDB();

    // setup Express Routes
    this.setupRoutes();

    this.httpServer.listen(this.port, () => {
      console.log(`Express app listening at http://localhost:${this.port}`);
    });
  }

  setupExpress() {
    this.app = express();

    this.app.use(cors());
    this.app.use(express.json());
    // this.app.use(mongoSanitize());

    this.app.use(requestLoggerMiddleware);
    this.httpServer = createServer(this.app);
  }

  // setupDB(): Promise<typeof import('mongoose')> {
  //   const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/test';
  //   return mongoose.connect(MONGO_URI);
  // }

  setupRoutes() {
    setupExpressRoutes(this.app);
  }
}

const app = new WebevApp();
app.init();
