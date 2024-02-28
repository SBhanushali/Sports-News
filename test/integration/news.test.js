const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

const News = require("../../src/controllers/news");

const { app } = require("../../index");

describe("GET /news/match/:matchId", function () {
  let getNewsByMatchIdStub;

  before(function () {
    getNewsByMatchIdStub = sinon.stub(News, "getNewsByMatchId");
  });

  after(function () {
    getNewsByMatchIdStub.restore();
  });

  it("responds with JSON", function (done) {
    getNewsByMatchIdStub.withArgs(123).resolves([
      { id: 1, title: "News 1" },
      { id: 2, title: "News 2" },
    ]);

    request(app)
      .get("/news/match/123")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.deep.equal([
          { id: 1, title: "News 1" },
          { id: 2, title: "News 2" },
        ]);
        done();
      });
  });

  it("handles errors when match id is not sent", function (done) {
    getNewsByMatchIdStub.rejects(new Error("Test error"));

    request(app)
      .get("/news/match/abc")
      .set("Accept", "application/json")
      .expect(500, done);
  });
});

describe("GET /news/tour/:tourId", function () {
  let getNewsByTourIdStub;

  before(function () {
    getNewsByTourIdStub = sinon.stub(News, "getNewsByTourId");
  });

  after(function () {
    getNewsByTourIdStub.restore();
  });

  it("responds with JSON", function (done) {
    getNewsByTourIdStub.withArgs(123).resolves([
      { id: 1, title: "News 1" },
      { id: 2, title: "News 2" },
    ]);

    request(app)
      .get("/news/tour/123")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.deep.equal([
          { id: 1, title: "News 1" },
          { id: 2, title: "News 2" },
        ]);
        done();
      });
  });

  it("handles errors when tour id is not sent", function (done) {
    getNewsByTourIdStub.rejects(new Error("Test error"));

    request(app)
      .get("/news/Tour/abc")
      .set("Accept", "application/json")
      .expect(500, done);
  });

  describe("GET /news/sport/:sportId", function () {
    let getNewsBySportIdStub;

    before(function () {
      getNewsBySportIdStub = sinon.stub(News, "getNewsBySportId");
    });

    after(function () {
      getNewsBySportIdStub.restore();
    });

    it("responds with JSON", function (done) {
      getNewsBySportIdStub.withArgs(123).resolves([
        { id: 1, title: "News 1" },
        { id: 2, title: "News 2" },
      ]);

      request(app)
        .get("/news/Sport/123")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.deep.equal([
            { id: 1, title: "News 1" },
            { id: 2, title: "News 2" },
          ]);
          done();
        });
    });

    it("handles errors when sport id is not sent", function (done) {
      getNewsBySportIdStub.rejects(new Error("Test error"));

      request(app)
        .get("/news/sport/abc")
        .set("Accept", "application/json")
        .expect(500, done);
    });
  });
});
