<script>
	import ConnexionButton from '../basics/ConnexionButton.svelte';
</script>

<header class="bg-slate-900 border-b border-slate-800 p-4 shadow-md mb-10">
	<div class="container mx-auto flex justify-between items-center">
		<div class="flex items-center gap-8">
			<h1 class="text-2xl font-bold text-red-500 tracking-tighter">
				<a href="/">POKÉ<span class="text-white">DEX</span></a>
			</h1>

			<nav class="hidden md:flex space-x-6 text-slate-300 font-medium">
				<a href="/pokemon" class="hover:text-white transition-colors">Pokémons</a>
				<a href="/teams" class="hover:text-white transition-colors">Équipes</a>
				<!-- <a href="/types" class="hover:text-white transition-colors">Types</a> -->
			</nav>
		</div>

		<div class="flex items-center">
			<ConnexionButton />
		</div>
	</div>
</header>
