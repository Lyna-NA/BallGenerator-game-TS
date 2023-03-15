"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//modules: require
const express_1 = __importDefault(require("express"));
const HttpError_1 = __importDefault(require("./models/HttpError"));
const sequelize_manager_1 = __importDefault(require("./utils/sequelize-manager"));
//modules: routes
const player_routes_1 = __importDefault(require("./routes/player-routes"));
//sequelizeManager
const manager = new sequelize_manager_1.default();
// create a new express app
const app = (0, express_1.default)();
//app.use: urlEncoded
//Content-Type: application/x-www-form-url-encoded
app.use(express_1.default.urlencoded({ extended: true }));
//app.use: routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use("/api/players", player_routes_1.default);
//app.player: Fallback route
app.use("/", (req, res) => {
    throw new HttpError_1.default(404, "Not Found");
});
//app.use: Thrown Error Handler
app.use((error, req, res, next) => {
    return res.status(error.code).json({ status: false, message: error.message });
});
//manage the connection
manager.authenticate();
manager.syncModels((message, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(">>>>>>>>>>>>", message);
    if (status) {
        const server = app.listen(5000);
        console.log("==============================================");
        console.log('Server running on port 5000');
        console.log("==============================================");
        const io = require("./utils/socket-io").init(server);
    }
}));
