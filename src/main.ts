import express from 'express';

import passport from 'passport';
import session from 'express-session';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

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
    this.setupPassport();
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
    // this.app.use(mongoSanitize());

    this.app.use(requestLoggerMiddleware);
  }

  // setupDB(): Promise<typeof import('mongoose')> {
  //   const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/test';
  //   return mongoose.connect(MONGO_URI);
  // }

  setupRoutes() {
    setupExpressRoutes(this.app);
  }

  setupPassport() {
    //セッションに保存
    passport.serializeUser(function (user: { id: string; name: string }, done) {
      done(null, { id: user.id, name: user.name });
    });

    //セッションから保存されたデータを呼び出し
    passport.deserializeUser(function (
      user: { id: string; name: string },
      done,
    ) {
      done(null, { id: user.id, name: user.name });
    });

    // passport.serializeUser((user, done) => {
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   done(null, (user as any).id);
    // });
    // passport.deserializeUser(async(id, done) => {
    //   try {
    //     const user = await User.findById(id);
    //     if (user == null) {
    //       throw new Error('user not found');
    //     }
    //     done(null, user);
    //   }
    //   catch (err) {
    //     done(err);
    //   }
    // });

    passport.use(
      new GoogleStrategy(
        {
          clientID,
          clientSecret,
          callbackURL,
        },
        function (accessToken, refreshToken, profile, done) {
          if (profile) {
            return done(null, profile);
          }

          return done(null, false);
        },
      ),
    );

    this.app.use(
      session({
        secret: crypto.randomBytes(8).toString('hex'),
        resave: false,
        saveUninitialized: false,
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.get(
      '/auth/google',
      passport.authenticate('google', {
        scope: ['profile', 'email'],
      }),
    );

    this.app.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/',
        session: true,
      }),
      function (req, res, next) {
        console.log(req.user);

        //成功したときの処理
        req.logIn(req.user, (err) => {
          if (err) {
            return next();
          }
          return res.redirect('/');
        });
      },
    );
  }
}

const app = new WebevApp();
app.init();
