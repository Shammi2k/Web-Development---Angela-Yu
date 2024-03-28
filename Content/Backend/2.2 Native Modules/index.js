const fs = require("fs");

fs.readFile('message.txt', 'utf-8',function(err, data) {
    if(err) throw err;
    console.log(data);
})