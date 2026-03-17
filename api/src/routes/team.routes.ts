import { Router } from 'express';
import { TeamController } from '../controllers/TeamController.js';
import { isAuthenticated, tryAuthenticated } from '../middlewares/verifyToken.js';

const router = Router();
const teamController = new TeamController();

router.get('/', isAuthenticated, teamController.getMyTeams);

export default router;
