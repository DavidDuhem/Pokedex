<script lang="ts">
	import { AuthService } from '../../../services/AuthServices';
	import { registerSchema, loginSchema } from '@pokedex/shared/schemas/auth';
	import type { RegisterInput, LoginInput } from '@pokedex/shared/schemas/auth';
	import BaseModal from './BaseModal.svelte';
	import { requestApi } from '../../../services/utils';

	let { onClose } = $props<{ onClose: () => void }>();

	let isLogin = $state(true);
	let isLoading = $state(false);

	let email = $state('');
	let username = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	let errorMessage = $state('');

	function toggleMode() {
		isLogin = !isLogin;
		errorMessage = '';
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		errorMessage = '';
		isLoading = true;

		if (isLogin) {
			await requestApi({
				schema: loginSchema,
				data: { email, password },
				request: (data) => AuthService.login(data),
				onLoading: (val) => (isLoading = val),
				onError: (msg) => (errorMessage = msg),
				onSuccess: (res) => {
					onClose();
				}
			});
		} else {
			await requestApi({
				schema: registerSchema,
				data: { email, username, password, confirmPassword },
				request: (data) => AuthService.register(data),
				onLoading: (val) => (isLoading = val),
				onError: (msg) => (errorMessage = msg),
				onSuccess: (res) => {
					onClose();
				}
			});
		}

		isLoading = false;
	}
</script>

<BaseModal title={isLogin ? 'Connexion' : 'Créer un compte'} {onClose}>
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

		{#if !isLogin}
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

		{#if !isLogin}
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
			{isLogin ? 'Se connecter' : "S'inscrire"}
		</button>

		<button
			type="button"
			onclick={toggleMode}
			class="text-sm text-gray-500 hover:text-red-600 transition-colors"
		>
			{isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
		</button>
	</form>
</BaseModal>
