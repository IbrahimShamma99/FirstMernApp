const App = require("./server");

var server = App.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + server.address().port);
});