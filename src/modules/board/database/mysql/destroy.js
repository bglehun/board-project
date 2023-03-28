'use strict';

const { board } = require('../../../../libs/sequelize');

exports.deleteBoard = async ({ boardId, password }) => {
  try {
    const result = await board.destroy({ where: { boardId, password } });
    return result;
  } catch (err){
    console.log('MYSQL ERROR - 게시글 삭제에 실패하였습니다.', err);
    throw new Error(err);
  }
};