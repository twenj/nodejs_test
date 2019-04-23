import { Controller } from "../../../src/core";

export default class Index extends Controller {
  public constructor() {
    super();
  }
  public index() {
    return 'Hello world';
  }
}