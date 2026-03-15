import { env as publicEnv } from '$env/dynamic/public';
import type { PokemonApiResponse } from '@pokedex/shared/schemas/pokemon.schema';

export const PokemonService = {
	async getAll(page: number = 1, svelteFetch: typeof fetch): Promise<PokemonApiResponse> {
		const isServer = typeof window === 'undefined';

		const baseUrl = isServer ? 'http://api:5000/api' : publicEnv.PUBLIC_API_URL;

		const url = `${baseUrl}/pokemon?page=${page}`;

		try {
			const response = await svelteFetch(url);

			if (!response.ok) {
				throw {
					status: response.status,
					message: `Erreur API: ${response.statusText}`
				};
			}

			return await response.json();
		} catch (error: any) {
			console.error(`Erreur lors du fetch sur ${url}:`, error);
			throw {
				status: error.status || 500,
				message: error.message || 'Erreur réseau inconnue'
			};
		}
	}
};
