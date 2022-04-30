'use strict';

const { comment } = require('../../../../libs/sequelize');

exports.createComment = async ({ data,transaction }) => {
  try {
    const result = (await comment.create(data, { transaction })).get({ plain: true });

    result.boardId = Number(result.boardId);
    result.replyId = result.replyId ? Number(result.replyId) : undefined;

    return result;
  } catch (err){
    console.log('MYSQL ERROR - 게시글 댓글 생성에 실패하였습니다.', err);
    throw new Error(err);
  }
};