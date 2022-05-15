import { Response, NextFunction } from 'express';
import { UserRepository } from '../infrastructure';
import { ProecoRequest } from '../interfaces';

export const accessTokenParser = async (req: ProecoRequest, res: Response, next: NextFunction): Promise<void> => {
  const bearerToken = req.headers['authorization'];

  // check null
  if (bearerToken == null) {
    return next();
  }
  const bearer = bearerToken.split(' ');
  const accessToken = bearer[1];

  console.log('Access Token:', accessToken);

  const userRepository = new UserRepository();
  const user = await userRepository.findOne({ accessToken });

  if (user != null) {
    req.user = user;
  }

  return next();
};
