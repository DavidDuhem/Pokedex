import type { PageLoadEvent } from './$types';
import { TeamService } from '../../../services/TeamService';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }: PageLoadEvent) => {
	const teamId = Number(params.id);

	if (isNaN(teamId)) {
		return {
			apiResponse: null,
			error: "Identifiant de l'équipe invalide"
		};
	}

	try {
		const res = await TeamService.getTeamPokemon(teamId, fetch);

		return {
			apiResponse: res
		};
	} catch (err) {
		console.error("Erreur lors du chargement de l'équipe", err);
		return {
			apiResponse: null,
			error: "Impossible de charger l'équipe"
		};
	}
}) satisfies PageLoad;
