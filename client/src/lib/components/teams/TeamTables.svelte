<script lang="ts">
	import type { Team } from '@pokedex/shared/schemas/team.schema';
	import { auth } from '$stores/auth-store.svelte';
	import { page } from '$app/state';

	let {
		teams = []
	}: {
		teams: Team[];
	} = $props();

	const currentUserId = $derived(Number(auth.user?.id));
	const isLoggedIn = $derived(auth.user !== null || page.data.user !== null);

	let editingId = $state<number | null>(null);
	let deletingId = $state<number | null>(null);

	let editName = $state('');
	let editDescription = $state('');

	function startEdit(team: Team) {
		editingId = team.id;
		deletingId = null;
		editName = team.name;
		editDescription = team.description;
	}

	function startDelete(id: number) {
		cancel();
		deletingId = id;
	}

	function cancel() {
		editingId = null;
		deletingId = null;
	}

	async function handleConfirmEdit(id: number) {
		// Handle confirm edit
		editingId = null;
	}

	async function handleConfirmDelete(id: number) {
		// Handle confirm delete
		deletingId = null;
	}
</script>

<div class="rounded-xl shadow-md w-full max-w-4xl mx-auto">
	<table class="w-full border-collapse table-fixed">
		<thead class="bg-red-500 text-white">
			<tr>
				<th class="text-left px-4 py-3 w-[20%]"></th>
				<th class="text-left px-4 py-3 w-[20%]">Nom</th>
				<th class="text-left px-4 py-3 w-[50%]">Description</th>
				<th class="text-center px-4 py-3 w-[30%]">Actions</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-red-100">
			{#each teams as team}
				<tr>
					<td class="px-4 py-3 font-semibold text-gray-800 whitespace-normal wrap-break-word">
						<img
							src="https://www.123-stickers.com/7667/autocollant-sacha-et-pikachu-pokemon.jpg"
							alt={team.name}
							class="w-16 h-16 object-contain rounded-lg border-2 border-red-500"
						/>
					</td>
					<td class="px-4 py-3 font-semibold text-gray-800 whitespace-normal wrap-break-word">
						{#if editingId === team.id}
							<input
								type="text"
								bind:value={editName}
								class="w-full max-w-full px-2 py-1 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
							/>
						{:else}
							<a href="/teams/{team.id}" class="link">{team.name}</a>
						{/if}
					</td>
					<td class="px-4 py-3 text-gray-600 whitespace-normal wrap-break-word">
						{#if editingId === team.id}
							<textarea
								bind:value={editDescription}
								rows="4"
								cols="40"
								class="w-full max-w-full px-2 py-1 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
							></textarea>
						{:else}
							{team.description}
						{/if}
					</td>
					<td class="px-4 py-3 text-right">
						<div class="flex flex-wrap justify-center gap-2">
							{#if isLoggedIn && currentUserId === team.profile_id}
								{#if editingId === team.id}
									<button
										class="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
										onclick={() => handleConfirmEdit(team.id)}
									>
										✅
									</button>
									<button
										class="bg-gray-400 text-black px-2 py-1 rounded hover:bg-gray-500 transition"
										onclick={cancel}
									>
										✖️
									</button>
								{/if}
								{#if editingId !== team.id && deletingId !== team.id}
									<a
										class="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700 transition"
										href="/teams/{team.id}"
									>
										👁️</a
									>
									<button
										onclick={() => startEdit(team)}
										class="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition"
									>
										📝
									</button>
								{/if}
								{#if deletingId === team.id}
									<button
										class="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
										onclick={() => handleConfirmDelete(team.id)}
									>
										✅
									</button>
									<button
										class="bg-gray-400 text-black px-2 py-1 rounded hover:bg-gray-500 transition"
										onclick={cancel}
									>
										✖️
									</button>
								{/if}
								{#if deletingId !== team.id && editingId !== team.id}
									<button
										onclick={() => startDelete(team.id)}
										class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
									>
										🗑️
									</button>
								{/if}
								<!-- {#if deletingId !== team.id && editingId !== team.id}
                  <DeleteButton
                    id={team.id}
                    onConfirm={confirmDelete}
                    withConfirmation={true}
                  />
                {/if} -->
							{:else}
								<a
									class="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700 transition"
									href="/teams/{team.id}"
								>
									👁️</a
								>
							{/if}
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
