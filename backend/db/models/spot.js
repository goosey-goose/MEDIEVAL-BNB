'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    fullAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lat: {
      type: DataTypes.DOUBLE(5,20),
      allowNull: false,
      unique: true,
    },
    lng: {
      type: DataTypes.DOUBLE(5,20),
      allowNull: false,
      unique: true,
    },
    spotName: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      unique: true,
    }
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
  };
  return Spot;
};
