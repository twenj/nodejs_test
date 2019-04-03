"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    static init(server, appDir) {
        const controllerDir = appDir + '/controllers';
        console.log(controllerDir);
        let Controller = require(controllerDir + '/index/index');
        Controller = new Controller.default;
        const handlerFunc = (request, h) => {
            let res = Controller.index();
            return res;
        };
        server.route([{
                method: 'GET',
                path: '/',
                handler: handlerFunc
            }]);
    }
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map