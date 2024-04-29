import bcryptjs from 'bcryptjs';
import RestaurantUser from '../models/RestaurantUser.model.js';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const Restaurantsignup = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new RestaurantUser({ username, email, password: hashedPassword, confirmPassword: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
}

export const Restaurantsignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validRestaurantUser = await RestaurantUser.findOne({ email });
    if (!validRestaurantUser) return next(errorHandler(404, 'User not found!'));
    const validRestaurantPassword = bcryptjs.compareSync(password, validRestaurantUser.password);
    if (!validRestaurantPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validRestaurantUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validRestaurantUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};