import { NextFunction, Request, Response } from 'express';
import { Logger } from '../logger';

export const loggerMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const body = req.body ? JSON.stringify(req.body) : 'No body';

	const logger = new Logger();

	logger.debug(`[${req.method.toUpperCase()}]: ${req.path}, ${body}`);

	next();
};
