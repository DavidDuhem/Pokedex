<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen bg-white text-white">
	<Header />

	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>

	<Footer />
</div>
