import { Request, Response } from 'express';
import { query } from 'express-validator';
import { FetchOgpUseCase } from '~/application/useCases/ogp';
import { OgpAdapter } from '~/infrastructure/adapters/ogp.adapter';

import { validate } from '~/presentation/middlewares/validate';
import { isValidUrl } from '~/utils/isValidUrl';

const validations = [query('url').custom((url) => isValidUrl(url))];
const fetchOgpUseCase = new FetchOgpUseCase(new OgpAdapter());

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

    if (typeof url !== 'string') {
      return res
        .status(400)
        .json({ message: 'urlはstringである必要があります' });
    }

    try {
      const ogp = await fetchOgpUseCase.execute(url);
      return res.status(200).json({ ogp });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
);
