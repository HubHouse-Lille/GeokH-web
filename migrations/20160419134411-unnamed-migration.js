'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn(
    'Balises',
    'public',
    Sequelize.BOOLEAN
    )
    queryInterface.addColumn(
    'Questions',
    'public',
    Sequelize.BOOLEAN
    )
    queryInterface.addColumn(
    'Parcours',
    'public',
    Sequelize.BOOLEAN
    )
    queryInterface.addColumn(
    'Balises',
    'UserId',
    {
    type: Sequelize.INTEGER,
    references: {
    model: 'Users',
    key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
    }
    )
    queryInterface.addColumn(
    'Questions',
    'UserId',
    {
    type: Sequelize.INTEGER,
    references: {
    model: 'Users',
    key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
    }
    )
    queryInterface.addColumn(
    'Entrepreneurs',
    'public',
    Sequelize.BOOLEAN
    )
    queryInterface.addColumn(
    'Entrepreneurs',
    'UserId',
    {
    type: Sequelize.INTEGER,
    references: {
    model: 'Users',
    key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
    }
    )


  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
