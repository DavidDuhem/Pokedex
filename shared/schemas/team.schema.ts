import { z } from 'zod';
import { pokemonSchema } from './pokemon.schema.js';
import { partial } from 'zod/v4-mini';

const teamSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	profile_id: z.number(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime()
});

export const teamWithPkmSchema = teamSchema.extend({
	pokemons: z.array(pokemonSchema)
});

export const addTeamSchema = z.object({
	name: z
		.string()
		.min(3, 'Le nom doit contenir au moins 3 caractères')
		.max(50, 'Le nom est trop long'),

	description: z.string().max(255, 'La description est trop longue')
});

export const updateTeamSchema = addTeamSchema.partial();

export const createTeamResponseSchema = z.object({
	message: z.string(),
	team: teamSchema
});

export const Teams = z.array(teamSchema);
export type Team = z.infer<typeof teamSchema>;
export type TeamWithPokemons = z.infer<typeof teamWithPkmSchema>;
export type AddTeamInput = z.infer<typeof addTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
export type CreateTeamResponse = z.infer<typeof createTeamResponseSchema>;
