import { Express } from 'express';

import passport from 'passport';
import session from 'express-session';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import crypto from 'crypto';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

export const setupPassport = (app: Express) => {
  //セッションに保存
  passport.serializeUser(function (user: { id: string; name: string }, done) {
    done(null, { id: user.id, name: user.name });
  });

  //セッションから保存されたデータを呼び出し
  passport.deserializeUser(function (user: { id: string; name: string }, done) {
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
};
