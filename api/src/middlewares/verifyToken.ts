import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwtHelper.js';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.accessToken;

	if (!token) {
		return res.status(401).json({
			message: 'Accès non autorisé'
		});
	}

	try {
		const decoded = verifyToken(token);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Session expirée ou invalide.'
		});
	}
};
