const request = require("supertest");
//const request = require("request-promise-native");
const App = require("../server");
//const { Routes } = require("../../constants/constants");
var {
    TestRoutes,
    TestNames,
    ValidUser,
    NotValidUser,
    MistakenlyWrittenValidUser
} = require("../../constants/TestConstants");
var expect = require('chai').expect;
const randomizer = Math.random();

//SECTION Fine Registeration
// describe('user thing', () => {
//     it("test1", () => {
//         before(function(done) {
//             request(App)
//                 .post(TestRoutes.signup)
//                 .send(NotValidUser)
//                 .end(function(err, response) {
//                     expect(response.statusCode).to.equal(200);
//                     done();
//                 });
//         });
//     });
// });
// //SECTION Bad Registeration
// test(TestNames.Regiseration_Case2, function() {
//     request(App).post(TestRoutes.signup).send({
//         ValidUser
//     }).expect(422);
// });

// //SECTION login
// test(TestNames.Login_Case1, function() {

//     request(App).post(TestRoutes.login).send({
//         ValidUser
//     }).expect(201);
// });

// //SECTION login with not valid user 
// test(TestNames.Login_Case2, function() {
//     request(App).post(TestRoutes.login).send({
//         NotValidUser
//     }).expect(422);
// });

// //SECTION login with mistaken credentials 
// test(TestNames.Login_Case3, function() {
//     request(App).post(TestRoutes.login)
//         .expect(422)
//         .send({
//             MistakenlyWrittenValidUser
//         });
// });