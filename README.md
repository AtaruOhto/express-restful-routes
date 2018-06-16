# Express RESTful Routes

Helper library to generate Rails like RESTful routing for Express.

Quoted from <cite>http://guides.rubyonrails.org/routing.html</cite>

<table>
  <thead>
    <tr>
      <th>HTTP Verb</th>
      <th>Path</th>
      <th>Controller#Action</th>
      <th>Used for</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/photos</td>
      <td>photos#index</td>
      <td>display a list of all photos</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/photos/new</td>
      <td>photos#new</td>
      <td>return an HTML form for creating a new photo</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/photos</td>
      <td>photos#create</td>
      <td>create a new photo</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/photos/:id</td>
      <td>photos#show</td>
      <td>display a specific photo</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/photos/:id/edit</td>
      <td>photos#edit</td>
      <td>return an HTML form for editing a photo</td>
    </tr>
    <tr>
      <td>PATCH/PUT</td>
      <td>/photos/:id</td>
      <td>photos#update</td>
      <td>update a specific photo</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/photos/:id</td>
      <td>photos#destroy</td>
      <td>delete a specific photo</td>
    </tr>
  </tbody>
</table>

## Getting Started

### Install

```
yarn add express-restful-routes
```

### Define RESTFul Routes

```
const express = require("express");
const app = express();
const expressRestfulRoutes = require('express-restful-routes')

/* Middleware1 */
const middleware1 = (req, res, next) => {
  console.log("middleware1");
  next();
};

/* Middleware2 */
const middleware2 = (req, res, next) => {
  console.log("middleware2");
  next();
};

const handler = (req, res, next) => {
  console.log(req.app.locals.expressRestfulRoutes);
  /* Path helper functions will be available via app.locals.expressRestfulRoutes */

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
```

By generating routes with defineRoutes(), path helper functions will be available in app.locals.expressRestfulRoutes.
For instance:

```
const routes = {
  users: [
     { index: [middleware1, middleware2, handler] },
     /* usersIndexPath() will be added into the app.locals.expressRestfulRoutes. */

     { show: [middleware1, middleware2, handler] },
     /* usersShowPath(param: string) will be added into the app.locals.expressRestfulRoutes. */

     { new: middleware2, handler },
     /* usersNewPath() will be added into the app.locals.expressRestfulRoutes. */

     { create: handler },
     /* usersCreatePath() will be added into the app.locals.expressRestfulRoutes. */

     { edit: handler },
     /* usersEditPath(param: string) will be added into the app.locals.expressRestfulRoutes. */

     { update: handler },
     /* usersUpdatePath(param: string) will be added into the app.locals.expressRestfulRoutes. */

     { destroy: handler }
     /* usersDestroyPath(param: string) will be added into the app.locals.expressRestfulRoutes. */
  ]
}

...

app.use(expressRestfulRoutes.defRoutes(routes));

/*
the code above will add the following path helper functions to app.locals.expressRestfulRoutes.
These helpers can be called via app.locals.expressRestfulRoutes.

* usersIndexPath() => '/users'      => '/users'
* usersShowPath(param: string)      => '/users/:param'
* usersNewPath() => '/users'        => '/users/new'
* usersCreatePath() => '/users'     => '/users'
* usersEditPath(param: string)      => '/users/:param/edit'
* usersUpdatePath(param: string)    => '/users/:param'
* usersDestroyPath(param: string)   => '/users/:param'
*/
```
