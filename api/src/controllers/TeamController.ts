import { Request, Response } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { Team } from '../models/Team.js';
import { Pokemon } from '../models/Pokemon.js';
import { PokeType } from '../models/PokeType.js';
import { addTeamSchema } from '@pokedex/shared/schemas/team.schema.js';

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

		res.json(teams);
	});

	public addTeam = controllerWrapper(async (req: Request, res: Response) => {
		const userId = req.user?.id;

		const { name, description } = await addTeamSchema.parseAsync(req.body);

		const newTeam = await Team.create({
			name,
			description: description,
			profile_id: userId
		});

		return res.status(201).json({
			message: 'Équipe créée avec succès',
			team: newTeam
		});
	});
}
