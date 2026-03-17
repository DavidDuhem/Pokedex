import type {
	CreateTeamResponse,
	Team,
	UpdateTeamInput
} from '@pokedex/shared/schemas/team.schema';
import { api } from './apiClient';

export const TeamService = {
	getMyTeams: (svelteFetch: typeof fetch) => api.get<Team[]>('/teams', svelteFetch),

	addTeam: (teamToAdd: Partial<Team>, svelteFetch: typeof fetch) =>
		api.post<CreateTeamResponse>('/teams', teamToAdd, svelteFetch),

	deleteTeam: (teamId: number, svelteFetch: typeof fetch) =>
		api.delete<{ message: string }>(`/teams/${teamId}`, svelteFetch),

	updateTeam: (teamId: number, updatedData: UpdateTeamInput, svelteFetch: typeof fetch) =>
		api.patch<Team>(`/teams/${teamId}`, updatedData, svelteFetch)
};
