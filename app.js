"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_1 = __importDefault(require("http"));
var port = parseInt(process.argv[2]) | 8080;
function Listener() {
    var server = http_1["default"].createServer(function (req, res) {
        res.writeHead(200);
        res.end('Hello world!');
    });
    server.listen(port, function () {
        console.log("Server listening at " + port);
    });
    return server;
}
var App = /** @class */ (function () {
    function App() {
        this.server = Listener();
    }
    App.prototype.get = function (point) {
        if (point == '/') {
            console.log('Plop');
        }
    };
    return App;
}());
exports["default"] = App;
var app = new App();
app.get('/');
