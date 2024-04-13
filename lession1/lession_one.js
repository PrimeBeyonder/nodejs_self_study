console.log("hello world");
console.log(global);

console.log("OS");


const os = require("os");
const path = require("path");
const math = require("./math");

console.log(math.add(3,4));
console.log(math.add(3,67));
console.log(math.add(3,0));

console.log("OS");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log("Path");

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));