import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { isAuthenticated } from '../middlewares/verifyToken.js';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', isAuthenticated, authController.logout);

router.get('/me', isAuthenticated, authController.getCurrentUser);

export default router;
