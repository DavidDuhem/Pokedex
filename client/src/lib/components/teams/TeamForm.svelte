<script lang="ts">
	let name = $state<number | null>(null);
	let description = $state<number | null>(null);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		// Handle new team submit
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
			class="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
		/>
	</div>
	<div class="flex-1">
		<label class="hidden" for="description">Description</label>
		<input
			id="description"
			type="text"
			placeholder="Description"
			bind:value={description}
			class="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
		/>
	</div>
	<button
		type="submit"
		class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition h-fit"
	>
		Ajouter
	</button>
</form>
