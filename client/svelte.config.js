import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		paths: {
			base: '/pokedex',
			relative: false
		},
		alias: {
			$components: 'src/lib/components',
			'@pokedex/shared': '../shared',
			$stores: 'src/lib/stores'
		}
	}
};

export default config;
