"use strict";

const express = require("express");
const app = express();
const assert = require("assert");
const request = require("supertest");
const expressRestfulRoutes = require("../dist/index");

const indexHandler = (req, res, next) => {
  res.send("index");
};

const showHandler = (req, res, next) => {
  res.send("show");
};

const newHandler = (req, res, next) => {
  res.send("new");
};

const editHandler = (req, res, next) => {
  res.send("edit");
};

const createHandler = (req, res, next) => {
  res.send("create");
};

const updateHandler = (req, res, next) => {
  res.send("update");
};

const destroyHandler = (req, res, next) => {
  res.send("destroy");
};

const routes = {
  users: [
    { index: [indexHandler] },
    { show: [showHandler] },
    { new: [newHandler] },
    { create: createHandler },
    { edit: editHandler },
    { update: updateHandler },
    { destroy: destroyHandler }
  ]
};

app.use(expressRestfulRoutes.defRoutes(routes, "myRoutes"));

describe(`Positive Specs`, () => {
  describe("Defined Routes are accessible", () => {
    it("Users Index", done => {
      request(app)
        .get("/users")
        .expect(res => {
          assert.equal(res.text, "index");
          assert.equal(res.statusCode, 200);
        })
        .expect(200, done);
    });

    it("Users Show", done => {
      request(app)
        .get("/users/555")
        .expect(res => {
          assert.equal(res.text, "show");
          assert.equal(res.statusCode, 200);
        })
        .expect(200, done);
    });

    it("Users New", done => {
      request(app)
        .get("/users/new")
        .expect(res => {
          assert.equal(res.text, "new");
          assert.equal(res.statusCode, 200);
        })
        .expect(200, done);
    });

    it("Users Create", done => {
      request(app)
        .post("/users/")
        .expect(res => {
          assert.equal(res.text, "create");
          assert.equal(res.statusCode, 200);
        })
        .expect(200, done);
    });

    it("Users Edit", done => {
      request(app)
        .get("/users/444/edit")
        .expect(res => {
          assert.equal(res.text, "edit");
          assert.equal(res.statusCode, 200);
        })
        .expect(200, done);
    });

    it("Users Update", done => {
      request(app)
        .patch("/users/2")
        .expect(res => {
          assert.equal(res.text, "update");
          assert.equal(res.statusCode, 200);
        })
        .expect(200, done);
    });

    it("Users Destroy", done => {
      request(app)
        .delete("/users/2")
        .expect(res => {
          assert.equal(res.text, "destroy");
          assert.equal(res.statusCode, 200);
        })
        .expect(200, done);
    });
  });
});
