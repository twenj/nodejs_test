import App from './app';
import {Fs} from "./lib/util";

export default class Socket {
    public static init() {
        this.eachSocket();
    }

    private static eachSocket() {
        let appIns = App.getIns();
        let io = App.getSocket();

        let socketDir = appIns.appDir + '/socket';
        let socketList = Fs.readDir(socketDir);

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