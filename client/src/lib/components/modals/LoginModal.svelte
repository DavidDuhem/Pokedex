<script lang="ts">
	import BaseModal from './BaseModal.svelte';

	let { isOpen, onClose, onLogin, onRegister } = $props();

	let isRegistering = $state(false);
	let email = $state('');
	let username = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	let errorMessage = $state('');
	let successMessage = $state('');

	function toggleMode() {
		isRegistering = !isRegistering;
		errorMessage = '';
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		errorMessage = '';

		if (isRegistering) {
			if (password !== confirmPassword) {
				errorMessage = 'Les mots de passe ne correspondent pas.';
				return;
			}
			await onRegister({ email, username, password });
		} else {
			await onLogin({ email, password });
		}
	}
</script>

{#if isOpen}
	<BaseModal title={isRegistering ? 'Créer un compte' : 'Connexion'} {onClose}>
		<form onsubmit={handleSubmit} class="flex flex-col gap-4 text-black">
			<div class="space-y-1">
				<label for="email" class="text-sm font-bold text-gray-700">E-Mail</label>
				<input
					type="email"
					bind:value={email}
					required
					class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
				/>
			</div>

			{#if isRegistering}
				<div class="space-y-1">
					<label for="username" class="text-sm font-bold text-gray-700">Pseudo</label>
					<input
						type="text"
						bind:value={username}
						required
						class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
					/>
				</div>
			{/if}

			<div class="space-y-1">
				<label for="password" class="text-sm font-bold text-gray-700">Mot de passe</label>
				<input
					type="password"
					bind:value={password}
					required
					class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
				/>
			</div>

			{#if isRegistering}
				<div class="space-y-1">
					<label for="confirm" class="text-sm font-bold text-gray-700"
						>Confirmer le mot de passe</label
					>
					<input
						type="password"
						bind:value={confirmPassword}
						required
						class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
					/>
				</div>
			{/if}

			{#if errorMessage}
				<p class="text-red-500 text-sm font-medium">{errorMessage}</p>
			{/if}

			<button
				type="submit"
				class="bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-all active:scale-95 cursor-pointer mt-2"
			>
				{isRegistering ? "S'inscrire" : 'Se connecter'}
			</button>

			<button
				type="button"
				onclick={toggleMode}
				class="text-sm text-gray-500 hover:text-red-600 transition-colors"
			>
				{isRegistering ? 'Déjà un compte ? Se connecter' : "Pas encore de compte ? S'inscrire"}
			</button>
		</form>
	</BaseModal>
{/if}
