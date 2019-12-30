const Routes = {
    signup: '/users',
    login: '/users/login',
    addProduct: '/products',
    product: '/products/:product',
    user: '/users/user'
};

const params = {
    product: "product",
    ProductOwner: 'ProductOwner'
};
module.exports = { Routes, params };