<script lang="ts">
	import { auth } from '$stores/auth-store.svelte';
	import AuthModal from '../modals/LoginModal.svelte';

	let showAuthModal = $state(false);

	let buttonColor = $derived(
		auth.isLoggedIn
			? 'bg-red-600 hover:bg-red-700 active:bg-red-800'
			: 'bg-green-600 hover:bg-green-700 active:bg-green-800'
	);
</script>

{#if !auth.isLoading}
	<button
		onclick={() => (auth.isLoggedIn ? auth.logout() : (showAuthModal = true))}
		class="{buttonColor} text-white px-5 py-2 rounded-lg font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
	>
		{auth.isLoggedIn ? 'Déconnexion' : 'Connexion'}
	</button>
{/if}

{#if showAuthModal}
	<AuthModal onClose={() => (showAuthModal = false)} />
{/if}
