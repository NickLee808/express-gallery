module.exports = (sequelize, DataTypes) => {
  var UserModel = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return UserModel;
};