import { api } from './apiClient';
import type {
	RegisterInput,
	LoginInput,
	LoginApiResponse,
	RegisterApiResponse,
	ApiUserResponse
} from '@pokedex/shared/schemas/auth.schema';

export const AuthService = {
	register: (data: RegisterInput, f: typeof fetch = fetch): Promise<RegisterApiResponse> =>
		api.post('/auth/register', data, f),

	login: (credentials: LoginInput, f: typeof fetch = fetch): Promise<LoginApiResponse> =>
		api.post('/auth/login', credentials, f),

	async getCurrentUser(f: typeof fetch = fetch, options: RequestInit = {}) {
		try {
			return await api.get<ApiUserResponse>('/auth/me', f, options);
		} catch (err) {
			return null;
		}
	},

	logout: (f: typeof fetch = fetch) => api.post('/auth/logout', {}, f)
};
