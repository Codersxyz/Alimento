import express from 'express';
import { testN } from '../controllers/NGOUser.controller.js';

const router = express.Router();

router.get('/testN', testN);

export default router;