import express from 'express';  
import {
    createCharacter,
    getUserCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter
} from '../controllers/characterController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/', authenticateToken, createCharacter);
router.get('/', authenticateToken, getUserCharacters);
router.get('/:id', authenticateToken, getCharacterById);
router.put('/:id', authenticateToken, updateCharacter);
router.delete('/:id', authenticateToken, deleteCharacter);

export default router;