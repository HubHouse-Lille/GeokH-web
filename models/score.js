"use strict";

module.exports = function(sequelize, DataTypes) {
    var Score = sequelize.define("Score", {
        nom: DataTypes.STRING,
        score : DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Score.belongsTo(models.Parcour)
            }
        }
    });
    return Score;
};