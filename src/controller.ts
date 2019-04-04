import {ServerRoute} from "hapi";
import App from './app';

export default class Controller {
  private static route: Array<ServerRoute> = [];

  public static init() {
    this.eachController();
    App.getIns().server.route(this.route);
  }

  public static eachController() {
    const handlerFunc = (request, h) => {
        return 'Hello world';
    };
    const route = {
      path: '/',
      method: 'GET',
      handler: handlerFunc
    };
    this.route.push(route);
  }
}