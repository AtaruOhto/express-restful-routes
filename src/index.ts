/*!
 * Express Restful Routes v0.0.1
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */

import { Express, Request, Response, NextFunction } from "express";
import _flatMap from "lodash/flatMap";
import { RequestHandlerParams } from "express-serve-static-core";

const INDEX = "index";
const SHOW = "show";
const NEW = "new";
const EDIT = "edit";
const CREATE = "create";
const UPDATE = "update";
const DESTROY = "destroy";
const I = "i";
const S = "s";
const N = "n";
const E = "e";
const C = "c";
const U = "u";
const D = "d";

export interface IRouteHandlerDefinition {
  [key: string]: RequestHandlerParams;
}

export interface IRoutesDefinition {
  [key: string]: IRouteHandlerDefinition[];
}

const validMethods = [
  INDEX,
  SHOW,
  NEW,
  EDIT,
  CREATE,
  UPDATE,
  DESTROY,
  I,
  S,
  N,
  E,
  C,
  U,
  D
];

const validateMethod = (httpMethod: string) => {
  if (validMethods.indexOf(httpMethod) === -1) {
    throw new Error(
      `Invalid HTTP Method was Passed valid methods are ${validMethods}! You passed ${httpMethod}`
    );
  }
};

const pickActionAndResourceMapping = (defs: IRoutesDefinition) => {
  return _flatMap(Object.keys(defs), resource => ({
    actions: defs[resource],
    resource
  }));
};

const pickHttpMethodFromAction = (action: IRouteHandlerDefinition) =>
  Object.keys(action)[0];

const pickExpressHandlersFromAction = (action: IRouteHandlerDefinition) =>
  Object.values(action)[0];

const defIndex = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  const path = `/${resource}`;
  app.get(path, handlers);
  app.locals.expressRestfulRoutes[`${resource}IndexPath`] = () => path;
};

const defShow = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.get(`/${resource}/:param`, handlers);
  app.locals.expressRestfulRoutes[`${resource}ShowPath`] = (param: string) =>
    `/${resource}/${param}`;
};

const defNew = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  const path = `/${resource}/new`;
  app.get(path, handlers);
  app.locals.expressRestfulRoutes[`${resource}NewPath`] = (param: string) =>
    `/${resource}/${param}`;
};

const defEdit = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.get(`/${resource}/:param/edit`, handlers);
  app.locals.expressRestfulRoutes[`${resource}EditPath`] = (param: string) =>
    `/${resource}/${param}/edit`;
};

const defCreate = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  const path = `/${resource}`;
  app.post(path, handlers);
  app.locals.expressRestfulRoutes[`${resource}CreatePath`] = () => path;
};

const defUpdate = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.patch(`/${resource}/:param`, handlers);
  app.locals.expressRestfulRoutes[`${resource}UpdatePath`] = (param: string) =>
    `/${resource}/${param}`;
};

const defDestroy = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.delete(`/${resource}/:param`, handlers);
  app.locals.expressRestfulRoutes[`${resource}DestroyPath`] = (param: string) =>
    `/${resource}/${param}`;
};

const registerRoute = (
  app: Express,
  resource: string,
  method: string,
  handlers: RequestHandlerParams
) => {
  switch (method) {
    case INDEX:
    case I:
      defIndex(app, resource, handlers);
      break;
    case SHOW:
    case S:
      defShow(app, resource, handlers);
      break;
    case NEW:
    case N:
      defNew(app, resource, handlers);
      break;
    case EDIT:
    case E:
      defEdit(app, resource, handlers);
      break;
    case CREATE:
    case C:
      defCreate(app, resource, handlers);
      break;
    case UPDATE:
    case U:
      defUpdate(app, resource, handlers);
      break;
    case DESTROY:
    case D:
      defDestroy(app, resource, handlers);
      break;
  }
};

export const defRoutes = (defs: IRoutesDefinition) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const app = req.app as Express;
  app.locals.expressRestfulRoutes = {};

  const mappings = pickActionAndResourceMapping(defs);
  mappings.forEach(mapping => {
    const resource = mapping.resource;
    mapping.actions.forEach(action => {
      const method = pickHttpMethodFromAction(action);
      validateMethod(method);
      const handlers = pickExpressHandlersFromAction(action);
      registerRoute(app, resource, method, handlers);
    });
  });

  next();
};
