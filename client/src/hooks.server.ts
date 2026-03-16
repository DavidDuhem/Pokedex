import type { Handle } from '@sveltejs/kit';
import { AuthService } from './services/AuthServices';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('accessToken');

	if (sessionCookie) {
		try {
			const res = await AuthService.getCurrentUser(event.fetch, event.request.headers);
			event.locals.user = res?.user || null;
		} catch (err: any) {
			event.locals.user = null;

			if (err.status === 401) {
				event.cookies.delete('accessToken', { path: '/' });
			}
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
