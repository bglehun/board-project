'use strict';

module.exports = (sequelize, DataTypes) => {
  const entity = sequelize.define(
    'reward',
    {
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      rewardedAt: {
        type: DataTypes.STRING(12),
        allowNull: false,
        primaryKey: true,
      },
      savedReward: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        DefaultValue: 0,
      },
      usedReward: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        DefaultValue: 0,
      },
      totalReward: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        DefaultValue: 0,
      },
    },
    {
      tableName: 'reward',
      timestamps: true,
      indexes: [],
    },
  );

  return entity;
};
