<script lang="ts">
	import {
		updateTeamSchema,
		type Team,
		type UpdateTeamInput
	} from '@pokedex/shared/schemas/team.schema';
	import { auth } from '$stores/auth-store.svelte';
	import { page } from '$app/state';
	import { TeamService } from '../../../services/TeamService';
	import { invalidateAll } from '$app/navigation';
	import { requestApi } from '../../../services/utils';
	import z from 'zod';

	let {
		teams = $bindable([])
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

	async function handleConfirmEdit(teamId: number) {
		await requestApi<UpdateTeamInput, Team>({
			schema: updateTeamSchema,
			data: {
				name: editName,
				description: editDescription
			},
			request: (validatedData) => TeamService.updateTeam(teamId, validatedData, fetch),
			onSuccess: (updatedTeam) => {
				teams = teams.map((team) => (team.id === teamId ? updatedTeam : team));
				editingId = null;
			}
		});
	}

	async function handleConfirmDelete(teamId: number) {
		await requestApi<number, { message: string }>({
			schema: z.number(),
			data: teamId,
			request: (id) => TeamService.deleteTeam(id, fetch),
			onSuccess: () => {
				teams = teams.filter((team) => team.id !== teamId);
				deletingId = null;
			}
		});
	}
</script>

<div class="rounded-xl shadow-md w-full max-w-4xl mx-auto overflow-hidden">
	<table class="w-full border-collapse">
		<thead class="hidden md:table-header-group bg-red-500 text-white">
			<tr>
				<th class="text-left px-4 py-3 w-[15%]">Aperçu</th>
				<th class="text-left px-4 py-3 w-[20%]">Nom</th>
				<th class="text-left px-4 py-3 w-[45%]">Description</th>
				<th class="text-center px-4 py-3 w-[20%]">Actions</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-red-100">
			{#each teams as team}
				<tr class="flex flex-col md:table-row p-4 md:p-0 border-b md:border-b-0">
					<td class="flex justify-center md:table-cell px-4 py-3">
						<img
							src="https://www.123-stickers.com/7667/autocollant-sacha-et-pikachu-pokemon.jpg"
							alt={team.name}
							class="w-20 h-20 md:w-16 md:h-16 object-contain rounded-lg border-2 border-red-500"
						/>
					</td>

					<td
						class="block md:table-cell px-4 py-2 md:py-3 font-bold md:font-semibold text-gray-800 text-center md:text-left"
					>
						<span class="md:hidden text-xs uppercase text-gray-400 block">Nom</span>
						{#if editingId === team.id}
							<input
								type="text"
								bind:value={editName}
								class="w-full px-2 py-1 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500"
							/>
						{:else}
							<a href="teams/{team.id}" class="text-red-600 hover:underline text-lg md:text-base"
								>{team.name}</a
							>
						{/if}
					</td>

					<td class="block md:table-cell px-4 py-2 md:py-3 text-gray-600">
						<span class="md:hidden text-xs uppercase text-gray-400 block font-semibold"
							>Description</span
						>
						{#if editingId === team.id}
							<textarea
								bind:value={editDescription}
								rows="3"
								class="w-full px-2 py-1 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500"
							></textarea>
						{:else}
							<p class="text-sm md:text-base line-clamp-3 md:line-clamp-none">
								{team.description}
							</p>
						{/if}
					</td>

					<td class="block md:table-cell px-4 py-4 md:py-3 text-center">
						<div class="flex flex-wrap justify-center md:justify-center gap-3">
							{#if isLoggedIn && currentUserId === team.profile_id}
								{#if editingId === team.id}
									<button
										class="flex items-center justify-center w-9 h-9 bg-green-600 text-white p-2 rounded-lg shadow hover:bg-green-700 transition"
										onclick={() => handleConfirmEdit(team.id)}
										title="Confirmer"
									>
										✅
									</button>
									<button
										class="flex items-center justify-center w-9 h-9 bg-gray-400 text-white p-2 rounded-lg shadow hover:bg-gray-500 transition"
										onclick={cancel}
										title="Annuler"
									>
										✖️
									</button>
								{:else if deletingId === team.id}
									<button
										class="flex items-center justify-center w-9 h-9 bg-green-600 text-white p-2 rounded-lg shadow hover:bg-green-700 transition"
										onclick={() => handleConfirmDelete(team.id)}
									>
										Confirmer suppression ✅
									</button>
									<button
										class="w-9 h-9 bg-gray-400 text-white p-2 rounded-lg shadow hover:bg-gray-500 transition"
										onclick={cancel}
									>
										Annuler ✖️
									</button>
								{:else}
									<a
										class="flex items-center justify-center w-9 h-9 bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition"
										href="teams/{team.id}"
									>
										👁️
									</a>
									<button
										onclick={() => startEdit(team)}
										class="flex items-center justify-center w-9 h-9 bg-amber-100 text-amber-600 p-2 rounded-lg border border-amber-200 hover:bg-amber-200 transition"
									>
										📝
									</button>
									<button
										onclick={() => startDelete(team.id)}
										class="flex items-center justify-center w-9 h-9 bg-red-600 text-white p-2 rounded-lg shadow hover:bg-red-700 transition"
									>
										🗑️
									</button>
								{/if}
							{:else}
								<a
									class="flex items-center justify-center w-9 h-9 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
									href="teams/{team.id}"
								>
									Voir l'équipe 👁️
								</a>
							{/if}
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
