"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var app = app_1["default"]();
var port = 4242;
// Routes http
app.get('/', function (req, res) {
    console.log('get');
});
app.get('/api', function (req, res) {
    console.log('get API');
    res.json({ hello: 'From API' });
});
app.post('/sign-up', function (req, res) {
    console.log('post sign-up');
});
app.put('/update-login', function (req, res) {
    console.log('update login');
});
app["delete"]('/delete-login', function (req, res) {
    console.log('delete login');
});
//Render
app.render('home', function (err, html) {
});
app.listen(port, function () {
    console.log("Server is listenning on " + port);
});
