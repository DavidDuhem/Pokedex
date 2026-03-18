import type {
	Pokemon,
	PokemonApiResponse,
	PokemonVoteApiResponse
} from '@pokedex/shared/schemas/pokemon.schema';
import { api } from './apiClient';

export const PokemonService = {
	getAll: (page: number = 1, svelteFetch: typeof fetch) =>
		api.get<PokemonApiResponse>(`/pokemon?page=${page}`, svelteFetch),

	getOne: (pokemonId: number, svelteFetch: typeof fetch) =>
		api.get<Pokemon>(`/pokemon/${pokemonId}`, svelteFetch),

	search: (search: string, svelteFetch: typeof fetch) =>
		api.get<Pokemon[]>(`/pokemon/search?name=${search}`, svelteFetch),

	toggleVote: (pokemonId: number, svelteFetch: typeof fetch = fetch) =>
		api.post<PokemonVoteApiResponse>(`/pokemon/${pokemonId}/vote`, {}, svelteFetch)
};
