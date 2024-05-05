import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const NGOverifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET1, (err, NGOUser) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.NGOUser = NGOUser;
    next();
  });
};