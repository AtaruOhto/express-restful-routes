const express = require("express");
const app = express();
const expressRestfulRoutes = require("../dist/");

const middleware1 = (req, res, next) => {
  console.log("middleware1");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("middleware2");
  next();
};

const indexHandler = (req, res, next) => {
  console.log(res.locals.myRoutes.usersIndexPath());
  res.send("index");
};

const showHandler = (req, res, next) => {
  console.log(res.locals.myRoutes.usersShowPath(req.params.param));
  res.send("show");
};

const newHandler = (req, res, next) => {
  console.log(res.locals.myRoutes.usersNewPath());
  res.send("new");
};

const editHandler = (req, res, next) => {
  console.log(res.locals.myRoutes.usersEditPath(req.params.param));
  res.send("edit");
};

const createHandler = (req, res, next) => {
  console.log(res.locals.myRoutes.usersCreatePath());
  res.send("create");
};

const updateHandler = (req, res, next) => {
  console.log(req.params.param);
  console.log(res.locals.myRoutes.usersUpdatePath(req.params.param));
  res.send("update");
};

const destroyHandler = (req, res, next) => {
  console.log(res.locals.myRoutes.usersDestroyPath(req.params.param));
  res.send("destroy");
};

const routes = {
  users: [
    { index: [middleware1, middleware2, indexHandler] },
    /* will define app.get('/users', [middleware1, middleware2, handler]) */

    { show: [middleware1, middleware2, showHandler] },
    /* will define app.get('/users/:id', [middleware1, middleware2, handler])  */

    { new: [middleware2, newHandler] },
    /* will define app.get('/users/new', [middleware2, handler]) */

    { create: createHandler },
    /* will define app.post('/users', handler) */

    { edit: editHandler },
    /* will define app.get('/users/:id/edit', handler) */

    { update: updateHandler },
    /* will define app.patch('/users/:id', handler) */

    { destroy: destroyHandler }
    /* will define app.delete('/users/:id', handler) */
  ]
};

app.use(expressRestfulRoutes.defRoutes(routes, "myRoutes"));

app.listen(5555, () => {
  console.log("server running... port 5555");
});
