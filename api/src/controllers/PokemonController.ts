import { Request, Response } from 'express';
import { Pokemon, PokeType, Vote } from '../models/index.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { Sequelize } from 'sequelize';

export class PokemonController {
	public getAll = controllerWrapper(async (req: Request, res: Response) => {
		const page = Math.max(1, parseInt(req.query.page as string) || 1);
		const limit = 24;
		const offset = (page - 1) * limit;

		const currentProfileId = req.user?.id || null;

		const { count, rows } = await Pokemon.findAndCountAll({
			attributes: {
				include: [
					[
						Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM vote
                        WHERE vote.pokemon_id = "Pokemon".id
                    )`),
						'totalVotes'
					],
					[
						Sequelize.literal(`(
                        SELECT COUNT(*) > 0
                        FROM vote
                        WHERE vote.pokemon_id = "Pokemon".id
                        AND vote.profile_id = ${Number(currentProfileId)}
                    )`),
						'hasVoted'
					]
				]
			},
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

	public toggleVote = controllerWrapper(async (req: Request, res: Response) => {
		const userId = req.user.id;
		const pokemonId = Number(req.params.id);

		if (isNaN(pokemonId)) {
			return res.status(400).json({ message: 'ID de Pokémon invalide' });
		}

		const existingVote = await Vote.findOne({
			where: {
				profile_id: userId,
				pokemon_id: pokemonId
			}
		});

		if (existingVote) {
			await existingVote.destroy();

			return res.status(200).json({
				voted: false,
				message: 'Vote retiré avec succès'
			});
		} else {
			await Vote.create({
				profile_id: userId,
				pokemon_id: pokemonId
			});

			return res.status(201).json({
				voted: true,
				message: 'Vote ajouté avec succès'
			});
		}
	});
}
