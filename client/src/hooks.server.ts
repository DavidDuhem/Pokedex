import type { Handle } from '@sveltejs/kit';
import { AuthService } from './services/AuthServices';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('pokedex_access_token');

	if (sessionCookie) {
		try {
			const res = await AuthService.getCurrentUser(event.fetch, {
				headers: { Cookie: `pokedex_access_token=${sessionCookie}` }
			});

			if (res && res.user) {
				event.locals.user = res.user;
			} else {
				event.locals.user = null;
			}
		} catch (err: any) {
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
