"use strict";

module.exports = function(sequelize, DataTypes) {
  var Theme = sequelize.define("Theme", {
    nom: DataTypes.STRING
 }, {
        classMethods: {
          associate: function(models) {
            Theme.hasMany(models.Question),
            Theme.hasMany(models.Parcours)
          }
        }
      });

  return Theme;
};