import * as Config from "../config";
import * as http from "http";

export default class Request {

  private reqList = {};
  private responseList = {};

  public getOption(option: any) {
    let lastOption = Config.commonOptions;

    lastOption['path'] = option['path'];
    lastOption['method'] = option['method'];

    if (lastOption['method'] === 'get' && option.hasOwnProperty('params')) {
      this.methodGetParams(lastOption, option.params);
    }

    return lastOption;
  }

  private methodGetParams(option, params) {
    option['path'] += '?';
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
    path = path.substring(1);
    option['path'] = option['path'] + path;
  }

  public async request() {
    let option = this.getOption(Config.apiOptions[1]);
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

      req.end();
    });
  }

  public async start() {
    for (let key in Config.apiOptions) {
      if (Config.apiOptions.hasOwnProperty(key)) {
        this.reqList[key] = this.getOption(Config.apiOptions[key]);
        this.responseList[key] = await this.request();
      }
    }
    console.log(this.reqList);
    console.log(this.responseList);
  }
}