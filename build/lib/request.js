"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config = require("../config");
const http = require("http");
class Request {
    getOption(option) {
        let lastOption = Config.commonOptions;
        lastOption['path'] = option['path'];
        lastOption['method'] = option['method'];
        if (lastOption['method'] === 'get' && option.hasOwnProperty('params')) {
            this.methodGetParams(lastOption, option.params);
        }
        return lastOption;
    }
    methodGetParams(option, params) {
        option['path'] += '?';
        let path = '';
        for (let item in params) {
            if (params.hasOwnProperty(item)) {
                path += '&' + item + '=' + params[item];
            }
        }
        path = path.substring(1);
        option['path'] = option['path'] + path;
    }
    start() {
        let option = this.getOption(Config.apiOptions[0]);
        const req = http.request(option, (res) => {
            if (res.statusCode !== 200) {
                console.error(`STATUS: ${res.statusCode}`);
                process.exit(1);
            }
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });
        req.end();
    }
}
exports.default = Request;
//# sourceMappingURL=request.js.map