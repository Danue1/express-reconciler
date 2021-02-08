import type Express from "express";
import { static as _static } from "express";
import { join } from "path";
import { Controller } from "../commons";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			readonly static: StaticOption & {
				readonly path: string;
			};
		}
	}
}

export type StaticOption = Parameters<typeof _static>[1];

export class StaticElement {
	readonly intoController: () => Controller;

	constructor(path: string, option: StaticOption) {
		const router = _static(join(__dirname, "../..", path), option);

		this.intoController = (): Controller => (router as Express.RequestHandler<any, any, any, any, any>) as Controller;
	}
}
