'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'creatorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },  
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'creatorId')
  }
};

