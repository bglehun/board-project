'use strict';

module.exports = (sequelize, DataTypes) => {
  const entity = sequelize.define(
    'comment',
    {
      commentId: {
        type: DataTypes.INTEGER(16).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      boardId: {
        type: DataTypes.INTEGER(16).UNSIGNED,
        allowNull: false,
      },
      replyId: {
        type: DataTypes.INTEGER(16).UNSIGNED,
        allowNull: true,
      },
      writer: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'comment',
      timestamps: true,
      indexes: [],
    },
  );

  entity.associate = (entities) => {
    entity.belongsTo(entities.board, {
      foreignKey: 'boardId',
      targetKey: 'boardId',
    });
    // model.hasMany(models.report, {
    //   foreignKey: 'reportId',
    //   sourceKey: 'id',
    // });
  };

  return entity;
};
