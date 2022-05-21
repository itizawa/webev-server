import * as express from 'express';

import { getOgps } from './ogp';

export const setupExpressRoutes = (express: express.Express): void => {
  express.get('/api/v1/ogps', getOgps);

  // test
  express.get('/', function (req, res) {
    if (req.user) {
      res.json({ ...req.user });
    } else {
      res.json({ user: null });
    }
  });
};
