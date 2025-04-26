import express from 'express';
import { getAllData, lastRead } from '../controller/data.controller.js';

const router = express.Router();
router.get('/data', getAllData);
router.get('/lastRead', lastRead);
export default router;