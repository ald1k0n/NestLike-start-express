import { App } from './lib/app';
import { loggerMiddleware } from './lib/middlewares/logger';

import './modules/user';

new App({
	middleWares: [loggerMiddleware],
	port: 8080,
}).listen();
