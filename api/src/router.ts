import { Router } from 'express';
import pokemonRoutes from './routes/pokemon.routes.js';
import authRoutes from './routes/auth.routes.js';

export const router = Router();

router.use('/pokemon', pokemonRoutes);
router.use('/auth', authRoutes);
