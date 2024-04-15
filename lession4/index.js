const {format} = require("date-fns");
const {vs : uuid} = require("uuid");

console.log(format(new Date() , "yyyy-MM-dd\tHH:mm:ss"));

console.log(uuid());