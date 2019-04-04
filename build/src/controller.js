"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
class Controller {
    static init() {
        this.eachController();
        app_1.default.getIns().server.route(this.route);
    }
    static eachController() {
        const handlerFunc = (request, h) => {
            return 'Hello world';
        };
        const route = {
            path: '/',
            method: 'GET',
            handler: handlerFunc
        };
        this.route.push(route);
    }
}
Controller.route = [];
exports.default = Controller;
//# sourceMappingURL=controller.js.map