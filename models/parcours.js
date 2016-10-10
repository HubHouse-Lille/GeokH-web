"use strict";

module.exports = function(sequelize, DataTypes) {
  var Parcours = sequelize.define("Parcours", {
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    actif: DataTypes.BOOLEAN,
    public : DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Parcours.hasMany(models.Ptobq),
        Parcours.belongsTo(models.User),
        Parcours.hasMany(models.Score)
       }
    }
    });
  return Parcours;
};
