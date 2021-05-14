const models = require('../../app/models');

beforeAll(async done => {
  await models.User.sync({ force: true });
  done();
});

afterAll(async done => {
  await models.sequelize.close();
  done();
});

describe('#isAdmin', () => {
  test('should true for admin', () => {
    const admin = models.User.build({ role: models.User.roles.admin });
    expect(admin.isAdmin()).toBe(true);
  });

  test('should false for normal', () => {
    const normal = models.User.build({ role: models.User.roles.normal });
    expect(normal.isAdmin()).toBe(false);
  });
});

describe('.signIn', () => {
  test('should new user when the first access', async () => {
    const user = await models.User.signIn({
      provider: 'test',
      uid: 'uid',
      username: 'username',
      email: 'email@example.com',
      displayName: 'displayName',
      accessToken: 'accessToken',
    });

    expect(user).not.toBeNull();
    expect(user.provider).toBe('test');
    expect(user.uid).toBe('uid');
    expect(user.username).toBe('username');
    expect(user.email).toBe('email@example.com');
    expect(user.displayName).toBe('displayName');
    expect(user.accessToken).toBe('accessToken');
  });

  test('should new user when more accesses', async () => {
    {
      const user = await models.User.signIn({
        provider: 'test',
        uid: 'uid',
        username: 'username',
        email: 'email@example.com',
        displayName: 'displayName',
        accessToken: 'accessToken',
      });

      expect(user).not.toBeNull();
    }

    {
      const user = await models.User.signIn({
        provider: 'test',
        uid: 'uid',
        username: 'username2',
        email: 'email2@example.com',
        displayName: 'displayName2',
        accessToken: 'accessToken2'
      });

      expect(user).not.toBeNull();
      expect(user.provider).toBe('test');
      expect(user.uid).toBe('uid');
      expect(user.username).toBe('username2'); // changed
      expect(user.email).toBe('email@example.com'); // not changed
      expect(user.displayName).toBe('displayName'); // not changeed
      expect(user.accessToken).toBe('accessToken2'); // changed
    }
  });
});

