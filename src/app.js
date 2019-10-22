"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var http_1 = require("http");
var Express = /** @class */ (function () {
    function Express() {
        var _this = this;
        this.routes = {
            'GET': [],
            'POST': [],
            'DELETE': [],
            'PUT': []
        };
        this.server = http_1.createServer(function (req, res) {
            //const {method, url} = req
            var response = _this.handleResponse(res);
            // step 1 : Recupérer la méthode
            var method = req.method;
            // step 2 : Récupérer la route
            var url = req.url;
            // step 3 : Appeler la bonne méthode http
            var route = _this.routes[method].find(function (item) { return item.url === url; });
            if (route !== undefined) {
                route.callback(req, response);
            }
        });
    }
    Express.prototype.listen = function (port, callback) {
        this.server.listen(port, callback);
    };
    Express.prototype.get = function (url, callback) {
        this.routes.GET.push({ url: url, callback: callback });
    };
    Express.prototype.post = function (url, callback) {
        this.routes.POST.push({ url: url, callback: callback });
    };
    Express.prototype["delete"] = function (url, callback) {
        this.routes.DELETE.push({ url: url, callback: callback });
    };
    Express.prototype.put = function (url, callback) {
        this.routes.PUT.push({ url: url, callback: callback });
    };
    Express.prototype.handleResponse = function (res) {
        var json = function (item) {
            res.write(JSON.stringify(item));
            res.end();
        };
        return __assign({ json: json }, res);
        //return Object.assign({}, {json}, res)  Attention à l'ordre
    };
    Express.prototype.render = function (fileName, callback) {
    };
    return Express;
}());
function default_1() {
    return new Express();
}
exports["default"] = default_1;
