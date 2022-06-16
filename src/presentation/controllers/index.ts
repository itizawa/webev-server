import * as express from 'express';
import { loginRequired } from '../middlewares';

import { getOgps } from './ogp';
import {
  countAllPages,
  deletePageById,
  findPages,
  postPageByUrl,
} from './page';
import { updatePage } from './page/updatePage';
import { getCurrentUser, getUserPagesCount } from './user';

export const setupExpressRoutes = (express: express.Express): void => {
  express.get('/api/v1/ogps', getOgps);

  express.post('/api/v1/pages', loginRequired, postPageByUrl);
  express.delete('/api/v1/pages/:id', loginRequired, deletePageById);
  express.put('/api/v1/pages/:pageId', loginRequired, updatePage);
  express.get('/api/v1/pages/all-count', countAllPages);
  express.get('/api/v1/pages/list', loginRequired, findPages);

  express.get('/api/v1/users/me', getCurrentUser);
  express.get('/api/v1/users/:id/pages/count', getUserPagesCount);
};
