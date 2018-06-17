/*!
 * Express Restful Routes v0.0.1
 *
 * Released under the MIT license
 * 
 * AtaruOhto
 * http://opensource.org/licenses/MIT
 */

import { Express, Request, Response, NextFunction } from "express";
import _flatMap from "lodash/flatMap";
import _sortBy from "lodash/sortBy";

import { RequestHandlerParams } from "express-serve-static-core";
import {
  defIndex,
  defShow,
  defNew,
  defEdit,
  defCreate,
  defUpdate,
  defDestroy
} from "./helpers/defActions";
import {
  defIndexPathHelper,
  defShowPathHelper,
  defNewPathHelper,
  defEditPathHelper,
  defCreatePathHelper,
  defUpdatePathHelper,
  defDestroyPathHelper
} from "./helpers/defHelpers";
import {
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
  D,
  validActions,
  ACTION_SORT_KEYS
} from "./helpers/Actions";

export interface IRouteHandlerDefinition {
  [key: string]: RequestHandlerParams;
}

export interface IRoutesDefinition {
  [key: string]: IRouteHandlerDefinition[];
}

const validateMethod = (httpMethod: string) => {
  if (validActions.indexOf(httpMethod) === -1) {
    throw new Error(
      `Invalid HTTP Method was Passed valid methods are ${validActions}! You passed ${httpMethod}`
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

const registerRoute = (
  app: Express,
  resource: string,
  method: string,
  handlers: RequestHandlerParams,
  helperObject: Object
) => {
  switch (method) {
    case INDEX:
    case I:
      defIndex(app, resource, handlers);
      defIndexPathHelper(resource, helperObject);
      break;
    case SHOW:
    case S:
      defShow(app, resource, handlers);
      defShowPathHelper(resource, helperObject);
      break;
    case NEW:
    case N:
      defNew(app, resource, handlers);
      defNewPathHelper(resource, helperObject);
      break;
    case EDIT:
    case E:
      defEdit(app, resource, handlers);
      defEditPathHelper(resource, helperObject);
      break;
    case CREATE:
    case C:
      defCreate(app, resource, handlers);
      defCreatePathHelper(resource, helperObject);
      break;
    case UPDATE:
    case U:
      defUpdate(app, resource, handlers);
      defUpdatePathHelper(resource, helperObject);
      break;
    case DESTROY:
    case D:
      defDestroy(app, resource, handlers);
      defDestroyPathHelper(resource, helperObject);
      break;
  }
};

export const defRoutes = (defs: IRoutesDefinition, helperName?: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const app = req.app as Express;
    const helper = helperName || "expressRestfulRoutes";
    const helperObject = (res.locals[helper] = res.locals[helper] || {});

    const mappings = pickActionAndResourceMapping(defs);
    mappings.forEach(mapping => {
      const resource = mapping.resource;

      /* Reorder Actions due to regular expression match of express routing */
      const sortedActions = _sortBy(mapping.actions, action =>
        ACTION_SORT_KEYS.indexOf(pickHttpMethodFromAction(action))
      );

      sortedActions.forEach(action => {
        const method = pickHttpMethodFromAction(action);
        validateMethod(method);
        const handlers = pickExpressHandlersFromAction(action);
        registerRoute(app, resource, method, handlers, helperObject);
      });
    });
    next();
  } catch (e) {
    throw new Error(e);
  }
};
