'use strict';

exports.validationCreateBoard = (req, res, next) => {
  const {
    body: {
      title,
      content,
      writer,
      password, 
    }
   } = req;

  if (!title) next(new Error('타이틀은 필수값입니다.'));
  else if (!content) next(new Error('본문은 필수값입니다.'));
  else if (!writer) next(new Error('작성자는 필수값입니다.'));
  else if (!password) next(new Error('패스워드는 필수값입니다.'));

  req.parameters =  {
    title,
    content,
    writer,
    password, 
  };
  next();
};

exports.validationEditBoard = async (req, res, next) => {
  const {
    params: { boardId },
    body: {
      title,
      content,
      password, 
    }
  } = req;

  if (!boardId || isNaN(Number(boardId))) next(new Error('게시글 아이디가 없거나 올바르지 않습니다.', boardId));
  else if (!title) next(new Error('타이틀은 필수값입니다.'));
  else if (!content) next(new Error('본문은 필수값입니다.'));
  else if (!password) next(new Error('패스워드는 필수값입니다.'));

  req.parameters =  {
    boardId: Number(boardId),
    title,
    content,
    password, 
  };
 
  next();
};

exports.validationFindBoard = (req, res, next) => {
  let { query: { title, writer, cursor } } = req;

  if (cursor && isNaN(Number(cursor))) next(new Error('페이지네이션 값이 올바르지 않습니다'));;

  req.parameters = { title, writer, cursor: Number(cursor) };
  
  next();
};

exports.validationDeleteBoard = async (req, res, next) => {
  const {
    params: { boardId },
    body: { password }
  } = req;

  if (!boardId || isNaN(Number(boardId))) next(new Error('게시글 아이디가 없거나 올바르지 않습니다.', boardId));
  else if (!password) next(new Error('비밀번호는 필수값입니다'));

  req.parameters =  {
    boardId: Number(boardId),
    password, 
  };
  
  next();
};