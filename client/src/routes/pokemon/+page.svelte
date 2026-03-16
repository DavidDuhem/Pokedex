<script lang="ts">
	import PokemonCardTable from '$components/pokemons/PokemonCardTable.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const res = $derived(data.apiResponse);
	const pokemons = $derived(res?.data || []);
	const pagination = $derived(res?.pagination);
</script>

<div class="max-w-4xl mx-auto px-4">
	<h1 class="text-3xl font-bold text-red-600 mb-4">Liste des Pokémons</h1>
	{#if data.error}
		<p>Erreur : {data.error}</p>
	{:else if !pokemons || pokemons.length === 0}
		<p>Aucun pokémon trouvé.</p>
	{:else if res && pagination}
		<PokemonCardTable
			{pokemons}
			totalPokemon={pagination.totalPokemon}
			pokemonPerPage={pagination.pokemonPerPage}
			currentPage={pagination.currentPage}
		/>
	{/if}
</div>
