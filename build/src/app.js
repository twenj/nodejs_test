"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require("hapi");
const SocketIo = require("socket.io");
const controller_1 = require("./controller");
const socket_1 = require("./socket");
class App {
    constructor() {
        this.appOptions = {
            host: 'localhost',
            port: 4170,
            controllerDir: 'controllers'
        };
    }
    static getIns() {
        return this.ins;
    }
    static getSocket() {
        return this.io;
    }
    static start(options) {
        let app = new App();
        app.appDir = options['appDir'];
        app.controllerDir = app.appOptions.controllerDir;
        app.server = new Hapi.Server({
            port: app.appOptions.port,
            host: app.appOptions.host
        });
        this.ins = app;
        this.io = SocketIo(app.server.listener);
        return app;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            controller_1.default.init();
            socket_1.default.init();
            yield this.server.start();
            console.log(`Server running at: ${this.server.info.uri}`);
            this.exit();
        });
    }
    exit() {
        process.on('unhandledRejection', (err) => {
            console.error(err);
            process.exit(1);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map