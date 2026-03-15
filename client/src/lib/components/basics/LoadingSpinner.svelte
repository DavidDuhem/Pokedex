<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let color: string = 'currentColor';

	const sizes = {
		sm: '1.5rem',
		md: '3rem',
		lg: '5rem'
	};
</script>

<div class="spinner-container" style="--spinner-size: {sizes[size]}; --spinner-color: {color}">
	<div class="spinner"></div>
</div>

<style>
	.spinner-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.spinner {
		width: var(--spinner-size);
		height: var(--spinner-size);
		border: calc(var(--spinner-size) / 8) solid rgba(0, 0, 0, 0.1);
		border-top-color: var(--spinner-color);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
