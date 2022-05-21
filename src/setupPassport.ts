import { Express } from 'express';

import passport from 'passport';
import session from 'express-session';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import crypto from 'crypto';
import { FindOrCreateUserUseCase } from './application/useCases/user';
import { UserRepository } from './infrastructure/repositories';
import { User } from './domain/User';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

const userRepository = new UserRepository();

const findOrCreateUserUseCase = new FindOrCreateUserUseCase(userRepository);

export const setupPassport = (app: Express) => {
  //セッションに保存
  passport.serializeUser(function (user: User, done) {
    done(null, user);
  });

  //セッションから保存されたデータを呼び出し
  passport.deserializeUser(function (user: User, done) {
    done(null, user);
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

  app.use(
    session({
      secret: crypto.randomBytes(8).toString('hex'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      session: true,
    }),
    async (req, res, next) => {
      const requestUser = req.user as {
        emails: { value: string }[];
        displayName: string;
      };

      const user = await findOrCreateUserUseCase.execute(
        requestUser.emails[0].value,
        requestUser.displayName,
      );

      //成功したときの処理
      req.logIn(user, (err) => {
        if (err) {
          return next();
        }
        return res.redirect('/');
      });
    },
  );
};
