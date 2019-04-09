import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InstanceType } from 'typegoose';
import { UserModel, User } from '../Models/User';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthenticated Access.' });
  }

  try {
    const user = getUserFromToken(token);
    req.user = (await UserModel.findById(user._id).populate('todo')) as InstanceType<User>;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthenticated Access.' });
  }
};

const getUserFromToken = (token: string): any => {
  token = token.split(' ')[1];
  const SECRET = process.env.JWT_SECRET || 'jwtsecret';
  return jwt.verify(token, SECRET);
};
