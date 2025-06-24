import express from 'express';
import {
  login,
  logout,
  signup,
  forgotPassword,
  profileChange,
  viewProfile,
  updateProfilePhoto
} from '../controller/auth.controller.js';
import { verifyToken } from '../authMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);

router.get("/viewProfile", verifyToken, viewProfile);

router.put("/profile-change", verifyToken, profileChange);
router.put("/profile/photo", verifyToken, updateProfilePhoto);

export default router;
