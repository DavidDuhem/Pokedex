<script lang="ts">
	import TeamForm from '$components/teams/TeamForm.svelte';
	import TeamTables from '$components/teams/TeamTables.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let localResponse = $state<PageData['apiResponse']>(null);
	$effect(() => {
		localResponse = data.apiResponse;
	});

	const teams = $derived(localResponse || []);
</script>

<div class="max-w-4xl mx-auto px-4">
	<h1 class="text-3xl font-bold text-red-600 mb-4">Mes Équipes</h1>

	<TeamForm />

	{#if data.error}
		<p>Erreur : {data.error}</p>
	{:else if teams.length === 0}
		<p>Aucune équipe trouvée.</p>
	{:else}
		<TeamTables {teams} />
	{/if}
</div>
