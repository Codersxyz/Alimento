import express from 'express';
import { Restaurantsignin, Restaurantsignup } from '../controllers/RestaurantAuth.controller.js';

const Restaurantrouter = express.Router();

Restaurantrouter.post("/Restaurantsignup", Restaurantsignup);
Restaurantrouter.post("/Restaurantsignin", Restaurantsignin);

export default Restaurantrouter;