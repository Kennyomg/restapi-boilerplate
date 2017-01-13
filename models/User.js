const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => { // eslint-disable-line
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(128),
      unique: true,
      validate: { isEmail: true },
    },
    raw_password: {
      type: DataTypes.VIRTUAL,
      validate: {
        // TODO: set validation rules for password
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING(32),
    },
    registration_key: {
      type: DataTypes.STRING(10),
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    api_key: {
      type: DataTypes.STRING(40),
    },
  }, {
    name: {
      singular: 'user',
      plural: 'users',
    },
    underscored: true,
    tableName: 'user',
    timestamps: true,
    classMethods: {
      associate: (models) => {
        models.User.belongsTo(models.Role);
      },
    },
    instanceMethods: {
      testPassword(pass) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(pass, this.password, (err, res) => {
            if (err) return reject(err);
            if (res) {
              resolve();
            } else {
              bcrypt.compare(this.salt + pass, this.password, (err, res) => {
                if (res) resolve();
                else reject();
              });
            }
          });
        });
      },
    },
    hooks: {
      beforeCreate(user) {
        user.token = crypto.randomBytes(7).toString('hex');
        user.api_key = crypto.randomBytes(20).toString('hex');
        user.registration_key = crypto.randomBytes(5).toString('hex');
      },
      beforeValidate(user) {
        if (user.raw_password) {
          return new Promise(resolve => {
            bcrypt.hash(user.raw_password, 12, (err, hash) => {
              user.password = hash;
              resolve();
            });
          });
        }
      },
    },
  });
};
