import * as Hapi from 'hapi';
import Route from './route';

export default class App {

  private static server: Hapi.Server;

  private static defaultOption = {
    host: 'localhost',
    port: 4170
  };

  private static init() {
    this.server = new Hapi.Server({
      port: this.defaultOption.port,
      host: this.defaultOption.host
    });
  }

  public static async start() {
    this.init();

    Route.init(this.server);

    await this.server.start();
    console.log(`Server running at: ${this.server.info.uri}`);

    this.exit();
  }

  private static exit() {
    process.on('unhandledRejection', (err) => {
      console.error(err);
      process.exit(1);
    });
  }

}