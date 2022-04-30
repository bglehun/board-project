'use strict';

const { board } = require('../../../../libs/sequelize');

exports.createBoard = async ({ data,transaction }) => {
  try {
    const result = (await board.create(data, { transaction })).get({ plain: true });
    return result;
  } catch (err){
    console.log('MYSQL ERROR - 게시글 생성에 실패하였습니다.', err);
    throw new Error(err);
  }
};