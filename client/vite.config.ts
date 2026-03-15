import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [tailwindcss(), sveltekit()],
		server: {
			host: true,
			watch: {
				usePolling: true
			},
			hmr: {
				clientPort: 3004
			},
			fs: {
				allow: ['..']
			},
			proxy: {
				'/api': {
					target: env.VITE_API_URL || 'http://api:5000',
					changeOrigin: true
				}
			}
		}
	};
});
