import { env as publicEnv } from '$env/dynamic/public';

const isServer = typeof window === 'undefined';
const baseUrl = isServer ? 'http://api:5000/api' : publicEnv.PUBLIC_API_URL;

async function request<T>(
	endpoint: string,
	svelteFetch: typeof fetch,
	options: RequestInit = {}
): Promise<T> {
	const url = `${baseUrl}${endpoint}`;

	const config: RequestInit = {
		...options,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		}
	};

	const response = await svelteFetch(url, config);

	if (!response.ok) {
		throw {
			status: response.status,
			message: `Erreur API (${response.status}): ${response.statusText}`
		};
	}

	return response.json();
}

export const api = {
	get: <T>(url: string, f: typeof fetch, options: RequestInit = {}) =>
		request<T>(url, f, { ...options, method: 'GET' }),

	post: <T>(url: string, body: any, f: typeof fetch, options: RequestInit = {}) =>
		request<T>(url, f, { ...options, method: 'POST', body: JSON.stringify(body) }),

	put: <T>(url: string, body: any, f: typeof fetch, options: RequestInit = {}) =>
		request<T>(url, f, { ...options, method: 'PUT', body: JSON.stringify(body) }),

	patch: <T>(url: string, body: any, f: typeof fetch, options: RequestInit = {}) =>
		request<T>(url, f, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

	delete: <T>(url: string, f: typeof fetch, options: RequestInit = {}) =>
		request<T>(url, f, { ...options, method: 'DELETE' })
};
