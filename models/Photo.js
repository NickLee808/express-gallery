module.exports = (sequelize, DataTypes) => {
  var PhotoModel = sequelize.define('photo', {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  });
  return PhotoModel;
};