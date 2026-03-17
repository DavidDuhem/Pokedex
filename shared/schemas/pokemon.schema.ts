import { z } from 'zod';

export const pokemonSchema = z.object({
	id: z.number(),
	name: z.string(),
	hp: z.number(),
	atk: z.number(),
	def: z.number(),
	atk_spe: z.number(),
	def_spe: z.number(),
	speed: z.number(),
	totalVotes: z.preprocess((val) => Number(val), z.number()),
	hasVoted: z.preprocess((val) => {
		if (typeof val === 'boolean') return val;
		if (typeof val === 'number') return val > 0;
		return false;
	}, z.boolean()),
	types: z
		.array(
			z.object({
				id: z.number(),
				name: z.string(),
				color: z.string()
			})
		)
		.optional()
});

export const pokemonApiResponseSchema = z.object({
	data: z.array(pokemonSchema),
	pagination: z.object({
		totalPokemon: z.number(),
		totalPages: z.number(),
		currentPage: z.number(),
		pokemonPerPage: z.number()
	})
});

export const pokemonVoteSchema = z.object({
	pokemonId: z.number()
});

export const pokemonVoteApiResponseSchema = z.object({
	voted: z.boolean(),
	message: z.string()
});

export type Pokemon = z.infer<typeof pokemonSchema>;
export type PokemonApiResponse = z.infer<typeof pokemonApiResponseSchema>;
export type PokemonVote = z.infer<typeof pokemonVoteSchema>;
export type PokemonVoteApiResponse = z.infer<typeof pokemonVoteApiResponseSchema>;
