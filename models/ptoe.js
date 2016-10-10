"use strict";

module.exports = function(sequelize, DataTypes) {
  var Ptoe = sequelize.define("Ptoe", {
  }, {
    classMethods: {
      associate: function(models) {
        Ptoe.belongsTo(models.Entrepreneur),
        Ptoe.belongsTo(models.Parcours)
      }
    }
  });
  return Ptoe;
};
