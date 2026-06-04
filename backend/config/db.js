const { Sequelize } = require('sequelize');

const isProduction = process.env.DATABASE_URL;

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Required for Render PostgreSQL SSL
        }
      },
      logging: false
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false
    });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(isProduction ? 'PostgreSQL connected successfully' : 'SQLite connected successfully');
    await sequelize.sync(); // Sync models
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = sequelize;
module.exports.connectDB = connectDB;


