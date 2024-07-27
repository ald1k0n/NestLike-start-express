import { Service } from 'typedi';
import { Controller, Get, Post } from '../../../lib/decorators';
import { Request, Response } from 'express';

@Controller('/users')
@Service()
export default class UserContoller {
	@Get('/')
	getUser() {
		throw new Error('ahhaha');
	}

	@Post('/')
	postUser(req: Request, res: Response) {
		return res.send(req.body);
	}
}
