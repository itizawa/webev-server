import * as express from 'express';
import { logger } from '~/utils/logger';

import { getOgps } from './ogp';

export const setupExpressRoutes = (express: express.Express): void => {
  express.get('/api/v1/ogps', getOgps);

  // test
  express.get('/', function (req, res) {
    logger({ message: req.user, status: 'info' });
    logger({ message: req.session, status: 'info' });

    if (req.user) {
      res.json({ ...req.user });
    } else {
      res.json({ user: null });
    }
  });
};
