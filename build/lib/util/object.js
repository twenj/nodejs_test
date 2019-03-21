"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Object {
    static deepCopy(obj) {
        return obj;
        let result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    result[key] = this.deepCopy(obj[key]); //递归复制
                }
                else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }
}
exports.default = Object;
//# sourceMappingURL=object.js.map