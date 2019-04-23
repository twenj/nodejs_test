import * as Hapi from 'hapi';
import * as SocketIo from 'socket.io';
import Controller from './controller';
import Socket from './socket';

export default class App {

  private static ins: any;
  private static io: SocketIo.Server;

  private server: Hapi.Server;
  private appDir: string;
  private controllerDir: string;

  private appOptions = {
    host: 'localhost',
    port: 4170,
    controllerDir: 'controllers'
  };

  public static getIns() {
    return this.ins;
  }

  public static getSocket() {
    return this.io;
  }

  public static start(options: object) {
    let app = new App();
    app.appDir = options['appDir'];
    app.controllerDir = app.appOptions.controllerDir;

    app.server = new Hapi.Server({
      port: app.appOptions.port,
      host: app.appOptions.host
    });

    this.ins = app;
    this.io = SocketIo(app.server.listener);
    return app;
  }

  public async run() {
    Controller.init();
    Socket.init();
    await this.server.start();
    console.log(`Server running at: ${this.server.info.uri}`);

    this.exit();
  }

  private exit() {
    process.on('unhandledRejection', (err) => {
      console.error(err);
      process.exit(1);
   });
 }

}