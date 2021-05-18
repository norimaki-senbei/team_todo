'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Teams', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Teams', 'ownerId', {
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' },
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Teams', 'name', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('Teams', 'ownerId', {
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' }
    });
  }
};
