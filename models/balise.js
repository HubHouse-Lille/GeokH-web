"use strict";

module.exports = function(sequelize, DataTypes) {
  var Balise = sequelize.define("Balise", {
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    indice: DataTypes.TEXT,
    nom: DataTypes.STRING,
    public : DataTypes.BOOLEAN
  }, {
      classMethods: {
        associate: function(models) {
          Balise.hasMany(models.Ptobq)
          Balise.belongsTo(models.User)
        }
      }
    });

  return Balise;
};
