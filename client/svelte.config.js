import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		paths: {
            		base: process.env.NODE_ENV === 'production' ? '/pokedex' : '',
        	},
		alias: {
			$components: 'src/lib/components',
			'@pokedex/shared': '../shared',
			$stores: 'src/lib/stores'
		}
	}
};

export default config;
