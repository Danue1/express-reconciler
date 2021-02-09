import type Express from "express";
import { Router } from "express";
import { Controller, Handler, METHOD_LIST } from "../commons";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      readonly router: RouterElementConfig & {
        readonly children: JSX.Element | readonly JSX.Element[];
      };
    }
  }
}

export interface RouterElementConfig {
  readonly path: string;
  readonly caseSensitive?: boolean;
  readonly mergeParams?: boolean;
  readonly strict?: boolean;
}

export class RouterElement {
  readonly intoController: () => Controller;

  // Methods
  readonly get!: Handler;
  readonly post!: Handler;
  readonly put!: Handler;
  readonly head!: Handler;
  readonly delete!: Handler;
  readonly options!: Handler;
  readonly trace!: Handler;
  readonly copy!: Handler;
  readonly lock!: Handler;
  readonly mkcol!: Handler;
  readonly move!: Handler;
  readonly purge!: Handler;
  readonly propfind!: Handler;
  readonly proppatch!: Handler;
  readonly unlock!: Handler;
  readonly report!: Handler;
  readonly mkactivity!: Handler;
  readonly checkout!: Handler;
  readonly merge!: Handler;
  readonly "m-search"!: Handler;
  readonly notify!: Handler;
  readonly subscribe!: Handler;
  readonly unsubscribe!: Handler;
  readonly patch!: Handler;
  readonly search!: Handler;
  readonly connect!: Handler;

  readonly use: {
    (controller: Controller): void;
    (path: string, controller: Controller): void;
  };

  readonly path: string;

  constructor({ path, caseSensitive, mergeParams, strict }: RouterElementConfig) {
    const router = Router({ caseSensitive, mergeParams, strict });

    // Assign methods
    // e.g. root.get('/', (req, res) => { ... });
    for (const method of METHOD_LIST) {
      const handler = (path: string, controller: Controller): void => {
        router[method](path, controller);
      };
      this[method] = handler as any;
    }

    this.use = (path: string | Controller, controller?: Controller): void => {
      if (typeof path === "string") {
        router.use(path, controller);
      } else {
        router.use(controller);
      }
    };

    this.path = path;
    this.intoController = (): Controller => (router as Express.RequestHandler<any, any, any, any, any>) as Controller;
  }
}
