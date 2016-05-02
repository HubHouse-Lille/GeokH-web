'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.createTable(
        'Scores',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
          nom: {
            type: Sequelize.STRING,
            allowNull: false
          },
          score: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          //foreign key usage
          ParcourId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Parcours',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        })
    
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
