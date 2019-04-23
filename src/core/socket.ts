import App from '../app';

export default class Socket {
    private static socketIns;
    protected static io() {
        return App.getSocket();
    }
    protected static socket() {
        return this.socketIns;
    }
    public static setSocket(socket) {
        this.socketIns = socket;
    }
}