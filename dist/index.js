"use strict";
/*!
 * Express Restful Routes v0.0.1
 *
 * Released under the MIT license
 *
 * AtaruOhto
 * http://opensource.org/licenses/MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flatMap_1 = __importDefault(require("lodash/flatMap"));
const sortBy_1 = __importDefault(require("lodash/sortBy"));
const defActions_1 = require("./helpers/defActions");
const defHelpers_1 = require("./helpers/defHelpers");
const Actions_1 = require("./helpers/Actions");
const validateMethod = (httpMethod) => {
    if (Actions_1.validActions.indexOf(httpMethod) === -1) {
        throw new Error(`Invalid HTTP Method was Passed valid methods are ${Actions_1.validActions}! You passed ${httpMethod}`);
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
const registerRoute = (app, resource, method, handlers, helperObject) => {
    switch (method) {
        case Actions_1.INDEX:
        case Actions_1.I:
            defActions_1.defIndex(app, resource, handlers);
            defHelpers_1.defIndexPathHelper(resource, helperObject);
            break;
        case Actions_1.SHOW:
        case Actions_1.S:
            defActions_1.defShow(app, resource, handlers);
            defHelpers_1.defShowPathHelper(resource, helperObject);
            break;
        case Actions_1.NEW:
        case Actions_1.N:
            defActions_1.defNew(app, resource, handlers);
            defHelpers_1.defNewPathHelper(resource, helperObject);
            break;
        case Actions_1.EDIT:
        case Actions_1.E:
            defActions_1.defEdit(app, resource, handlers);
            defHelpers_1.defEditPathHelper(resource, helperObject);
            break;
        case Actions_1.CREATE:
        case Actions_1.C:
            defActions_1.defCreate(app, resource, handlers);
            defHelpers_1.defCreatePathHelper(resource, helperObject);
            break;
        case Actions_1.UPDATE:
        case Actions_1.U:
            defActions_1.defUpdate(app, resource, handlers);
            defHelpers_1.defUpdatePathHelper(resource, helperObject);
            break;
        case Actions_1.DESTROY:
        case Actions_1.D:
            defActions_1.defDestroy(app, resource, handlers);
            defHelpers_1.defDestroyPathHelper(resource, helperObject);
            break;
    }
};
exports.defRoutes = (defs, helperName) => (req, res, next) => {
    try {
        const app = req.app;
        const helper = helperName || "expressRestfulRoutes";
        const helperObject = (res.locals[helper] = res.locals[helper] || {});
        const mappings = pickActionAndResourceMapping(defs);
        mappings.forEach(mapping => {
            const resource = mapping.resource;
            /* Reorder Actions due to regular expression match of express routing */
            const sortedActions = sortBy_1.default(mapping.actions, action => Actions_1.ACTION_SORT_KEYS.indexOf(pickHttpMethodFromAction(action)));
            sortedActions.forEach(action => {
                const method = pickHttpMethodFromAction(action);
                validateMethod(method);
                const handlers = pickExpressHandlersFromAction(action);
                registerRoute(app, resource, method, handlers, helperObject);
            });
        });
        next();
    }
    catch (e) {
        throw new Error(e);
    }
};
