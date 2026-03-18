import { Router } from 'express';
import { PokemonController } from '../controllers/PokemonController.js';
import { isAuthenticated, tryAuthenticated } from '../middlewares/verifyToken.js';

const router = Router();
const pokemonController = new PokemonController();

router.get('/', tryAuthenticated, pokemonController.getAll);
router.get('/search', pokemonController.searchPokemon);
router.get('/:id', tryAuthenticated, pokemonController.getOne);

router.post('/:id', isAuthenticated, pokemonController.toggleVote);
router.post('/:id/vote', isAuthenticated, pokemonController.toggleVote);

export default router;
