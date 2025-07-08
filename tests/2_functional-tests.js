const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);
const assert = chai.assert;

suite("Functional Tests", () => {
  test("Valid input: 10L", (done) => {
    chai.request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        done();
      });
  });

  test("Invalid unit: 32g", (done) => {
    chai.request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.body.error, "invalid unit");
        done();
      });
  });

  test("Invalid number: 3/7.2/4kg", (done) => {
    chai.request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.body.error, "invalid number");
        done();
      });
  });

  test("Invalid number and unit: 3/7.2/4kilomegagram", (done) => {
    chai.request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.body.error, "invalid number and unit");
        done();
      });
  });

  test("No number: kg", (done) => {
    chai.request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        done();
      });
  });
});
