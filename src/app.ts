import * as Hapi from 'hapi';
import Controller from './controller';

export default class App {

  private static server: Hapi.Server;
  private static appDir: string;

  private static defaultOption = {
    host: 'localhost',
    port: 4170
  };

  private static init(appDir: string) {
    this.appDir = appDir;

    this.server = new Hapi.Server({
      port: this.defaultOption.port,
      host: this.defaultOption.host
    });
  }

  public static async start(appDir) {
    this.init(appDir);

    Controller.init(this.server, appDir);

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