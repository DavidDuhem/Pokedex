import { z } from 'zod';

export const PokemonSchema = z.object({
	id: z.number(),
	name: z.string(),
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
				name: z.string()
			})
		)
		.optional()
});

export const PokemonApiResponseSchema = z.object({
	data: z.array(PokemonSchema),
	pagination: z.object({
		totalPokemon: z.number(),
		totalPages: z.number(),
		currentPage: z.number(),
		pokemonPerPage: z.number()
	})
});

export type Pokemon = z.infer<typeof PokemonSchema>;
export type PokemonApiResponse = z.infer<typeof PokemonApiResponseSchema>;
