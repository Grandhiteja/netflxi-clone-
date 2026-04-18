const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite connected successfully');
    await sequelize.sync(); // Sync models
  } catch (error) {
    console.error('SQLite connection failed:', error);
    process.exit(1);
  }
};

module.exports = sequelize;
module.exports.connectDB = connectDB;

