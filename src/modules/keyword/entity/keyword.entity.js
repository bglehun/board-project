'use strict';

module.exports = (sequelize, DataTypes) => {
  const entity = sequelize.define(
    'keyword',
    {
      keyword: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
      },
      writer: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: 'keyword',
      timestamps: false,
    },
  );

  return entity;
};
