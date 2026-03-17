import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z.string().min(3, 'Le pseudo doit faire 3 caractères min.'),
		email: z.string().email("Format d'email invalide"),
		password: z.string().min(8, 'Le mot de passe doit faire 8 caractères min.'),
		confirmPassword: z.string().min(8, 'Le mot de passe doit faire 8 caractères min.')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['confirmPassword']
	});

export const loginSchema = z.object({
	email: z.string().email("Format d'email invalide"),
	password: z.string().min(8, 'Le mot de passe doit faire 8 caractères min.')
});

export const userSchema = z.object({
	user: z.object({
		id: z.number()
	})
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type User = z.infer<typeof userSchema>;
