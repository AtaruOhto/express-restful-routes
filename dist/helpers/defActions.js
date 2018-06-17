"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defIndex = (app, resource, handlers) => {
    app.get(`/${resource}`, handlers);
};
exports.defShow = (app, resource, handlers) => {
    app.get(`/${resource}/:param`, handlers);
};
exports.defNew = (app, resource, handlers) => {
    app.get(`/${resource}/new`, handlers);
};
exports.defEdit = (app, resource, handlers) => {
    app.get(`/${resource}/:param/edit`, handlers);
};
exports.defCreate = (app, resource, handlers) => {
    app.post(`/${resource}`, handlers);
};
exports.defUpdate = (app, resource, handlers) => {
    app.patch(`/${resource}/:param`, handlers);
};
exports.defDestroy = (app, resource, handlers) => {
    app.delete(`/${resource}/:param`, handlers);
};
