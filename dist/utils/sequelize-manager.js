"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
class SequelizeManager {
    authenticate() {
        database_1.default
            .authenticate()
            .then(() => {
            console.log("***************************************************************");
            console.log(`Connected Successfully to the DB: ${database_1.default.config.database}`);
            console.log("***************************************************************");
        })
            .catch((error) => {
            console.log("Connection Failed");
        });
    }
    syncModels(callback) {
        database_1.default
            .sync({ force: true })
            .then(() => {
            callback("Tables Created!", true);
        })
            .catch(() => {
            callback("Failed!", false);
        });
    }
}
exports.default = SequelizeManager;
