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

  if (!boardId || isNaN(Number(boardId))) next(new Error('Require valid boardId'));
  else if (replyId && isNaN(Number(replyId))) next(new Error('Require valid replyId'));
  else if (!content) next(new Error('Require content'));
  else if (!writer) next(new Error('Require writer'));

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

  if (cursor && isNaN(Number(cursor))) next(new Error('Invalid cursor'));;

  req.parameters = { cursor };
  next();
};