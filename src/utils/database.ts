import { Sequelize } from 'sequelize';

const db = new Sequelize('postgresql://balls_user:7P4HR0Hvh3mrjhgwblnnRSse4OcE892T@dpg-cqron808fa8c73d7sbk0-a.oregon-postgres.render.com/balls', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default db;
