const {v4: uuid} = require("uuid");
const {format} = require("date-fns");

console.log(format(new Date(), "yyy.MM.dd\thh:mm:ss"));

console.log("hello");
console.log(uuid());

console.log()