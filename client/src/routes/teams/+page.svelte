<script lang="ts">
	import TeamForm from '$components/teams/TeamForm.svelte';
	import TeamTables from '$components/teams/TeamTables.svelte';
	import { auth } from '$lib/stores/auth-store.svelte.js';
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import type { Team } from '@pokedex/shared/schemas/team.schema';

	let { data }: { data: PageData } = $props();

	let teams = $state<Team[]>([]);
	$effect(() => {
		if (data.apiResponse) {
			teams = data.apiResponse;
		}
	});
	const isLoggedIn = $derived(auth.isLoggedIn || page.data.user !== null);
</script>

<div class="max-w-4xl mx-auto px-4">
	<h1 class="text-3xl font-bold text-red-600 mb-4">Mes Équipes</h1>

	{#if isLoggedIn}
		<TeamForm bind:teams />

		{#if data.error}
			<p class="text-black">Erreur : {data.error}</p>
		{:else if teams.length === 0}
			<p class="text-black">Aucune équipe trouvée.</p>
		{:else}
			<TeamTables {teams} />
		{/if}
	{:else}
		<p class="text-lg text-black">Vous devez être connecté pour voir vos équipes.</p>
	{/if}
</div>
