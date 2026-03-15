import { Request, Response, NextFunction, RequestHandler } from 'express';

export function controllerWrapper(mdw: RequestHandler): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await mdw(req, res, next);
		} catch (error: any) {
			if (error.name === 'ZodError') {
				return res.status(400).json({
					message: error.errors[0].message
				});
			}
			console.error(error);
			res.status(500).json({
				error: 'Unexpected server error. Please try again later.'
			});
		}
	};
}
