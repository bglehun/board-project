'use strict';

const { board, Sequelize } = require('../../../../libs/sequelize');
const { Op } = Sequelize;

const config = require('../../../../env');

exports.findOneBoard = async (boardId) => {
  try {
    const result = await board.findOne({ where: { boardId }, raw: true } );
    return result;
  } catch (err){
    console.log('MYSQL ERROR - 게시글 조회에 실패하였습니다.', err);
    throw new Error(err);
  }
};

exports.findAllBoard = async ({ title, writer, cursor }) => {
  try {
    const where = {};
    
    if (title) where.title = title;
    if (writer) where.writer = writer;
    if (cursor) where.boardId = { [Op.lt]: cursor };
    
    const result = await board.findAll({
      attributes: {
        exclude: ['deletedAt'],
      },
      where,
      order: [['boardId', 'DESC']],
      limit: config.boardPaginationLimit,
      raw: true,
    } );

    return result;
  } catch (err){
    console.log('MYSQL ERROR - 게시글 목록 조회에 실패하였습니다.', err);
    throw new Error(err);
  }
};