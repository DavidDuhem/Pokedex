<script>
	import BackButton from '$lib/components/basics/BackButton.svelte';
	import ConnexionButton from '$lib/components/basics/ConnexionButton.svelte';

	// let menuOpen = false;

	// function toggleMenu() {
	// 	menuOpen = !menuOpen;
	// }

	// function closeMenu() {
	// 	menuOpen = false;
	// }
</script>

<header class="sticky top-0 z-50 bg-red-500 shadow-md px-8 py-4">
	<nav class={`flex flex-row items-center justify-between`}>
		<div class="flex-1 flex justify-center gap-4 mt-5 sm:mt-0 flex-col sm:flex-row">
			<a
				href="/pokemons"
				class="w-full sm:w-auto text-center bg-white text-red-500 font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition"
				// on:click={closeMenu}
			>
				Pokémons
			</a>
			<a
				href="/teams"
				class="w-full sm:w-auto text-center bg-white text-red-500 font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition"
				// on:click={closeMenu}
			>
				Équipes
			</a>
			<a
				href="/types"
				class="w-full sm:w-auto text-center bg-white text-red-500 font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition"
				// on:click={closeMenu}
			>
				Types
			</a>
		</div>
	</nav>
</header>
