'use strict'

const KeywordService = require('../keyword/keyword.service');
const CommentMDB = require('./database/mysql');

exports.createComment = async({
  boardId,
  replyId,
  content,
  writer, 
}) => {
  /**
   * replyId가 있을때, 대댓글의 타겟이 대댓글이면 (dept = 2) 댓글 작성 불가.
  */
  if (replyId) {
    const targetComment = await CommentMDB.findOneComment({ boardId, commentId: replyId });
    if (!targetComment || targetComment.replyId || targetComment.dept === 2) throw new Error('댓글의 대상이 잘못되었습니다.');
  }

  const createdComment = await CommentMDB.createComment({
    data: {
      boardId,
      replyId,
      dept: !replyId ? 1 : 2,
      content,
      writer, 
    }
  });

  /**
   *  keyword 알람 push 전송
   * */
  await KeywordService.findKeywordAndSendPush(content);

  return createdComment;
};

exports.findComment = async({ boardId, cursor }) => {
  /** cursor = commentId */
  const commentList = await CommentMDB.findAllComment({ boardId, cursor })
  return commentList;
};