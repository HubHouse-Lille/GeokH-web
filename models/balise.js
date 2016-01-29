"use strict";

module.exports = function(sequelize, DataTypes) {
  var Balise = sequelize.define("Balise", {
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    indice: DataTypes.TEXT,
    nom: DataTypes.STRING
  }, {
      classMethods: {
        associate: function(models) {
          Balise.hasMany(models.Ptobq)
        }
      }
    });

  return Balise;
};
