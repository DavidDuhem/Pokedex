import { Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = (process.env.JWT_SECRET || 'dev_secret_key') as string;

export interface TokenPayload {
	id: string;
	email: string;
}

export interface Cookie {
	cookieName: string;
	res: Response;
	token: string;
	maxAge: number;
}

export const generateAccessToken = (payload: TokenPayload): string => {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: '15m'
	});
};

export const verifyToken = (token: string): TokenPayload => {
	return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export function sendCookies({ cookieName, res, token, maxAge }: Cookie) {
	res.cookie(cookieName, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: maxAge,
		path: '/'
	});
}

export function clearCookies(res: Response) {
	res.clearCookie('pokedex_access_token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/'
	});
}
