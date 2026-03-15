<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import { fade } from 'svelte/transition';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { auth } from '$stores/auth-store.svelte.js';
	import LoadingSpinner from '$lib/components/basics/LoadingSpinner.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	$effect(() => {
		if (data.user) {
			auth.login(data.user);
		} else {
			auth.logout();
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen bg-white text-white">
	<Header />

	<main class="flex-1 flex flex-col">
		{#if auth.isLoading}
			<div
				class="overlay-loading"
				in:fade={{ delay: 300, duration: 200 }}
				out:fade={{ duration: 100 }}
			>
				<div class="loader-content">
					<LoadingSpinner size="lg" color="#3b82f6" />
					<p>Chargement...</p>
				</div>
			</div>
		{/if}
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.overlay-loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(4px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}

	.loader-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		font-weight: 500;
		color: #3b82f6;
	}
</style>
