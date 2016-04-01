"use strict";

module.exports = function(sequelize, DataTypes) {
  var Theme = sequelize.define("Theme", {
    nom: DataTypes.STRING
  });

  return Theme;
};