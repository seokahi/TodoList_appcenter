const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: false,
      },
    }, {
      sequelize,
      timestamps: true,
      //true는 createdAt과  updatedAt을 알아서 해줌
      underscored: false,
      modelName: 'User',
      tableName: 'Users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Todo, { foreignKey: 'todolistuser', sourceKey: 'id' });
  }
};