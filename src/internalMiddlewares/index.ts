import { Controller, Request, Response } from "../commons";

export const asyncHandler = (controller: Controller) => async (request: Request, response: Response): Promise<void> => {
  try {
    if (!response.locals.$$context) {
      const { query, params, body, headers } = request;
      response.locals.$$context = { query, params, body, headers };
    }

    await Promise.resolve(controller(response.locals.$$context)).then((builder = ResponseBuilder.of()) =>
      response.status(builder[STATUS_CODE]).send(body(builder[CONTENT_TYPE], builder[BODY]))
    );
  } catch (error) {
    response.status(400).send(error);
  }
};

const STATUS_CODE = Symbol("statusCode");
const CONTENT_TYPE = Symbol("contentType");
const BODY = Symbol("body");

export class ResponseBuilder {
  static of(): ResponseBuilder {
    return new ResponseBuilder();
  }

  private [STATUS_CODE] = 200;
  private [BODY]?: any;
  private [CONTENT_TYPE]: ContentType | string = ContentType.JSON;

  private constructor() {}

  statusCode(statusCode: number): this {
    this[STATUS_CODE] = statusCode;
    return this;
  }

  contentType(contentType: ContentType): this {
    this[CONTENT_TYPE] = contentType;
    return this;
  }

  body(body: any): this {
    this[BODY] = body;
    return this;
  }
}

export enum ContentType {
  Text = "text/plain",
  HTML = "text/html",
  JSON = "application/json",
}

const body = (contentType: ContentType, body: any): string => {
  switch (contentType) {
    case ContentType.Text: {
      return body.toString();
    }
    case ContentType.HTML: {
      throw new Error("Not implemented!");
    }
    case ContentType.JSON: {
      return JSON.stringify(body);
    }
  }
  return body;
};
