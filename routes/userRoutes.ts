import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route
router.get('/profile', protect, getUserProfile);

export default router;
