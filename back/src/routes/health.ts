import express from 'express';
import { getHealth } from '../controllers/health';

const router = express.Router();

export const healthRoute = router.get('/', getHealth);
