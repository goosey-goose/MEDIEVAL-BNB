'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};
