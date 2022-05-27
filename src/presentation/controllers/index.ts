import * as express from 'express';
import { logger } from '~/utils/logger';

import { getOgps } from './ogp';
import { getCurrentUser } from './user';

export const setupExpressRoutes = (express: express.Express): void => {
  express.get('/api/v1/ogps', getOgps);

  express.get('/api/v1/users/me', getCurrentUser);

  // test
  express.get('/', function (req, res) {
    logger(req.user, 'info');
    logger(req.session, 'info');

    if (req.user) {
      res.json({ ...req.user });
    } else {
      res.json({ user: null });
    }
  });
};
