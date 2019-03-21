import * as http from "http";
import * as querystring from "querystring";
import * as Config from "../config";
import { ObjectTool } from "./util";

export default class Request {

  private reqList = {};
  private responseList = {};

  public getOption(option: any) {
    let lastOption = ObjectTool.deepCopy(Config.commonOptions);

    lastOption['path'] = option['path'];
    lastOption['method'] = option['method'];

    this.methodGetParams(lastOption, option.params);

    return lastOption;
  }

  private methodGetParams(option, params = undefined) {
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

  public async request(key) {
    if (!Config.apiOptions.hasOwnProperty(key)) {
      return false;
    }
    let option = this.getOption(Config.apiOptions[key]);
    let postParams;

    if (option['method'] === 'post') {
      postParams = querystring.stringify(Config.apiOptions[key].params);
      option['headers']['Content-Length'] = Buffer.byteLength(postParams);
    }

    return new Promise((resolve, reject) => {
      let data;
      let req = http.request(option, (res) => {
        if (res.statusCode !== 200) {
          reject({status: 0, msg: `STATUS: ${res.statusCode}`});
        }
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          if (typeof data === 'undefined') {
            data = chunk;
          } else {
            data += chunk;
          }
        });
        res.on('end', () => {
          resolve({status: 1, data: data});
        });
      });

      req.on('error', (e) => {
        reject({status: 0, msg: `problem with request: ${e.message}`});
      });

      if (option['method'] === "post") {
        req.write(postParams);
      }

      req.end();
    });
  }

  public async start() {
    for (let key in Config.apiOptions) {
      if (Config.apiOptions.hasOwnProperty(key)) {
        this.reqList[key] = this.getOption(Config.apiOptions[key]);
        this.responseList[key] = await this.request(key);
      }
    }
    // console.log(this.reqList);
    console.log(this.responseList);
  }
}