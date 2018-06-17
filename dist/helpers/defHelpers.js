"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PARAM_MISSING_ERROR = (functionName) => `${functionName} was called with no parameter! ${functionName}() needs to be called with params. call as following: ${functionName}("someParameters") . `;
exports.defIndexPathHelper = (resource, helperObject) => {
    helperObject[`${resource}IndexPath`] = () => `/${resource}`;
};
exports.defShowPathHelper = (resource, helperObject) => {
    helperObject[`${resource}ShowPath`] = (param) => {
        if (param) {
            return `/${resource}/${param}`;
        }
        throw new Error(PARAM_MISSING_ERROR(`${resource}ShowPath`));
    };
};
exports.defNewPathHelper = (resource, helperObject) => {
    helperObject[`${resource}NewPath`] = () => `/${resource}/new`;
};
exports.defEditPathHelper = (resource, helperObject) => {
    helperObject[`${resource}EditPath`] = (param) => {
        if (param) {
            return `/${resource}/${param}/edit`;
        }
        throw new Error(PARAM_MISSING_ERROR(`${resource}EditPath`));
    };
};
exports.defCreatePathHelper = (resource, helperObject) => {
    helperObject[`${resource}CreatePath`] = () => `/${resource}`;
};
exports.defUpdatePathHelper = (resource, helperObject) => {
    helperObject[`${resource}UpdatePath`] = (param) => {
        if (param) {
            return `/${resource}/${param}`;
        }
        throw new Error(PARAM_MISSING_ERROR(`${resource}UpdatePath`));
    };
};
exports.defDestroyPathHelper = (resource, helperObject) => {
    helperObject[`${resource}DestroyPath`] = (param) => {
        if (param) {
            return `/${resource}/${param}`;
        }
        throw new Error(PARAM_MISSING_ERROR(`${resource}DestroyPath`));
    };
};
