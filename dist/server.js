"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Check the README.md file for instructions to the exercise
const fs_1 = __importDefault(require("fs")); // fs to read the file
const http_1 = __importDefault(require("http")); // http to create the server
const dotenv_1 = __importDefault(require("dotenv")); // to get access to the .env info and vars
const path_1 = __importDefault(require("path")); // to create the path to the directory
dotenv_1.default.config(); // to acces the PORT var
const server = http_1.default.createServer((request, responce) => {
    const viewImagedir = "images/veryhappydog.jpg"; // dir of the target image
    const docsDirectory = path_1.default.join(__dirname, "", viewImagedir); // path to join the server.js and the dir target of the image
    // view image
    if (request.url === "/view-image") { // url path of the image
        fs_1.default.readFile(docsDirectory, (err, data) => {
            if (err) { // in case we hav an error
                responce.writeHead(500, { "content-type": "text/plain" }); // type text/plain
                responce.end("Not found");
                return;
            }
            // if we dont have an error we retun the image
            responce.writeHead(200, { "content-type": "image/jpeg" }); // the type image/jpeg
            responce.end(data);
        });
        return;
    }
    //404 fallback
    responce.writeHead(404, { "content-type": "text/plain" });
    responce.end("Not found");
    return;
});
const PORT = process.env.PORT || 3500;
server.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
