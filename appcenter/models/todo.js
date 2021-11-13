const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      todolist: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Todo',
      tableName: 'Todos',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Todo.belongsTo(db.User, { foreignKey: 'todolistuser', targetKey: 'id' });
  }
};