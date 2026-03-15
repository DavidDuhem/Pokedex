<script lang="ts">
	import AuthModal from '../modals/LoginModal.svelte';

	let showAuthModal = $state(false);
</script>

<button
	onclick={() => (showAuthModal = true)}
	class="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
>
	Connexion
</button>

{#if showAuthModal}
	<AuthModal onClose={() => (showAuthModal = false)} />
{/if}
