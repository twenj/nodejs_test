"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("../../src/core/socket");
class Chat extends socket_1.default {
    static handler() {
        let parent = this;
        parent.io().emit('chat message', '欢迎进入');
        parent.socket().on('chat message', function (msg) {
            parent.io().emit('chat message', msg);
        });
    }
}
exports.default = Chat;
//# sourceMappingURL=chat.js.map