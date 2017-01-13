module.exports = (sequelize, DataTypes) => { // eslint-disable-line
  return sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    label: {
      type: DataTypes.STRING(128),
      unique: true,
    },
  }, {
    name: {
      singular: 'role',
      plural: 'roles',
    },
    underscored: true,
    tableName: 'role',
    timestamps: false,
  });
};
