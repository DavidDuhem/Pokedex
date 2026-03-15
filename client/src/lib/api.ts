import axios from 'axios';
import { env } from '$env/dynamic/public';

export const api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
});
