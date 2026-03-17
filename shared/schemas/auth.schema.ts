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

export const registerApiResponseSchema = z.object({
	message: z.string(),
	user: z.object({ id: z.number() })
});

export const loginSchema = z.object({
	email: z.string().email("Format d'email invalide"),
	password: z.string().min(8, 'Le mot de passe doit faire 8 caractères min.')
});

export const loginApiResponseSchema = z.object({
	message: z.string(),
	user: z.object({ id: z.number() })
});

export const userSchema = z.object({
	id: z.number(),
	email: z.string().email().optional(),
	username: z.string().optional()
});

export const apiUserResponseSchema = z.object({
	user: userSchema
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterApiResponse = z.infer<typeof registerApiResponseSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type User = z.infer<typeof userSchema>;
export type ApiUserResponse = z.infer<typeof apiUserResponseSchema>;
export type LoginApiResponse = z.infer<typeof loginApiResponseSchema>;
