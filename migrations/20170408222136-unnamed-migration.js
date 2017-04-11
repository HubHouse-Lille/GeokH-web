'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    

    queryInterface.addColumn(
      'Parcours',
      'ThemeId',
      {
        type: Sequelize.INTEGER,
        refecrences: {
          model: 'Themes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      }
    )

  },

  down: function (queryInterface, Sequelize) {
     

     queryInterface.removeColumn(
      'Parcours',
      'ThemeId'
    )



  }
};
