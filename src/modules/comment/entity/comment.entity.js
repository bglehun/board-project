'use strict';

module.exports = (sequelize, DataTypes) => {
  const entity = sequelize.define(
    'comment',
    {
      commentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      boardId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      replyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      dept: {
        type: DataTypes.INTEGER(2).UNSIGNED,
        allowNull: false,
        defaultValue: 1,
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
      indexes: [
        {
          name: 'idx_boardId_dept',
          unique: false,
          fields: ['boardId', 'dept'],
        },
        {
          name: 'idx_replyId_dept',
          unique: false,
          fields: ['replyId', 'dept'],
        }
      ],
    },
  );

  return entity;
};