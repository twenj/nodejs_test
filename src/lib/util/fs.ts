import * as fs from "fs";
import * as path from "path";
import { merge } from "hoek";
export default class Fs {

    public static readDir(dir: string) {
        let fileArr: Array<string> = [];

        fs.readdirSync(dir).forEach( (file) => {

            let filePath = path.join(dir, file);
            let stat = fs.statSync(filePath);
            let isDirectory = stat.isDirectory();

            if (isDirectory === true) {
                let subFileArr = Fs.readDir(filePath);
                fileArr = merge(fileArr, subFileArr);
            } else {
                if (path.extname(filePath) === '.js') {
                    let fileName = path.basename(filePath, '.js');
                    fileArr.push(path.join(dir, fileName));
                }
            }

        });

        return fileArr;
    }

}