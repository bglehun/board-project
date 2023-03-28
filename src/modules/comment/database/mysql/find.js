'use strict';

const _ = require('lodash');
const { comment, Sequelize } = require('../../../../libs/sequelize');
const { Op } = Sequelize;

const config = require('../../../../env');

/** 게시글 댓글 단일 조회 */
exports.findOneComment = async ({ boardId, commentId }) => {
  try {
    const result = await comment.findOne({ where: { boardId, commentId }, raw: true } );
    return result;
  } catch (err){
    console.log('MYSQL ERROR - 게시글 댓글 조회에 실패하였습니다.', err);
    throw new Error(err);
  }
};
/** 게시글 댓글 리스트 조회. 대댓글도 포함하지만 페이지네이션 단위에는 포함되지 않음. */
exports.findAllComment = async ({ boardId, cursor }) => {
  try {
    const where = { boardId, dept: 1 };
    
    if (cursor) where.commentId = { [Op.lt]: cursor };

    /** 페이지네이션 단위에 맞게 상위 댓글 조회 (dept = 1) */
    let commentResult = await comment.findAll({
      attributes: {
        exclude: ['replyId'],
      },
      where,
      order: [['commentId', 'DESC']],
      limit: config.commentPaginationLimit,
      raw: true,
    });

    /** commentId만 추출 하여, 하위 댓글 조회 (dept = 2) */
    const commentIdList = commentResult.map(comment => comment.commentId);

    let replyCommentResult = await comment.findAll({
      where: {
         replyId: { [Op.in]: commentIdList },
         dept: 2,
        },
      order: [['commentId', 'DESC']],
      raw: true
    });

    /** replyId로 그룹화  */
    replyCommentResult = _.groupBy(replyCommentResult, (reply) => reply.replyId);

    /** 상위 댓글에 하위 댓글 정보 추가. 없다면 빈 배열 */
    commentResult = commentResult.map(comm => {
      comm.reply = replyCommentResult[comm.commentId] || [];
      return comm;
    });

    return commentResult;
  } catch (err){
    console.log('MYSQL ERROR - 게시글 댓글 목록 조회에 실패하였습니다.', err);
    throw new Error(err);
  }
};