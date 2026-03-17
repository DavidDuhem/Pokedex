import type { Team } from '@pokedex/shared/schemas/team.schema';
import { api } from './apiClient';

export const TeamService = {
	getMyTeams: (svelteFetch: typeof fetch) => api.get<Team[]>('/teams', svelteFetch)
};
