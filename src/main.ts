import express from 'express';

import rateLimit from 'express-rate-limit';

import { Server as httpServer, createServer } from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import { requestLoggerMiddleware } from '~/middlewares';
import { setupExpressRoutes } from './presentation/controllers';
import { setupPassport } from './setupPassport';

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
    await this.setupDB();

    // setup Express Routes
    setupPassport(this.app);
    this.setupRoutes();

    this.httpServer = createServer(this.app);
    this.httpServer.listen(this.port, () => {
      console.log(`Express app listening at http://localhost:${this.port}`);
    });
  }

  setupExpress() {
    this.app = express();

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      }),
    );
    this.app.use(mongoSanitize());

    this.app.use(requestLoggerMiddleware);
  }

  setupDB() {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error('MONGO_URIがセットされていません');
    return mongoose.connect(MONGO_URI);
  }

  setupRoutes() {
    setupExpressRoutes(this.app);
  }
}

const app = new WebevApp();
app.init();
