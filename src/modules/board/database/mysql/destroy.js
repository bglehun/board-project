'use strict';

const { board } = require('../../../../libs/sequelize');

exports.deleteBoard = async ({ boardId, password }) => {
  try {
    const result = await board.destroy({ where: { boardId, password } });
    return result;
  } catch (err){
    console.log('MYSQL ERROR - deleteBoard error', err);
    throw new Error(err);
  }
};