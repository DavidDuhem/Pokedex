import { AuthService } from '../../services/AuthServices';

interface User {
	id: string;
}

class AuthStore {
	user = $state<User | null>(null);
	isLoading = $state<boolean>(true);

	isLoggedIn = $derived(this.user !== null);

	constructor() {}

	login(user: User) {
		this.user = user;
		this.isLoading = false;
	}

	async logout() {
		try {
			await AuthService.logout();
		} catch (err) {
			console.error('Erreur lors du logout :', err);
		} finally {
			this.user = null;
			this.isLoading = false;
		}
	}
}

export const auth = new AuthStore();
