import { Request, Response } from 'express';
import { Pokemon, PokeType } from '../models/index.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

export class PokemonController {
	public getAll = controllerWrapper(async (req: Request, res: Response) => {
		const page = Math.max(1, parseInt(req.query.page as string) || 1);
		const limit = 24;
		const offset = (page - 1) * limit;

		const { count, rows } = await Pokemon.findAndCountAll({
			include: [{ model: PokeType, as: 'types' }],
			order: [['id', 'ASC']],
			limit: limit,
			offset: offset,
			distinct: true
		});

		res.json({
			data: rows,
			pagination: {
				totalPokemon: count,
				totalPages: Math.ceil(count / limit),
				currentPage: page,
				pokemonPerPage: limit
			}
		});
	});
}
