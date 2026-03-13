<script>
	import AuthModal from '../modals/LoginModal.svelte';

	let showLogin = $state(false);

	//typer avec les futurs types
	async function handleLogin(data) {
		console.log('Tentative de connexion :', data);
	}

	//typer avec les futurs types
	async function handleRegister(data) {
		console.log("Tentative d'inscription :", data);
	}
</script>

<button
	onclick={() => (showLogin = true)}
	class="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
>
	Connexion
</button>

{#if showLogin}
	<AuthModal
		isOpen={showLogin}
		onClose={() => (showLogin = false)}
		onLogin={handleLogin}
		onRegister={handleRegister}
	/>
{/if}
