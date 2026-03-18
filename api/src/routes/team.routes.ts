import { Router } from 'express';
import { TeamController } from '../controllers/TeamController.js';
import { isAuthenticated, tryAuthenticated } from '../middlewares/verifyToken.js';

const router = Router();
const teamController = new TeamController();

router.get('/', isAuthenticated, teamController.getMyTeams);
router.get('/:id', isAuthenticated, teamController.getTeamPokemon);
router.post('/', isAuthenticated, teamController.addTeam);
router.patch('/:id', isAuthenticated, teamController.updateTeam);
router.delete('/:id', isAuthenticated, teamController.deleteTeam);
router.delete('/:teamId/:pokemonId', isAuthenticated, teamController.removePokemonFromTeam);

export default router;
