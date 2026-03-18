import { Request, Response } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { Team } from '../models/Team.js';
import { Pokemon } from '../models/Pokemon.js';
import { PokeType } from '../models/PokeType.js';
import { addTeamSchema, updateTeamSchema } from '@pokedex/shared/schemas/team.schema.js';

export class TeamController {
	public getMyTeams = controllerWrapper(async (req: Request, res: Response) => {
		const userId = req.user?.id;

		const teams = await Team.findAll({
			where: { profile_id: userId },
			// include: [
			// 	{
			// 		model: Pokemon,
			// 		as: 'pokemons',
			// 		through: { attributes: [] },
			// 		include: [
			// 			{
			// 				model: PokeType,
			// 				as: 'types',
			// 				through: { attributes: [] }
			// 			}
			// 		]
			// 	}
			// ],
			order: [['createdAt', 'DESC']]
		});

		res.json(teams);
	});

	public getTeamPokemon = controllerWrapper(async (req: Request, res: Response) => {
		const userId = req.user?.id;
		const teamId = Number(req.params.id);

		if (isNaN(teamId)) {
			return res.status(400).json({ message: "L'ID de l'équipe est invalide." });
		}

		const team = await Team.findOne({
			where: {
				id: teamId,
				profile_id: userId
			},
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
			]
		});

		if (!team) {
			return res.status(404).json({ message: 'Équipe non trouvée' });
		}

		res.json(team);
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

	public deleteTeam = controllerWrapper(async (req: Request, res: Response) => {
		const userId = req.user?.id;

		const { id } = req.params;
		const teamId = Number(id);

		const team = await Team.findByPk(teamId);

		if (!team) {
			return res.status(404).json({ message: "Cette équipe n'existe pas" });
		}

		if (team.profile_id != userId) {
			return res.status(403).json({
				message: "Accès refusé : vous n'êtes pas le propriétaire de cette équipe"
			});
		}

		await team.destroy();

		return res.status(200).json({ message: "L'équipe a été supprimée." });
	});

	public updateTeam = controllerWrapper(async (req: Request, res: Response) => {
		const userId = req.user?.id;

		const { id } = req.params;
		const teamId = Number(id);

		const updatedData = await updateTeamSchema.parseAsync(req.body);

		const team = await Team.findByPk(teamId);

		if (!team) {
			return res.status(404).json({ message: "Cette équipe n'existe pas" });
		}

		if (team.profile_id != userId) {
			return res.status(403).json({
				message: "Accès refusé : vous n'êtes pas le propriétaire de cette équipe"
			});
		}

		team.set(updatedData);
		await team.save();

		return res.status(200).json(team);
	});
}
