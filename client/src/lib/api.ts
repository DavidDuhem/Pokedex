import axios from 'axios';
import { env } from '$env/dynamic/public';

export const api = axios.create({
	baseURL: env.PUBLIC_API_URL || 'http://localhost:5000',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
});
