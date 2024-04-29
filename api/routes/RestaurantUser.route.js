import express from 'express';
import { testR } from '../controllers/RestaurantUser.controller.js';


const router = express.Router();

router.get('/testR', testR);

export default router;