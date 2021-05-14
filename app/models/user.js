'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }

    static async signIn(params) {
      const user = await this.findOne({ where: { provider: params.provider, uid: params.uid } });
      if (user) {
        user.set({
          username: params.username,
          accessToken: params.accessToken,
          refreshToken: params.refreshToken
        });
        await user.save();
        return user;
      } else {
        const fields = ['provider', 'uid', 'username', 'displayName', 'email', 'accessToken', 'refreshToken'];
        return await this.create(params, { fields });
      }
    }

    isAdmin() {
      return this.role === this.constructor.roles.admin;
    }
  }
  User.roles = { normal: 0, admin: 1 };
  User.init({
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'providerは必須です'
        }
      }
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'uidは必須です'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'usernameは必須です'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'フォーマットがEmailとして認められません'
        },
        notEmpty: {
          msg: 'emailは必須です'
        }
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '表示名は必須です'
        },
        len: {
          msg: '表示名は3文字以上24文字未満です',
          args: [3, 24]
        }
      }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: User.roles.normal,
      validate: {
        notEmpty: {
          msg: '役割は必須です'
        },
        isIn: {
          msg: `役割は${Object.values(User.roles).join(',')}のいずれかです`,
          args: [Object.values(User.roles)]
        }
      }
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'アクセストークンは必須です'
        }
      }
    },
    refreshToken: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};