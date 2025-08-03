import express from 'express';
import {
    sendMessage,
    getChatHistory,
} from '../controllers/chatController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/send', authenticateToken, sendMessage);
router.get('/:characterId', authenticateToken, getChatHistory);

export default router;