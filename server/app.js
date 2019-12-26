const { App } = require('./server');
var port = process.env.API_PORT || 3000;

App.listen(port, function() {
    console.log(`api running on port ${port}`);
});