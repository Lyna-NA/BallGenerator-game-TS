import sequelize from "./database";

export default class SequelizeManager {
  authenticate(): void {
    sequelize
      .authenticate()
      .then(() => {
        console.log("***************************************************************");
        console.log(`Connected Successfully to the DB: ${sequelize.config.database}`);
        console.log("***************************************************************");
      })
      .catch((error) => {
        console.log("Connection Failed");
      });
  }

  syncModels(callback: (result: string, success: boolean) => void): void {
    sequelize
      .sync({ force: true })
      .then(() => {
        callback("Tables Created!", true);
      })
      .catch(() => {
        callback("Failed!", false);
      });
  }
}