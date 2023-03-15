"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize({
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "P@s$123$",
    database: "Balls_DB",
    dialect: "postgres",
});
exports.default = db;
