/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import fs from "fs";
import qr_image from 'qr-image';

var questions = [{
        type: 'input',
        name: 'url',
        message: "Enter URL to convert to QR"
      }]
inquirer.prompt(questions)
.then((answers) => {
    var userUrl = answers['url'];
    var qr = qr_image.image(userUrl);
    qr.pipe(fs.createWriteStream('qr_image.png'));
    fs.writeFile("url.txt", userUrl, (err) => {
        if (err) {
            console.log(err);
        }
    })
})
.catch((err) => {
    console.log(err);
})