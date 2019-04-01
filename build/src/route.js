"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    static init(server) {
        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'Hello world';
            }
        });
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map