import * as express from 'express';

import { getOgps } from './ogp';

export const setupExpressRoutes = (express: express.Express): void => {
  express.get('/api/v1/ogps', getOgps);
};
