import { Service } from 'typedi';
import { Controller, Get, Post } from '../../../lib/decorators';
import { Request, RequestHandler, Response } from 'express';
import { MethodNotAllowed } from '../../../lib/error';

const logMiddleware: RequestHandler = (req, res, next) => {
	console.log('Logging request...');
	next();
};

@Controller('/users', logMiddleware)
@Service()
export default class UserContoller {
	@Get('/')
	getUser() {
		throw new MethodNotAllowed();
	}

	@Post('/')
	postUser(req: Request, res: Response) {
		return res.send(req.body);
	}
}
