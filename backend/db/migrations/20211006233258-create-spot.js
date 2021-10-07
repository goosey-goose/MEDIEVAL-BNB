'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullAddress: {
        type: Sequelize.STRING(350),
        allowNull: false,
        unique: true,
      },
      lat: {
        type: Sequelize.DOUBLE(5,20),
        allowNull: false,
        unique: true,
      },
      lng: {
        type: Sequelize.DOUBLE(5,20),
        allowNull: false,
        unique: true,
      },
      spotName: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING(1234),
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Spots');
  }
};
