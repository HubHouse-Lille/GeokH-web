"use strict";

module.exports = function(sequelize, DataTypes) {
  var Ptobq = sequelize.define("Ptobq", {
    ordre: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Ptobq.belongsTo(models.Balise),
        Ptobq.belongsTo(models.Question),
        Ptobq.belongsTo(models.Parcours)
      }
    }
  });
  return Ptobq;
};
