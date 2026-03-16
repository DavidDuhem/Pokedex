<script lang="ts">
	import { auth } from '$stores/auth-store.svelte';
	import { page } from '$app/state';
	import AuthModal from '../modals/LoginModal.svelte';

	let showAuthModal = $state(false);

	const isLoggedIn = $derived(auth.user !== null || page.data.user !== null);

	let buttonColor = $derived(
		isLoggedIn
			? 'bg-red-600 hover:bg-red-700 active:bg-red-800'
			: 'bg-green-600 hover:bg-green-700 active:bg-green-800'
	);
</script>

{#if !auth.isLoading}
	<button
		onclick={() => (isLoggedIn ? auth.logout() : (showAuthModal = true))}
		class="{buttonColor} text-white px-5 py-2 rounded-lg font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
	>
		{isLoggedIn ? 'Déconnexion' : 'Connexion'}
	</button>
{/if}

{#if showAuthModal}
	<AuthModal onClose={() => (showAuthModal = false)} />
{/if}
