const request = require("supertest");
const App = require("../server");
//const { Routes } = require("../../constants/constants");
var { TestRoutes, TestNames, ValidUser, NotValidUser } = require("../../constants/TestConstants")
const randomizer = Math.random();

//SECTION Fine Registeration
test(TestNames.Regiseration_Case1,
    function() {
        request(App).post(TestRoutes.signup)
            .send({
                NotValidUser

            }).expect(422);
    });

//SECTION Bad Registeration
test(TestNames.Regiseration_Case2, function() {

    request(App).post(TestRoutes.signup).send({
        ValidUser
    }).expect(201);
});

//SECTION login
test(TestNames.Login_Case1, function() {

    request(App).post(TestRoutes.login).send({
        ValidUser
    }).expect(201);
});

//SECTION login with mistaken password or 
test(TestNames.Login_Case2, function() {

    request(App).post(TestRoutes.login).send({
        NotValidUser
    }).expect(422);
});