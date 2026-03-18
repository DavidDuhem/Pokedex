import type {
	CreateTeamResponse,
	Team,
	TeamWithPokemons,
	UpdateTeamInput
} from '@pokedex/shared/schemas/team.schema';
import { api } from './apiClient';

export const TeamService = {
	getMyTeams: (svelteFetch: typeof fetch) => api.get<Team[]>('/teams', svelteFetch),

	getTeamPokemon: (teamId: number, svelteFetch: typeof fetch) =>
		api.get<TeamWithPokemons>(`/teams/${teamId}`, svelteFetch),

	addTeam: (teamToAdd: Partial<Team>, svelteFetch: typeof fetch) =>
		api.post<CreateTeamResponse>('/teams', teamToAdd, svelteFetch),

	deleteTeam: (teamId: number, svelteFetch: typeof fetch) =>
		api.delete<{ message: string }>(`/teams/${teamId}`, svelteFetch),

	removePokemonTeam: (teamId: number, pokemonId: number, svelteFetch: typeof fetch) =>
		api.delete<{ message: string }>(`/teams/${teamId}/${pokemonId}`, svelteFetch),

	addPokemonTeam: (teamId: number, pokemonId: number, svelteFetch: typeof fetch) =>
		api.post<{ message: string }>(`/teams/${teamId}`, { pokemonId }, svelteFetch),

	updateTeam: (teamId: number, updatedData: UpdateTeamInput, svelteFetch: typeof fetch) =>
		api.patch<Team>(`/teams/${teamId}`, updatedData, svelteFetch)
};
