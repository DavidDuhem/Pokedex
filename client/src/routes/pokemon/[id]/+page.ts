import { PokemonService } from '../../../services/PokemonService';
import type { PageLoad, PageLoadEvent } from './$types';

export const load = (async ({ params, fetch }: PageLoadEvent) => {
	const id = Number(params.id);

	if (isNaN(id)) {
		return {
			apiResponse: null,
			error: 'ID invalide'
		};
	}

	try {
		const res = await PokemonService.getOne(id, fetch);

		return {
			apiResponse: res
		};
	} catch (err) {
		console.error('Erreur lors du chargement du Pokémon', err);
		return {
			apiResponse: null,
			error: 'Impossible de charger le Pokémon'
		};
	}
}) satisfies PageLoad;
