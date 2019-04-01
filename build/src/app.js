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
const route_1 = require("./route");
class App {
    static init() {
        this.server = new Hapi.Server({
            port: this.defaultOption.port,
            host: this.defaultOption.host
        });
    }
    static start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.init();
            route_1.default.init(this.server);
            yield this.server.start();
            console.log(`Server running at: ${this.server.info.uri}`);
            this.exit();
        });
    }
    static exit() {
        process.on('unhandledRejection', (err) => {
            console.error(err);
            process.exit(1);
        });
    }
}
App.defaultOption = {
    host: 'localhost',
    port: 4170
};
exports.default = App;
//# sourceMappingURL=app.js.map