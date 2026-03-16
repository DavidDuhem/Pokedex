import { api } from '../lib/api';
import type { LoginInput, RegisterInput } from '@pokedex/shared/schemas/auth.schema';

export const AuthService = {
	async register(data: RegisterInput) {
		try {
			const response = await api.post('/auth/register', data);
			return response.data;
		} catch (error: any) {
			throw error.response?.data || { message: 'Erreur réseau' };
		}
	},

	async login(credentials: LoginInput) {
		try {
			const response = await api.post('/auth/login', credentials);
			return response.data;
		} catch (error: any) {
			throw error.response?.data || { message: 'Erreur réseau' };
		}
	},

	async getCurrentUser(customFetch?: typeof fetch, headers?: Headers) {
		if (customFetch) {
			// Logique SERVEUR
			const res = await customFetch('http://api:5000/api/auth/me', {
				headers: headers
			});

			if (!res.ok) return null;
			return await res.json();
		}

		// Logique CLIENT
		const res = await api.get('/auth/me');
		return res.data;
	},

	async logout() {
		const response = await api.post('/auth/logout');
		return response.data;
	}
};
