import { api } from './apiClient';
import type { User, LoginInput, RegisterInput } from '@pokedex/shared/schemas/auth.schema';

export const AuthService = {
	register: (data: RegisterInput, f: typeof fetch = fetch) => api.post('/auth/register', data, f),

	login: (credentials: LoginInput, f: typeof fetch = fetch) =>
		api.post('/auth/login', credentials, f),

	async getCurrentUser(f: typeof fetch = fetch): Promise<User | null> {
		try {
			return await api.get<User>('/auth/me', f);
		} catch (err) {
			return null;
		}
	},

	logout: (f: typeof fetch = fetch) => api.post('/auth/logout', {}, f)
};
