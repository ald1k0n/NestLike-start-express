export type Methods = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type RouteDefinition = {
	path: string;
	method: Methods;
	methodName: string;
};
