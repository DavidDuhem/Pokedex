<script lang="ts">
	import type { Team } from '@pokedex/shared/schemas/team.schema';
	import { TeamService } from '../../../services/TeamService';

	let { teams = $bindable() }: { teams: Team[] } = $props();

	let name = $state('');
	let description = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!name || name.trim() === '') return;

		const teamToAdd = {
			name: name,
			description: description || 'Aucune description'
		};

		const res = await TeamService.addTeam(teamToAdd, fetch);
		if (res) {
			teams = [...teams, res.team as Team];

			name = '';
			description = '';
		}
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-4 sm:flex-row sm:items-end mb-6">
	<div class="flex-1">
		<label class="hidden" for="name">Nom</label>
		<input
			id="name"
			type="text"
			placeholder="Nom de l'équipe"
			bind:value={name}
			class="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
		/>
	</div>
	<div class="flex-1">
		<label class="hidden" for="description">Description</label>
		<input
			id="description"
			type="text"
			placeholder="Description"
			bind:value={description}
			class="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
		/>
	</div>
	<button
		type="submit"
		class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition h-fit"
	>
		Ajouter
	</button>
</form>
