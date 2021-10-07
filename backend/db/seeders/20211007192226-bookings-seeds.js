'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Bookings', [
        {
          spotId: 3,
          userId: 3,
          startDate: 'Thu Oct 07 2021',
          endDate: 'Thu Oct 14 2021',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 7,
          userId: 1,
          startDate: 'Sat Oct 09 2021',
          endDate: 'Sat Oct 16 2021',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Bookings', null, {});
  }
};
