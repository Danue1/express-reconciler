import { Context, Controller, Method } from "../commons";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      readonly get: Route;
      readonly post: Route;
      readonly put: Route;
      readonly _head: Route;
      readonly delete: Route;
      readonly options: Route;
      readonly trace: Route;
      readonly copy: Route;
      readonly lock: Route;
      readonly mkcol: Route;
      readonly move: Route;
      readonly purge: Route;
      readonly propfind: Route;
      readonly proppatch: Route;
      readonly unlock: Route;
      readonly report: Route;
      readonly mkactivity: Route;
      readonly checkout: Route;
      readonly merge: Route;
      readonly "m-search": Route;
      readonly notify: Route;
      readonly subscribe: Route;
      readonly unsubscribe: Route;
      readonly patch: Route;
      readonly search: Route;
      readonly connect: Route;
    }
  }
}

export interface Route<C extends Context<any, any, any, any> = Context<any, any, any, any>> {
  readonly path: string;
  readonly controller: Controller<C>;
}

export class RouteElement {
  constructor(readonly method: Method, readonly path: string, readonly controller: Controller<any>) {}
}
