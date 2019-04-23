import Socket from '../../src/core/socket';

export default class Chat extends Socket {
    public static handler() {
        let parent = this;
        parent.io().emit('chat message', '欢迎进入');
        parent.socket().on('chat message', function (msg) {
            parent.io().emit('chat message', msg);
        });
    }
}