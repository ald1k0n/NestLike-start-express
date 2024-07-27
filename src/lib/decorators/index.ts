import 'reflect-metadata';
import { Router } from 'express';
import { RouteDefinition, Methods } from './type';
import Container from 'typedi';

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

export const router = Router();

function createMethodDecorator(method: Methods) {
	return (path: string) => {
		return (target: NonNullable<unknown>, propertyKey: string): void => {
			if (!Reflect.hasMetadata('routes', target.constructor)) {
				Reflect.defineMetadata('routes', [], target.constructor);
			}

			const routes = Reflect.getMetadata(
				'routes',
				target.constructor
			) as Array<RouteDefinition>;

			routes.push({
				method,
				path,
				methodName: propertyKey,
			});

			Reflect.defineMetadata('routes', routes, target.constructor);
		};
	};
}

export const Controller = (prefix: string): ClassDecorator => {
	return (target: NonNullable<unknown>) => {
		Reflect.defineMetadata('prefix', prefix, target);
		if (!Reflect.hasMetadata('routes', target)) {
			Reflect.defineMetadata('routes', [], target);
		}

		const routes: Array<RouteDefinition> = Reflect.getMetadata(
			'routes',
			target
		);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const instance = Container.get(target) as InstanceType<any>;
		routes.forEach((route: RouteDefinition) => {
			const methodColorCode = methodColor(route.method.toUpperCase());
			const coloredMethod = `${methodColorCode}${route.method.toUpperCase()}${
				colors.reset
			}`;

			console.log(`[${coloredMethod}] ${prefix}${route.path}`);
			router[route.method](
				`${prefix}${route.path}`,
				instance[route.methodName].bind(instance)
			);
		});
	};
};

export const Get = createMethodDecorator('get');
export const Delete = createMethodDecorator('delete');
export const Patch = createMethodDecorator('patch');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
