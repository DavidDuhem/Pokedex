import { Router } from 'express';
import { PokemonController } from '../controllers/PokemonController.js';
import { isAuthenticated, tryAuthenticated } from '../middlewares/verifyToken.js';

const router = Router();
const pokemonController = new PokemonController();

router.get('/', tryAuthenticated, pokemonController.getAll);

router.get('/:id/vote', isAuthenticated, pokemonController.toggleVote);

export default router;
