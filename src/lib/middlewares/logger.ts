import { NextFunction, Request, Response } from 'express';

const colors = {
	reset: '\x1b[0m',
	green: '\x1b[32m',
	blue: '\x1b[34m',
	yellow: '\x1b[33m',
	red: '\x1b[31m',
};

const methodColor = (method: string) => {
	switch (method.toUpperCase()) {
		case 'GET':
			return colors.green;
		case 'POST':
			return colors.blue;
		case 'PUT':
			return colors.yellow;
		case 'DELETE':
			return colors.red;
		default:
			return colors.reset;
	}
};

export const loggerMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const body = req.body ? JSON.stringify(req.body) : 'No body';

	const methodColorCode = methodColor(req.method.toUpperCase());
	const coloredMethod = `${methodColorCode}${req.method.toUpperCase()}${
		colors.reset
	}`;

	console.log(`[${coloredMethod}] ${req.path}, ${body}`);

	next();
};
