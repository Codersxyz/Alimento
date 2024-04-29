import express from 'express';
import { NGOForgotpassword, NGOsignin, NGOsignup, NGOverifyOTP } from '../controllers/NGOAuth.controller.js';

const NGOrouter = express.Router();

NGOrouter.post("/NGOsignup", NGOsignup);
NGOrouter.post("/NGOsignin", NGOsignin);
NGOrouter.post("/NGOForgotpassword", NGOForgotpassword);
NGOrouter.post("/NGOverifyOTP", NGOverifyOTP);

export default NGOrouter;