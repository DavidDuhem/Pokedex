import { Router } from 'express';
import pokemonRoutes from './routes/pokemon.routes';

export const router = Router();

router.use('/pokemons', pokemonRoutes);
