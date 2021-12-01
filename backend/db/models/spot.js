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

    // const usersMapping = {
    //   through: 'Booking',
    //   otherKey: 'userId',
    //   foreignKey: 'spotId'
    // };

    // Spot.belongsToMany(models.User, usersMapping);

    // const usersMapping2 = {
    //   through: 'Review',
    //   otherKey: 'userId',
    //   foreignKey: 'spotId'
    // };

    // Spot.belongsToMany(models.User, usersMapping2);

    // Spot.hasMany(models.Booking, {foreignKey: 'spotId'});
    // Spot.hasMany(models.Review, {foreignKey: 'spotId'});
  };
  return Spot;
};
