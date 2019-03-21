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
const http = require("http");
const querystring = require("querystring");
const Config = require("../config");
const util_1 = require("./util");
class Request {
    constructor() {
        this.reqList = {};
        this.responseList = {};
    }
    getOption(option) {
        let lastOption = util_1.ObjectTool.deepCopy(Config.commonOptions);
        lastOption['path'] = option['path'];
        lastOption['method'] = option['method'];
        this.methodGetParams(lastOption, option.params);
        return lastOption;
    }
    methodGetParams(option, params = undefined) {
        let path = '';
        let commonGetParams = Config.commonGetParams;
        for (let item in commonGetParams) {
            if (commonGetParams.hasOwnProperty(item)) {
                path += '&' + item + '=' + escape(commonGetParams[item]);
            }
        }
        if (option['method'] === 'get' && typeof params !== 'undefined') {
            for (let item in params) {
                if (params.hasOwnProperty(item)) {
                    path += '&' + item + '=' + escape(params[item]);
                }
            }
        }
        if (option['path'].indexOf('?') === -1) {
            option['path'] += '?';
            path = path.substring(1);
        }
        option['path'] = option['path'] + path;
    }
    request(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Config.apiOptions.hasOwnProperty(key)) {
                return false;
            }
            let option = this.getOption(Config.apiOptions[key]);
            let postParams;
            if (option['method'] === 'post') {
                postParams = querystring.stringify(Config.apiOptions[key].params);
                option['headers']['Content-Length'] = Buffer.byteLength(postParams);
            }
            // let option2 = {
            //   host: 'api.backend.com',
            //   port: '80',
            //   method: 'post',
            //   path: '/index.php?p=console&v=1&c=content&do=newResource&uid=20&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjIwLCJyZWFsX25hbWUiOiJcdTZkNGJcdThiZDUiLCJzYWx0IjoiZWJiNWFjIiwicHdkIjoiNzhCNEZDNzU0MDJDMDJENjcwNzEwOEZDNDIwODVDODQiLCJjcmVhdGVfdGltZSI6MTUzMzU0NjU0MywiaWF0IjoxNTUzMTMxMTMwLCJleHAiOjE1NTMxMzgzMzB9.v92RluCUJuwh_XG69cb94wgIlfOgo6svr4Ea7RETvfQ',
            //   headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     'Content-Length': 9,
            //   }
            // };
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
                if (option['method'] === "post") {
                    req.write(postParams);
                }
                req.end();
            });
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let key in Config.apiOptions) {
                if (Config.apiOptions.hasOwnProperty(key)) {
                    this.reqList[key] = this.getOption(Config.apiOptions[key]);
                    this.responseList[key] = yield this.request(key);
                }
            }
            // console.log(this.reqList);
            console.log(this.responseList);
        });
    }
}
exports.default = Request;
//# sourceMappingURL=request.js.map