const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Watchlist = sequelize.define('Watchlist', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  poster_path: {
    type: DataTypes.STRING,
  },
  backdrop_path: {
    type: DataTypes.STRING,
  },
});

module.exports = Watchlist;
