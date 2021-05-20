'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'creatorId', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
      //references: { model: 'Users', key: 'id' },  
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'creatorId')
  }
};

