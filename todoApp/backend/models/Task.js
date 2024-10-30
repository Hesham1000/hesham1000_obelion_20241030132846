const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Task extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Low'
      }
    }, {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: false
    });
  }
}

Task.init(sequelize);

module.exports = Task;