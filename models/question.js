"use strict";

module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    objectif: DataTypes.STRING,
    type: DataTypes.STRING,
    difficulte: DataTypes.STRING,
    question: DataTypes.STRING,
    propositions: DataTypes.ARRAY(DataTypes.TEXT),
    reponses: DataTypes.ARRAY(DataTypes.INTEGER),
    retours: DataTypes.ARRAY(DataTypes.TEXT),
    public : DataTypes.BOOLEAN
  }, {
       classMethods: {
         associate: function(models) {
           Question.hasMany(models.Ptobq),
           Question.belongsTo(models.Theme),
           Question.belongsTo(models.User)
         }
       }
     });
  return Question;
};
