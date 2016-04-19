"use strict";

module.exports = function(sequelize, DataTypes) {
  var Parcour = sequelize.define("Parcour", {
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    actif: DataTypes.BOOLEAN,
    public : DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Parcour.hasMany(models.Ptobq),
        Parcour.belongsTo(models.User)
       }
    }
    });
  return Parcour;
};
