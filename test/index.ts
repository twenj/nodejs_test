import { Fs } from "../src/lib/util";

let fileArr = Fs.readDir('/private/var/www/node/apitest/api/controllers');
console.log(fileArr);