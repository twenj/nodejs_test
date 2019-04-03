import {ServerRoute} from "hapi";

export default class Controller {
  private static route: Array<ServerRoute> = [];
  private static controllerDir: string = '';

  public static init(server: any, appDir: string) {
    this.eachController();
    server.route(this.route);
  }

  public static eachController() {
    let Controller = require(this.controllerDir + '/index/index');
    Controller = new Controller.default;
    const handlerFunc = (request, h) => {
      let res = Controller.index();
      return res;
    };
  }
}