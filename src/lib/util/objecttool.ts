export default class ObjectTool {
  public static deepCopy(obj: object) {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          result[key] = this.deepCopy(obj[key]);   //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  }
}