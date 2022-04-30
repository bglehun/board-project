'use strict';

const { board } = require('../../../../libs/sequelize');

exports.editBoard = async ({ where, values, transaction }) => {
  try {
    const [result] = (await board.update(values, {
      where,
      transaction,
    }));
  
    return result;
  } catch (err){
    console.log('MYSQL ERROR - 게시글 수정에 실패하였습니다.', err);
    throw new Error(err);
  }
};