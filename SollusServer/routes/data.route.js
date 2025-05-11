import express from 'express';
import { getAllData, lastRead, randomData, deleteData, getMedia } from '../controller/data.controller.js';

const router = express.Router();
router.get('/history', getAllData);
router.get('/lastRead', lastRead);
router.get('/media', getMedia);

router.post('/random', randomData);

router.delete('/delete', deleteData);
export default router;