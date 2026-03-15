import { TokenPayload } from '../utils/jwt.helper.js';

declare global {
	namespace Express {
		interface Request {
			user?: TokenPayload;
		}
	}
}

export {};
