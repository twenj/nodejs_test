"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const hoek_1 = require("hoek");
class Fs {
    static readDir(dir) {
        let fileArr = [];
        fs.readdirSync(dir).forEach((file) => {
            let filePath = path.join(dir, file);
            let stat = fs.statSync(filePath);
            let isDirectory = stat.isDirectory();
            if (isDirectory === true) {
                let subFileArr = Fs.readDir(filePath);
                hoek_1.merge(fileArr, subFileArr);
            }
            else {
                if (path.extname(filePath) === '.js') {
                    let fileName = path.basename(filePath, '.js');
                    fileArr.push(path.join(dir, fileName));
                }
            }
        });
        return fileArr;
    }
}
exports.default = Fs;
//# sourceMappingURL=fs.js.map