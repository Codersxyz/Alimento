import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import NGOUserRouter from './routes/NGOUser.route.js'
import RestaurantUserRouter from './routes/RestaurantUser.route.js'
import NGOAuthRouter from './routes/NGOAuth.route.js';
import RestaurantAuthRouter from './routes/RestaurantAuth.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });
  
  const app = express();

  app.use(express.json());


app.listen(5000, () => {
    console.log('Server is running on port 5000!');
  });

  app.use('/api/NGOUser', NGOUserRouter);
  app.use('/api/RestaurantUser', RestaurantUserRouter);
  app.use('/api/NGOAuth', NGOAuthRouter);
  app.use('/api/RestaurantAuth', RestaurantAuthRouter);

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });