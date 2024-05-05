import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const RestaurantverifyToken = (req, res, next) => {
  const token = req.cookies.access_token1;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET2, (err, RestaurantUser) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.RestaurantUser = RestaurantUser;
    next();
  });
};