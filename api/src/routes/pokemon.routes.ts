import { Router } from 'express';
import { PokemonController } from '../controllers/PokemonController.js';

const router = Router();
const pokemonController = new PokemonController();

router.get('/', pokemonController.getAll);

export default router;
