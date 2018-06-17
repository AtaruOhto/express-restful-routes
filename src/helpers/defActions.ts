import { Express } from "express";
import { RequestHandlerParams } from "express-serve-static-core";

export const defIndex = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.get(`/${resource}`, handlers);
};

export const defShow = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.get(`/${resource}/:param`, handlers);
};

export const defNew = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.get(`/${resource}/new`, handlers);
};

export const defEdit = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.get(`/${resource}/:param/edit`, handlers);
};

export const defCreate = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.post(`/${resource}`, handlers);
};

export const defUpdate = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.patch(`/${resource}/:param`, handlers);
};

export const defDestroy = (
  app: Express,
  resource: string,
  handlers: RequestHandlerParams
) => {
  app.delete(`/${resource}/:param`, handlers);
};
