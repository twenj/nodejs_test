export default class Route {
  public static init(server) {
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return 'Hello world';
      }
    });
  }
}