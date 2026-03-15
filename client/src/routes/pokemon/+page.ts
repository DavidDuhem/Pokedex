import { PokemonService } from '../../services/PokemonService';
import type { PageLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const pageParam = url.searchParams.get('page');
	const page = pageParam ? Math.max(1, parseInt(pageParam)) : 1;

	try {
		const res = await PokemonService.getAll(page, fetch);

		return {
			apiResponse: res
		};
	} catch (err) {
		console.error('Erreur lors du chargement des Pokémon', err);
		return {
			apiResponse: null,
			error: 'Impossible de charger les Pokémon'
		};
	}
}) satisfies PageLoad;
