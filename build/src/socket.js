"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const util_1 = require("./lib/util");
class Socket {
    static init() {
        this.eachSocket();
    }
    static eachSocket() {
        let appIns = app_1.default.getIns();
        let io = app_1.default.getSocket();
        let socketDir = appIns.appDir + '/socket';
        let socketList = util_1.Fs.readDir(socketDir);
        socketList.forEach(function (socketPath) {
            let socketClass = require(socketPath).default;
            let pos = socketPath.lastIndexOf('/');
            let name = socketPath.substr(pos + 1);
            io.on('connection', function (socket) {
                console.log('user connected');
                socketClass.setSocket(socket);
                return socketClass['handler'](io, socket);
            });
        });
    }
}
exports.default = Socket;
//# sourceMappingURL=socket.js.map