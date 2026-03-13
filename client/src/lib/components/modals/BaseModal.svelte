<script lang="ts">
	let { title, onClose, children } = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose();
		}

		if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
	onclick={onClose}
	onkeydown={handleKeydown}
	role="button"
	tabindex="0"
	aria-label="Fermer la fenêtre"
>
	<div
		class="relative w-full max-w-lg animate-pop-in rounded-2xl bg-white p-6 shadow-2xl"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
	>
		<button
			type="button"
			class="absolute top-4 right-4 cursor-pointer text-2xl leading-none text-gray-400 transition-colors hover:text-red-600"
			onclick={onClose}
			aria-label="Fermer la fenêtre"
		>
			&times;
		</button>

		{#if title}
			<h2 id="modal-title" class="mb-6 text-2xl font-black tracking-tight text-red-600">
				{title}
			</h2>
		{/if}

		{@render children?.()}
	</div>
</div>

<style>
	@keyframes pop-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	.animate-pop-in {
		animation: pop-in 0.2s ease-out;
	}
</style>
