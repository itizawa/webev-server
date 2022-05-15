import { Request, Response } from 'express';
import { query } from 'express-validator';

import { validate } from '~/middlewares/validate';
import { isValidUrl } from '~/utils/isValidUrl';

const validations = [query('url').custom((url) => isValidUrl(url))];

/**
 * UrlからOGPを取得するためのapi
 * @path GET /api/v1/ogps
 * @query url 取得したいurl
 * @returns
 */
export const getOgps = validate(
  validations,
  async (req: Request, res: Response) => {
    const { url } = req.query;

    try {
      const ogp = 'test';
      return res.status(200).json({ ogp });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
);
