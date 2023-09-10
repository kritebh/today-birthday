import mongoose from "mongoose";

//Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import server from "./server.js";
let should = chai.should();
chai.use(chaiHttp);

describe("/GET birthdays", () => {
    //test for wrong day
    it("it should not GET the birthdays", (done) => {
        chai.request(server)
            .get("/api/v1/birthdays?day=43&month=1")
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error');
                console.log(res.body);
                done();
            });
    });

    //test for wrong month
    it("it should not GET the birthdays", (done) => {
        chai.request(server)
            .get("/api/v1/birthdays?day=4&month=32")
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error');
                console.log(res.body);
                done();
            });
    });

    //get birthdays for 1 january
    it("it should GET the birthdays", (done) => {
        chai.request(server)
            .get("/api/v1/birthdays?day=1&month=1")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                console.log(res.body.length);
                done();
            });
    });

    //caching 
    it("it should GET the birthdays", (done) => {
        chai.request(server)
            .get("/api/v1/birthdays?day=1&month=1")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                console.log(res.body.length);
                done();
            });
    });
});
