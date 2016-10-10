"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
     }, {
          classMethods: {
            associate: function(models) {
              User.hasMany(models.Parcours)
              User.hasMany(models.Balise)
              User.hasMany(models.Question)
              User.hasMany(models.Entrepreneur)
             }
          }
  });

  return User;
};
