import { z } from 'zod';
import { pokemonSchema } from '@pokedex/shared/schemas/pokemon.schema';

const TeamSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	profile_id: z.number(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	pokemons: z.array(pokemonSchema)
});

export const Teams = z.array(TeamSchema);
export type Team = z.infer<typeof TeamSchema>;
