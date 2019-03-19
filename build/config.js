"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let commonOptions = {
    host: 'api.backend.com',
    port: '80',
    headers: {
        'Content-Type': 'application/json'
    }
};
exports.commonOptions = commonOptions;
let apiOptions = [
    {
        path: '/index.php',
        method: 'get',
        params: {
            "p": "user",
            "v": 2,
            "c": "expert",
            "do": "allList",
            "order_by": 2,
            "page": 1,
            "pagesize": 100,
            "day": 7,
            "user_id": 2291,
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjIyOTEsIm5pY2tuYW1lIjoidFx1NTkwZlx1ODQ3NXdqIiwiaWF0IjoxNTUyOTAwNjIxLCJleHAiOjE1NTI5MDc4MjF9.JjDf4uHSVJR_BwNfgCdlp_gtcWuY1LN7KVjglfe_Dq4"
        }
    }
];
exports.apiOptions = apiOptions;
//# sourceMappingURL=config.js.map