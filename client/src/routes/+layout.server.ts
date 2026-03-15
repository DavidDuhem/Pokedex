import { AuthService } from '../services/AuthServices';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch, request }) => {
	try {
		const res = await AuthService.getCurrentUser(fetch, request.headers);

		return { user: res?.user || null };
	} catch (err) {
		console.error('Erreur Load SSR:', err);
	}
	return { user: null };
}) satisfies LayoutServerLoad;
