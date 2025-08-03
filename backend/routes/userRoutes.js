import express from 'express';
import {
    getProfile,
    updateSettings
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/me', authenticateToken, getProfile);
router.put('/settings', authenticateToken, updateSettings);

export default router;