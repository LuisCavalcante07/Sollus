import express from 'express';
import { login, logout, signup, forgotPassword } from '../controller/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-possword", forgotPassword);
export default router;