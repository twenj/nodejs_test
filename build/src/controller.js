"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../src/lib/util");
const app_1 = require("./app");
class Controller {
    static init() {
        this.eachController();
        app_1.default.getIns().server.route(this.route);
    }
    static eachController() {
        let appIns = app_1.default.getIns();
        let controllerDir = appIns.appDir + '/' + appIns.controllerDir;
        let controllerList = util_1.Fs.readDir(controllerDir);
        let controller;
        let routeArr = this.route;
        controllerList.forEach(function (controllerPath) {
            let c = require(controllerPath).default;
            let methods = Object.getOwnPropertyNames(c.prototype);
            controller = new c();
            methods.forEach(function (method) {
                if (method !== 'constructor') {
                    let handlerFunc = (request, h) => {
                        return controller[method]();
                    };
                    let path = '';
                    for (let i = 2; i > 0; i--) {
                        let pos = controllerPath.lastIndexOf('/');
                        let name = controllerPath.substr(pos + 1);
                        controllerPath = controllerPath.substr(0, pos);
                        path += '/' + name;
                    }
                    path += '/' + method;
                    let route = {
                        path: path,
                        method: 'GET',
                        handler: handlerFunc
                    };
                    routeArr.push(route);
                }
            });
        });
    }
}
Controller.route = [];
exports.default = Controller;
//# sourceMappingURL=controller.js.map