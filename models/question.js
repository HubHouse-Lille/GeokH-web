"use strict";

module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    theme: DataTypes.STRING,
    objectif: DataTypes.STRING,
    type: DataTypes.STRING,
    difficulte: DataTypes.STRING,
    question: DataTypes.STRING,
    propositions: DataTypes.TEXT,
    reponses: DataTypes.TEXT,
    retours: DataTypes.TEXT
  });
  return Question;
};
