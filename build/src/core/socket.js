"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class Socket {
    static io() {
        return app_1.default.getSocket();
    }
    static socket() {
        return this.socketIns;
    }
    static setSocket(socket) {
        this.socketIns = socket;
    }
}
exports.default = Socket;
//# sourceMappingURL=socket.js.map