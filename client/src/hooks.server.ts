import type { Handle } from '@sveltejs/kit';
import { AuthService } from './services/AuthServices';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('accessToken');

	if (sessionCookie) {
		try {
			const res = await AuthService.getCurrentUser(event.fetch, {
				headers: { Cookie: `accessToken=${sessionCookie}` }
			});

			const rawRes = await event.fetch('http://api:5000/api/auth/me', {
				headers: {
					Cookie: `accessToken=${sessionCookie}`
				}
			});

			const debugText = await rawRes.text();

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
