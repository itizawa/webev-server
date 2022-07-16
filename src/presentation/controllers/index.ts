/* eslint-disable prettier/prettier */
import * as express from 'express';
import { loginRequired } from '../middlewares';
import { createMagazine, updateMagazine } from './magazine';
import { findMagazines } from './magazine/findMagazines';

import { getOgps } from './ogp';
import {
  countAllPages,
  deletePageById,
  findPage,
  findPages,
  postPageByUrl,
} from './page';
import { updatePage } from './page/updatePage';
import { createPageMagazineRelation, findPageMagazineRelations } from './pageMagazineRelation';
import { getCurrentUser, getUserPagesCount } from './user';

export const setupExpressRoutes = (express: express.Express): void => {
  // magazines
  express.post('/api/v1/magazines', createMagazine);
  express.get('/api/v1/magazines/list', findMagazines);
  express.put('/api/v1/magazines/:id', updateMagazine);

  // ogps
  express.get('/api/v1/ogps', getOgps);

  // pages
  express.post('/api/v1/pages', loginRequired, postPageByUrl);
  express.delete('/api/v1/pages/:id', loginRequired, deletePageById);
  express.get('/api/v1/pages/all-count', countAllPages);
  express.get('/api/v1/pages/list', loginRequired, findPages);
  express.put('/api/v1/pages/:pageId', loginRequired, updatePage);
  express.get('/api/v1/pages/:id', loginRequired, findPage);

  // pageMagazineRelations
  express.post('/api/v1/page-magazine-relations', loginRequired, createPageMagazineRelation);
  express.get('/api/v1/page-magazine-relations/list', loginRequired, findPageMagazineRelations);

  // users
  express.get('/api/v1/users/me', getCurrentUser);
  express.get('/api/v1/users/:id/pages/count', getUserPagesCount);
};
