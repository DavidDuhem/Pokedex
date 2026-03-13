import { Request, Response } from 'express';
import { Pokemon, PokeType } from '../models';
import { controllerWrapper } from '../utils/controllerWrapper';

export class PokemonController {
	public getAll = controllerWrapper(async (req: Request, res: Response) => {
		const pokemons = await Pokemon.findAll({
			include: [{ model: PokeType, as: 'types' }],
			order: [['id', 'ASC']]
		});
		res.json(pokemons);
	});
}
