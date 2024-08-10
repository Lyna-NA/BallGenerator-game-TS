"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Replace with your Render PostgreSQL connection URL
const databaseUrl = 'postgresql://balls_user:7P4HR0Hvh3mrjhgwblnnRSse4OcE892T@dpg-cqron808fa8c73d7sbk0-a.oregon-postgres.render.com/balls';
const db = new sequelize_1.Sequelize(databaseUrl, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Set to true if you have a valid SSL certificate
        }
    },
    logging: false, // Set to true if you want to see SQL queries in the console
});
exports.default = db;
