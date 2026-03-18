<script lang="ts">
	let { title, onClose, children } = $props();

	let mouseDownOnBackdrop = false;

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose();
		}

		if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			onClose();
		}
	}

	function handleMouseDown(e: MouseEvent) {
		// On enregistre SI le clic a commencé sur le fond noir
		mouseDownOnBackdrop = e.target === e.currentTarget;
	}

	function handleMouseUp(e: MouseEvent) {
		// On ne ferme QUE si le clic a commencé sur le fond noir
		// ET s'est terminé sur le fond noir
		if (mouseDownOnBackdrop && e.target === e.currentTarget) {
			onClose();
		}
		// On réinitialise toujours
		mouseDownOnBackdrop = false;
	}

	function handleInternalKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') return;
		e.stopPropagation();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 z-50 flex justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	role="button"
	tabindex="0"
>
	<div
		class="relative my-auto w-full max-w-lg animate-pop-in rounded-2xl bg-white p-6 shadow-2xl outline-none"
		onmousedown={(e) => e.stopPropagation()}
		onmouseup={(e) => e.stopPropagation()}
		onkeydown={handleInternalKeydown}
		role="dialog"
		aria-modal="true"
		tabindex="0"
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
