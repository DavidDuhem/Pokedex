import { Request, Response } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { registerSchema, loginSchema } from '@pokedex/shared/schemas/auth.js';
import { sequelize } from '../config/db.js';
import { Auth, Profile } from '../models/index.js';

export class AuthController {
	public register = controllerWrapper(async (req: Request, res: Response) => {
		const { username, email, password, confirmPassword } = await registerSchema.parseAsync(
			req.body
		);

		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
		}

		const existingAuth = await Auth.findOne({ where: { email } });
		if (existingAuth) {
			return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
		}

		const existingProfile = await Profile.findOne({ where: { username } });
		if (existingProfile) {
			return res.status(409).json({ message: 'Ce pseudo est déjà pris.' });
		}

		const t = await sequelize.transaction();

		try {
			const newAuth = await Auth.create(
				{
					email,
					password
				},
				{ transaction: t }
			);

			await Profile.create(
				{
					username,
					auth_id: newAuth.id
				},
				{ transaction: t }
			);

			await t.commit();

			res.status(201).json({ message: 'Utilisateur créé avec succès' });
		} catch (error) {
			await t.rollback();
			throw error;
		}
	});

	public login = controllerWrapper(async (req: Request, res: Response) => {});
}
