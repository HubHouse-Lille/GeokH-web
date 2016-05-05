"use strict";

module.exports = function(sequelize, DataTypes) {
    var Score = sequelize.define("Score", {
        nom: DataTypes.STRING,
        score : DataTypes.INTEGER,
        temps : DataTypes.TIME,
        balises_trouvees : DataTypes.INTEGER,
        reponses_trouvees : DataTypes.INTEGER,
        niveau : DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Score.belongsTo(models.Parcour)
            }
        }
    });
    return Score;
};