'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDoTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ToDoTask.belongsTo(models.User, {
        foreignKey: { allowNull: false },
      });
    }
  }
  ToDoTask.init({
    content:{ type: DataTypes.STRING },
    status:{
       type: DataTypes.ENUM,
       values: ['A', 'C'],
       defaultValue:'A'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'ToDoTask',
  });
  return ToDoTask;
};