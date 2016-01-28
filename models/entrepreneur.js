"use strict";

module.exports = function(sequelize, DataTypes) {
  var Entrepreneur = sequelize.define("Entrepreneur", {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    photo: DataTypes.BLOB,
    interview: DataTypes.TEXT,
    indice: DataTypes.TEXT
  });
  return Entrepreneur;
};
