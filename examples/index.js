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

const handler = (req, res, next) => {
  console.log(req.app.locals.expressRestfulRoutes);
  /*
  { 
    usersIndexPath: [Function],
    usersShowPath: [Function],
    usersNewPath: [Function],
    usersCreatePath: [Function],
    usersEditPath: [Function],
    usersUpdatePath: [Function],
    usersDestroyPath: [Function],
    booksIndexPath: [Function],
    booksNewPath: [Function],
    booksCreatePath: [Function],
    booksEditPath: [Function],
    commentsIndexPath: [Function],
    commentsShowPath: [Function],
    commentsNewPath: [Function],
    commentsEditPath: [Function],
    commentsCreatePath: [Function],
    commentsUpdatePath: [Function],
    commentsDestroyPath: [Function] 
  }
  */

  if (req.params) {
    console.log(req.params);
  }

  res.send("hello");
};

const routes = {
  users: [
    { index: [middleware1, middleware2, handler] },
    /* will define app.get('/users', [middleware1, middleware2, handler]) */

    { show: [middleware1, middleware2, handler] },
    /* will define app.get('/users/:id', [middleware1, middleware2, handler])  */

    { new: [middleware2, handler] },
    /* will define app.get('/users/new', [middleware2, handler]) */

    { create: handler },
    /* will define app.post('/users', handler) */

    { edit: handler },
    /* will define app.get('/users/:id/edit', handler) */

    { update: handler },
    /* will define app.patch('/users/:id', handler) */

    { destroy: handler }
    /* will define app.delete('/users/:id', handler) */
  ],
  /* Only Specified Routes */
  books: [
    { index: handler },
    { new: handler },
    { create: handler },
    { edit: handler }
  ],
  /* Shorthand */
  comments: [
    { i: handler },
    { s: handler },
    { n: handler },
    { e: handler },
    { c: handler },
    { u: handler },
    { d: handler }
  ]
};

app.use(expressRestfulRoutes.defRoutes(routes));

app.listen(5555, () => {
  console.log("server running... port 5555");
});
