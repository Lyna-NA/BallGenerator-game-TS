"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import required modules
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
// create a new express app
const app = (0, express_1.default)();
// create a new http server and pass the express app to it
const server = http_1.default.createServer(app);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ball.html');
});
// start the server
server.listen(3000, () => {
    console.log('Server running on port 3000');
    const io = require("./utils/socket-io").init(server);
});
