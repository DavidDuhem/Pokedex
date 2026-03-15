import { api } from '../lib/api';
import type { LoginInput, RegisterInput } from '@pokedex/shared/schemas/auth';

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
		const response = await api.post('/auth/login', credentials);
		return response.data;
	}
};
