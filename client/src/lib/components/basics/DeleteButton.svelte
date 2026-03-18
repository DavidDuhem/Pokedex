<script>
	let { id, startText, confirmText, cancelText, withConfirmation, onConfirm } = $props();

	let isDeleting = $state(false);

	function start() {
		isDeleting = true;
	}

	function cancel() {
		isDeleting = false;
	}

	async function confirm() {
		await onConfirm(id);
		isDeleting = false;
	}
</script>

{#if withConfirmation && isDeleting}
	<button
		class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
		onclick={confirm}
	>
		{confirmText}
	</button>
	<button
		class="bg-gray-400 text-black px-3 py-1 rounded hover:bg-gray-500 transition"
		onclick={cancel}
	>
		{cancelText}
	</button>
{:else}
	<button
		class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
		onclick={withConfirmation ? start : confirm}
	>
		{startText}
	</button>
{/if}
