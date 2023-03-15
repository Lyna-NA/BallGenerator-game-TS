import { Sequelize } from "sequelize";

const db = new Sequelize({
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "P@s$123$",
    database: "Balls_DB",
    dialect: "postgres",
});

export default db;