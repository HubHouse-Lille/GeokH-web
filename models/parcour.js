"use strict";

module.exports = function(sequelize, DataTypes) {
  var Parcour = sequelize.define("Parcour", {
    nom: DataTypes.STRING,
    objectif: DataTypes.STRING,
    type: DataTypes.STRING,
    difficulte: DataTypes.STRING,
    question: DataTypes.STRING,
    propositions: DataTypes.TEXT,
    reponses: DataTypes.TEXT,
    retours: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Parcour.hasMany(models.Balise),
        Parcour.hasMany(models.Entrepreneur)
      }
    }
  });
  return Parcour;
};
