"use strict";

module.exports = function(sequelize, DataTypes) {
  var Parcour = sequelize.define("Parcour", {
    nom: DataTypes.STRING,
    description : DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Parcour.hasMany(models.Ptobq)
      }
    }
  });
  return Parcour;
};
