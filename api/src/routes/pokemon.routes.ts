import { Router } from 'express';
import { PokemonController } from '../controllers/PokemonController.js';
import { tryAuthenticated } from '../middlewares/verifyToken.js';

const router = Router();
const pokemonController = new PokemonController();

router.get('/', tryAuthenticated, pokemonController.getAll);

export default router;
