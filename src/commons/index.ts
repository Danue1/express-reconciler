import type Express from "express";
import { ContentType, ResponseBuilder } from "../internalMiddlewares";

export type Request = Express.Request;

export type Response = Express.Response;

export type NextFunction = Express.NextFunction;

export type Middleware = <Request = Express.Request, Response = Express.Response, NextFunction = Express.NextFunction>(
  request: Request,
  response: Response,
  next: NextFunction
) => void;

export interface Context<Parameter, Query, Body, Header> {
  readonly params: Parameter;
  readonly query: Query;
  readonly body: Body;
  readonly header: Header;
}

export type ParameterContext<Parameter> = Context<Parameter, any, any, any>;

export type QueryContext<Query> = Context<any, Query, any, any>;

export type BodyContext<Body> = Context<any, any, Body, any>;

export type HeaderContext<Header> = Context<any, any, any, Header>;

export type Controller<C extends Context<any, any, any, any> = Context<any, any, any, any>> = (context: C) => void | ResponseBuilder;

export type Handler<C extends Context<any, any, any, any> = Context<any, any, any, any>> = (path: string, controller: C) => void;

export const METHOD_LIST = [
  "get",
  "post",
  "put",
  "head",
  "delete",
  "options",
  "trace",
  "copy",
  "lock",
  "mkcol",
  "move",
  "purge",
  "propfind",
  "proppatch",
  "unlock",
  "report",
  "mkactivity",
  "checkout",
  "merge",
  "m-search",
  "notify",
  "subscribe",
  "unsubscribe",
  "patch",
  "search",
  "connect",
] as const;

export const methods = new Set(METHOD_LIST);

export type Method = typeof METHOD_LIST[number];
