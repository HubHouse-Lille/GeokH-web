"use strict";

module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    objectif: DataTypes.STRING,
    type: DataTypes.STRING,
    difficulte: DataTypes.STRING,
    question: DataTypes.STRING,
    propositions: DataTypes.ARRAY(DataTypes.TEXT),
    reponses: DataTypes.ARRAY(DataTypes.TEXT),
    retours: DataTypes.ARRAY(DataTypes.TEXT)
  }, {
       classMethods: {
         associate: function(models) {
           Question.hasMany(models.Ptobq),
           Question.belongsTo(models.Theme)
         }
       }
     });
  return Question;
};
