'use strict';

// TABELA CERTA

module.exports = {

  // Criando tabela no banco
  up: async (queryInterface, Sequelize) => {
                                    
                            //Nome da tabela 'usuario'
    return queryInterface.createTable('usuario', {
       id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false
       } ,
       nome: {
        type: Sequelize.STRING,
        allowNull: false
      } ,
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      } ,
    });  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
