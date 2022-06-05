import express from 'express';

import rateLimit from 'express-rate-limit';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { Server as httpServer, createServer } from 'http';
import cors from 'cors';
import { connect, Mongoose } from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import { requestLoggerMiddleware } from '~/presentation/middlewares';
import { setupExpressRoutes } from './presentation/controllers';
import { setupPassport } from './setupPassport';
import { logger } from './utils/logger';
import { setupSwagger } from './setupSwagger';

/*****************************
 * Main Process              *
 *****************************/
export class WebevApp {
  app: express.Express;
  port: number;
  httpServer: httpServer;
  mongoClient: Mongoose;

  constructor() {
    this.app = null;
    this.port = parseInt(process.env.PORT) || 8000;
    this.httpServer = null;
  }

  async init(): Promise<void> {
    this.setupExpress();

    await this.setupDB();

    setupPassport(this.app);

    if (process.env.ENABLE_SWAGGER === 'true') {
      setupSwagger(this.app);
    }

    // setup Express Routes
    this.setupRoutes();

    this.httpServer = createServer(this.app);
    this.httpServer.listen(this.port, () => {
      logger(`Express app listening at http://localhost:${this.port}`);
    });
  }

  setupExpress() {
    this.app = express();

    this.app.use(cors({ origin: true, credentials: true }));
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

  async setupDB() {
    const mongoUrl = process.env.MONGO_URI;
    if (!mongoUrl) throw new Error('MONGO_URIがセットされていません');

    this.mongoClient = await connect(mongoUrl);

    this.app.use(
      session({
        rolling: true,
        secret: process.env.SESSION_SECRET || 'Please set session secret!',
        resave: false,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'develop',
          maxAge: 1000 * 60 * 60 + 24 * 30, // 30day
        },
        store: MongoStore.create({
          mongoUrl,
        }),
      }),
    );
  }

  setupRoutes() {
    setupExpressRoutes(this.app);
  }
}

const app = new WebevApp();
app.init();
