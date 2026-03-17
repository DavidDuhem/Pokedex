import { Request, Response } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { Team } from '../models/Team.js';
import { PokemonTeam } from '../models/PokemonTeam.js';
import { Pokemon } from '../models/Pokemon.js';
import { PokeType } from '../models/PokeType.js';

export class TeamController {
	public getMyTeams = controllerWrapper(async (req: Request, res: Response) => {
		const userId = req.user?.id;

		const teams = await Team.findAll({
			where: { profile_id: userId },
			include: [
				{
					model: Pokemon,
					as: 'pokemons',
					through: { attributes: [] },
					include: [
						{
							model: PokeType,
							as: 'types',
							through: { attributes: [] }
						}
					]
				}
			],
			order: [['createdAt', 'DESC']]
		});

		if (!teams) return res.status(404).json({ error: 'Équipes introuvables' });

		res.json(teams);
	});
}
