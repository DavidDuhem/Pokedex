import type { User } from '@pokedex/shared/schemas/auth.schema';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
		}
	}
}

export {};
