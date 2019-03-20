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
const Config = require("../config");
const http = require("http");
class Request {
    constructor() {
        this.reqList = {};
        this.responseList = {};
    }
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
        let path = '';
        let commonGetParams = Config.commonGetParams;
        for (let item in commonGetParams) {
            if (commonGetParams.hasOwnProperty(item)) {
                path += '&' + item + '=' + escape(commonGetParams[item]);
            }
        }
        for (let item in params) {
            if (params.hasOwnProperty(item)) {
                path += '&' + item + '=' + escape(params[item]);
            }
        }
        if (option['path'].indexOf('?') === -1) {
            option['path'] += '?';
            path = path.substring(1);
        }
        option['path'] = option['path'] + path;
    }
    request() {
        return __awaiter(this, void 0, void 0, function* () {
            let option = this.getOption(Config.apiOptions[1]);
            return new Promise((resolve, reject) => {
                let data;
                let req = http.request(option, (res) => {
                    if (res.statusCode !== 200) {
                        reject({ status: 0, msg: `STATUS: ${res.statusCode}` });
                    }
                    res.setEncoding('utf8');
                    res.on('data', (chunk) => {
                        if (typeof data === 'undefined') {
                            data = chunk;
                        }
                        else {
                            data += chunk;
                        }
                    });
                    res.on('end', () => {
                        resolve({ status: 1, data: data });
                    });
                });
                req.on('error', (e) => {
                    reject({ status: 0, msg: `problem with request: ${e.message}` });
                });
                req.end();
            });
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let key in Config.apiOptions) {
                if (Config.apiOptions.hasOwnProperty(key)) {
                    this.reqList[key] = this.getOption(Config.apiOptions[key]);
                    this.responseList[key] = yield this.request();
                }
            }
            console.log(this.reqList);
            console.log(this.responseList);
        });
    }
}
exports.default = Request;
//# sourceMappingURL=request.js.map