import { TeamService } from '../../services/TeamService';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	try {
		console.log('ABOUT TO CALL GET MY TEAMS');
		const res = await TeamService.getMyTeams(fetch);
		console.log('CALLED GET MY TEAMS');

		return {
			apiResponse: res
		};
	} catch (err) {
		console.error('Erreur lors du chargement des équipes', err);
		return {
			apiResponse: null,
			error: 'Impossible de charger les équipes'
		};
	}
}) satisfies PageLoad;
