'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    queryInterface.addColumn('Ptobq', 'ParcourId',
    {
        type: Sequelize.INTEGER,
        references: "Parcours",
        referencesKey: "id"
    });

    queryInterface.addColumn('Parcours', 'actif',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    });

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    queryInterface.removeColumn('Ptobqs', 'ParcourId');

    queryInterface.removeColumn('Parcours', 'actif');

  }
};
