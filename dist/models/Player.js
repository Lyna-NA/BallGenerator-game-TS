"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
class Player extends sequelize_1.Model {
}
Player.init({
    playerId: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    color: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    top: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    left: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "Player",
    timestamps: true,
    underscored: true,
});
exports.default = Player;
