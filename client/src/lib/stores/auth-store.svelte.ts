import type { User } from '@pokedex/shared/schemas/auth.schema';
import { AuthService } from '../../services/AuthServices';
import { invalidateAll } from '$app/navigation';

class AuthStore {
	user = $state<User | null>(null);
	isLoading = $state<boolean>(false);

	isLoggedIn = $derived(this.user !== null);

	constructor() {}

	login(user: User) {
		this.user = user;
		this.isLoading = false;
	}

	setUser(user: User | null) {
		this.user = user;
		this.isLoading = false;
	}

	async logout() {
		this.isLoading = true;
		try {
			await AuthService.logout();
		} catch (err) {
			console.error('Erreur lors du logout :', err);
		} finally {
			this.user = null;
			this.isLoading = false;
			await invalidateAll();
		}
	}
}

export const auth = new AuthStore();
