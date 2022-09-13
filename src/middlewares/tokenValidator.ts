import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    throw {
      type: 'BAD_REQUEST',
      message: 'Missing authorization header!',
    };
  }

  const { JWT_SECRET } = process.env;

  jwt.verify(token, JWT_SECRET, (err, decoded: jwt.JwtPayload) => {
    if (err) {
      throw {
        type: 'UNAUTHORIZED',
        message: 'Invalid token!',
      };
    }

    res.locals = {
      userId: decoded.id,
    };
  });

  next();
}

export default validateToken;
