import express, {
	Application,
	RequestHandler,
	Request,
	Response,
	NextFunction,
} from 'express';
import { router } from './decorators';

interface AppInit {
	port: number;
	middleWares: RequestHandler[];
	staticPath?: string;
}

export class App {
	private app: Application;
	private port: number;

	constructor(appInit: AppInit) {
		this.app = express();
		this.app.use(express.json());
		this.port = appInit.port;
		this.middlewares(appInit.middleWares);
		this.statics(appInit.staticPath);
		this.app.use(router);
		this.handleError();
	}

	private middlewares(middleWares: RequestHandler[]) {
		middleWares.forEach((middleWare) => {
			this.app.use(middleWare);
		});
	}

	private statics(path: string = 'public') {
		this.app.use(`/${path}`, express.static('public'));
	}

	private handleError() {
		this.app.use(
			(err: Error, _: Request, res: Response, next: NextFunction) => {
				if (err) {
					return res.status(500).json({
						status: 500,
						message: err?.message,
						name: err.name,
					});
				}
				next();
			}
		);
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on port: ${this.port}`);
		});
	}
}
