const fs = require("fs");

const rs = fs.createReadStream("./text/lorem.txt", { encoding: "utf-8" });
const ws = fs.createWriteStream("./text/new-lorem.txt"); // Create the WriteStream

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// });

// rs.on('end', () => {
//     console.log('File copied successfully.');
// });

// rs.on('error', (err) => {
//     console.error('Error reading file:', err);
// });

// ws.on('error', (err) => {
//     console.error('Error writing to file:', err);
// });

rs.pipe(ws);
