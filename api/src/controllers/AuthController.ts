import { Request, Response } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { registerSchema, loginSchema } from '@pokedex/shared/schemas/auth.js';
import { sequelize } from '../config/db.js';
import { Auth, Profile } from '../models/index.js';
import { generateAccessToken, sendCookie } from '../utils/jwtHelper.js';

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

			res.status(201).json({ message: 'Compte créé ! Vous pouvez vous connecter' });
		} catch (error) {
			await t.rollback();
			throw error;
		}
	});

	public login = controllerWrapper(async (req: Request, res: Response) => {
		const { email, password } = await loginSchema.parseAsync(req.body);

		const existingAuth = await Auth.findOne({ where: { email } });
		if (!existingAuth || !(await existingAuth.checkPassword(password))) {
			return res.status(401).json({
				message: 'Identifiants invalides'
			});
		}

		const accessToken = generateAccessToken({
			id: existingAuth.id.toString(),
			email: existingAuth.email
		});

		sendCookie({
			cookieName: 'accessToken',
			res,
			token: accessToken,
			maxAge: 15 * 60 * 1000
		});

		res.status(200).json({
			message: 'Connexion réussie'
		});
	});
}
