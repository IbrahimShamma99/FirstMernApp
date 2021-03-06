const TestNames = {
    Regiseration_Case1: "Regiseration_Case1",
    Regiseration_Case2: "Regiseration_Case2",
    Regiseration_Case3: "Regiseration_Case3",
    Regiseration_Case4: "Regiseration_Case4",
    Login_Case1: "Login_Case1",
    Login_Case2: "Login_Case2",
    Login_Case3: "Login_Case3",
    Login_Case4: "Login_Case4",
};

const ValidUser = {
    user: {
        username: "Ibrahim",
        email: "i.abushammah@gmail.com",
        password: "Password$1234",
        age: 21,
        contacts: {
            PhoneNumber: "+962799547633",
            LinkedInAccount: "",
            FacebookAccount: "",
            InstegramAccount: ""
        }
    }
};
const MistakenlyWrittenValidUser = {
    user: {
        username: "Ibrahim",
        email: "i.abushammah@gmail.com",
        password: "Password$12345",
        age: 21,
        contacts: {
            PhoneNumber: "+962799547633",
            LinkedInAccount: "",
            FacebookAccount: "",
            InstegramAccount: ""
        }
    }
};

const NotValidUser = {
    user: {
        email: "mrJaws@gmail",
        password: "Password$1234",
        age: 21
    }
};

const TestRoutes = {
    signup: "/api/users",
    login: "/api/users/login"
};

const LoginValidUser = {
    user: {
        email: "mrJawsPoly@gmail.com",
        password: "Password$1234",
        age: 21
    }

};

module.exports = { TestNames, ValidUser, NotValidUser, TestRoutes };