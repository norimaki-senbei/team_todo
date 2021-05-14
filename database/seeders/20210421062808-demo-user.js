'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      provider: 'demo',
      uid: 'admin',
      username: 'admin',
      displayName: 'Admin',
      email: 'admin@example.com',
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      provider: 'demo',
      uid: 'user1',
      username: 'user1',
      displayName: 'User1',
      email: 'user1@example.com',
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      role: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      provider: 'demo',
      uid: 'user2',
      username: 'user2',
      displayName: 'User2',
      email: 'user2@example.com',
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      role: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
