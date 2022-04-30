'use strict';

exports.validationCreateComment = (req, res, next) => {
  const {
    body: {
      boardId,
      replyId,
      content,
      writer, 
    }
  } = req;

  if (!boardId || isNaN(Number(boardId))) next(new Error('게시글 아이디가 없거나 올바르지 않습니다.'));
  else if (replyId && isNaN(Number(replyId))) next(new Error('게시글 댓글 아이디가 없거나 올바르지 않습니다.'));
  else if (!content) next(new Error('본문은 필수값입니다.'));
  else if (!writer) next(new Error('작성자는 필수값입니다.'));

  req.parameters = {
    boardId,
    replyId,
    content,
    writer, 
  };

  next();
};

exports.validationFindComment = (req, res, next) => {
  let { query: { boardId, cursor } } = req;

  if (cursor && isNaN(Number(cursor))) next(new Error('페이지네이션 값이 올바르지 않습니다'));;

  req.parameters = { boardId, cursor: Number(cursor) };
  
  next();
};