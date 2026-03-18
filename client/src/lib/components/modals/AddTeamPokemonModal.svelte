<script lang="ts">
	import BaseModal from './BaseModal.svelte';
	import type { Pokemon } from '@pokedex/shared/schemas/pokemon.schema';
	import { PokemonService } from '../../../services/PokemonService';

	let { showModal = $bindable() } = $props();

	let search = $state('');
	let results = $state<Pokemon[]>([]);
	let isSearching = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	let pokemonToAddId = $state(-1);

	function OnInputChange() {
		isSearching = true;
		clearTimeout(timer);

		timer = setTimeout(async () => {
			if (search.length > 0) {
				results = await PokemonService.search(search, fetch);
			} else {
				results = [];
			}
			isSearching = false;
		}, 300);
	}

	async function confirmAddPokemon() {
		console.log(`Adding pokemon ${pokemonToAddId}`);
		// if (team) {
		// 	const teamId = team.id;

		// await teamService.addTeamPokemon(id, { pokemonId }, fetch);

		// const newPokemon = allPokemons.find((pokemon) => pokemon.id === pokemonId);
		// if (newPokemon) {
		// 	team.pokemons = [...team.pokemons, newPokemon];
		// }

		showModal = false;
		// }
	}
</script>

{#if showModal}
	<BaseModal title="Sélectionner un Pokémon" onClose={() => (showModal = false)}>
		<div class="flex flex-col gap-4">
			<input
				type="text"
				placeholder="Rechercher un pokémon"
				bind:value={search}
				oninput={OnInputChange}
				class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
			/>
			{#if isSearching}
				<p>Recherche en cours...</p>
			{:else if results.length > 0}
				<ul class="max-h-128 overflow-y-auto border rounded mt-2">
					{#each results as pokemon}
						<li>
							<button
								type="button"
								class={`flex items-center gap-3 p-2 w-full text-left rounded hover:bg-gray-100 cursor-pointer ${pokemon.id === pokemonToAddId ? 'bg-gray-200' : ''}`}
								onclick={() => (pokemonToAddId = pokemon.id)}
							>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
									alt={pokemon.name}
									class="w-12 h-12 rounded object-cover"
								/>
								<div class="flex flex-col">
									<span class="font-bold">{pokemon.name}</span>
									<span class="text-sm text-gray-500 italic">ID: {pokemon.id}</span>
								</div>
							</button>
						</li>
					{/each}
				</ul>
			{:else if search.length > 0}
				<p class="mt-2 text-gray-500 italic">Aucun Pokémon trouvé.</p>
			{/if}
		</div>
		<button
			class="bg-green-600 text-white px-4 py-2 mt-5 rounded hover:bg-green-700 transition"
			onclick={confirmAddPokemon}
		>
			Valider
		</button>
	</BaseModal>
{/if}
