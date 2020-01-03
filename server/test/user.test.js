const request = require("supertest");
//const request = require("request-promise-native");
const App = require("../server");
//const { Routes } = require("../../constants/constants");
var {
    TestRoutes,
    LoginValidUser,
    TestNames,
    ValidUser,
    NotValidUser,
    MistakenlyWrittenValidUser
} = require("../../constants/TestConstants");
var expect = require('chai').expect;
const randomizer = Math.random();


//NOTE specs with no expectations within just pass.

describe('Registeration Tests', () => {

    //SECTION Fine Registeration
    it(TestNames.Regiseration_Case1, (done) => {
        request(App)
            .post(TestRoutes.signup)
            .send(ValidUser)
            .end(function(err, response) {
                if (err) {
                    return err;
                }

                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    //SECTION Bad Registeration
    it(TestNames.Regiseration_Case2, function(done) {
        request(App)
            .post(TestRoutes.signup).send({ NotValidUser })
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(422);
                done();
            });
    });
});

describe("Login Tests", () => {

    //SECTION Fine login
    it(TestNames.Login_Case1, function(done) {
        request(App).post(TestRoutes.login)
            .send({ LoginValidUser })
            //.set("Accept", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                //console.log(response.body);
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
    //SECTION login with not valid user 
    it(TestNames.Login_Case2, function(done) {
        request(App)
            .post(TestRoutes.login)
            .send({ NotValidUser })
            .set("Accept", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                //console.log("Response Body:", response);
                expect(response.statusCode).to.equal(422);
                done();
            });
    });

    //SECTION login with mistaken credentials 
    it(TestNames.Login_Case3, function(done) {
        request(App).post(TestRoutes.login)
            .send({ MistakenlyWrittenValidUser })
            .set("Accept", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(422);
                done();
            });
    });
});