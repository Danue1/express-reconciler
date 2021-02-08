import Express from "express";
import { Controller, Handler, METHOD_LIST, Middleware } from "../commons";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      readonly app: RootElementConfig & {
        readonly children: JSX.Element | readonly JSX.Element[];
      };
    }
  }
}

export type OnListen = (port: number) => void;

export interface RootElementConfig {
  readonly port?: number;
  readonly middleware?: Middleware[];
  readonly urlEncoded?: null | boolean;
  readonly onListen?: OnListen;
}

export class RootElement {
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

  readonly use: (controller: Controller) => void;

  constructor({ port = 8080, middleware = [], urlEncoded = null, onListen = () => {} }: RootElementConfig) {
    const app = Express();
    app.use(Express.json());
    if (urlEncoded) {
      app.use(Express.urlencoded({ extended: urlEncoded }));
    }
    if (middleware.length) {
      app.use(middleware);
    }

    // Assign methods
    // e.g. root.get('/', (req, res) => { ... });
    for (const method of METHOD_LIST) {
      const handler = (path: string, controller: Controller): void => {
        app[method](path, controller);
      };
      this[method] = handler as any;
    }

    this.use = (controller: Controller): void => {
      app.use(controller);
    };

    app.listen(port, () => onListen(port));
  }
}
