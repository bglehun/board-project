'use strict';

module.exports = (sequelize, DataTypes) => {
  const entity = sequelize.define(
    'board',
    {
      boardId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      writer: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
          allowNull: false,
      }
    },
    {
      tableName: 'board',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'idx_title_boardId',
          unique: false,
          fields: ['title', 'boardId'],
        },
        {
          name: 'idx_writer_boardId',
          unique: false,
          fields: ['writer', 'boardId'],
        },
      ],
    },
  );

  entity.associate = (entities) => {
    entity.hasMany(entities.comment, {
      foreignKey: 'boardId',
      sourceKey: 'boardId',
    });
  };

  return entity;
};
