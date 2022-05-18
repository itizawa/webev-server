import * as express from 'express';

import { getOgps } from './ogp';

export const setupExpressRoutes = (express: express.Express): void => {
  express.get('/api/v1/ogps', getOgps);

  // test
  express.get('/', function (req, res) {
    console.log(req.user);

    if (req.user) {
      res.json({ user_name: req.user });
    } else {
      res.json({ user_name: null });
    }
  });
};
