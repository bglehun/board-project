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
      paranoid: true,
      indexes: [
        // {
        //   name: 'idx_title_boardId',
        //   unique: false,
        //   fields: ['title', 'boardId'],
        // },
        // {
        //   name: 'idx_writer_boardId',
        //   unique: false,
        //   fields: ['writer', 'boardId'],
        // },
      ],
    },
  );

  // model.associate = (models) => {
  //   model.hasMany(models.challengeReviewComment, {
  //     foreignKey: 'reviewId',
  //     sourceKey: 'id',
  //   });
  //   model.hasMany(models.report, {
  //     foreignKey: 'reportId',
  //     sourceKey: 'id',
  //   });
  // };

  return entity;
};
