import * as Hapi from 'hapi';
import { Fs } from "../src/lib/util";
import App from './app';

export default class Controller {
  private static route: Array<Hapi.ServerRoute> = [];

  public static init() {
    this.eachController();
    App.getIns().server.route(this.route);
  }

  public static eachController() {
    let appIns = App.getIns();

    let controllerDir = appIns.appDir + '/' + appIns.controllerDir;
    let controllerList = Fs.readDir(controllerDir);

    let routeArr = this.route;

    controllerList.forEach(function (controllerPath) {

      let c = require(controllerPath).default;
      let methods = Object.getOwnPropertyNames(c.prototype);

      let controller = new c();

      methods.forEach(function (method) {

        if (method !== 'constructor') {

          let handlerFunc = (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            return controller[method]();
          };

          let path = '';
          for (let i = 2; i > 0; i--) {
            let pos = controllerPath.lastIndexOf('/');
            let name = controllerPath.substr(pos + 1);
            controllerPath = controllerPath.substr(0, pos);
            path += '/' + name;
          }
          path += '/' + method;

          let route = {
            path: path,
            method: 'GET',
            handler: handlerFunc
          };
          routeArr.push(route);
        }
      });

    });

  }
}