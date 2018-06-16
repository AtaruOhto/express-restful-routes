"use strict";
/*!
 * Express Restful Routes v0.0.1
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flatMap_1 = __importDefault(require("lodash/flatMap"));
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
const validateMethod = (httpMethod) => {
    if (validMethods.indexOf(httpMethod) === -1) {
        throw new Error(`Invalid HTTP Method was Passed valid methods are ${validMethods}! You passed ${httpMethod}`);
    }
};
const pickActionAndResourceMapping = (defs) => {
    return flatMap_1.default(Object.keys(defs), resource => ({
        actions: defs[resource],
        resource
    }));
};
const pickHttpMethodFromAction = (action) => Object.keys(action)[0];
const pickExpressHandlersFromAction = (action) => Object.values(action)[0];
const defIndex = (app, resource, handlers) => {
    const path = `/${resource}`;
    app.get(path, handlers);
    app.locals.expressRestfulRoutes[`${resource}IndexPath`] = () => path;
};
const defShow = (app, resource, handlers) => {
    app.get(`/${resource}/:param`, handlers);
    app.locals.expressRestfulRoutes[`${resource}ShowPath`] = (param) => `/${resource}/${param}`;
};
const defNew = (app, resource, handlers) => {
    const path = `/${resource}/new`;
    app.get(path, handlers);
    app.locals.expressRestfulRoutes[`${resource}NewPath`] = (param) => `/${resource}/${param}`;
};
const defEdit = (app, resource, handlers) => {
    app.get(`/${resource}/:param/edit`, handlers);
    app.locals.expressRestfulRoutes[`${resource}EditPath`] = (param) => `/${resource}/${param}/edit`;
};
const defCreate = (app, resource, handlers) => {
    const path = `/${resource}`;
    app.post(path, handlers);
    app.locals.expressRestfulRoutes[`${resource}CreatePath`] = () => path;
};
const defUpdate = (app, resource, handlers) => {
    app.patch(`/${resource}/:param`, handlers);
    app.locals.expressRestfulRoutes[`${resource}UpdatePath`] = (param) => `/${resource}/${param}`;
};
const defDestroy = (app, resource, handlers) => {
    app.delete(`/${resource}/:param`, handlers);
    app.locals.expressRestfulRoutes[`${resource}DestroyPath`] = (param) => `/${resource}/${param}`;
};
const registerRoute = (app, resource, method, handlers) => {
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
exports.defRoutes = (defs) => (req, res, next) => {
    const app = req.app;
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
