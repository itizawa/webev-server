import * as express from 'express';
import { logger } from '~/utils/logger';
import { loginRequired } from '../middlewares';

import { getOgps } from './ogp';
import { countAllPages, findPages, postPageByUrl } from './page';
import { getCurrentUser, getUserPagesCount } from './user';

export const setupExpressRoutes = (express: express.Express): void => {
  express.get('/api/v1/ogps', getOgps);

  express.post('/api/v1/pages', loginRequired, postPageByUrl);
  express.get('/api/v1/pages/all-count', countAllPages);
  express.get('/api/v1/pages/list', loginRequired, findPages);

  express.get('/api/v1/users/me', getCurrentUser);
  express.get('/api/v1/users/:id/pages/count', getUserPagesCount);

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
