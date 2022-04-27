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

  if (!title) next(new Error('Require title'));
  else if (!content) next(new Error('Require content'));
  else if (!writer) next(new Error('Require writer'));
  else if (!password) next(new Error('Require password'));

  // TODO password encript

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

  if (!boardId || isNaN(Number(boardId))) next(new Error('Require valid boardId'));
  else if (!title) next(new Error('Require title'));
  else if (!content) next(new Error('Require content'));
  else if (!password) next(new Error('Require password'));

  // TODO check password

  req.parameters =  {
    boardId: Number(boardId),
    title,
    content,
    password, 
  };
  next();
};

exports.validationFindBoard = (req, res, next) => {
  let { query: { writer, cursor } } = req;

  if (!writer) next(new Error('Require writer'));
  else if (cursor && isNaN(Number(cursor))) next(new Error('Invalid cursor'));;

  req.parameters = { writer, cursor };
  next();
};

exports.validationDetailBoard = (req, res, next) => {
  let { query: { writer }, params: { boardId } } = req;

  if (!writer) next(new Error('Require writer'));
  else if (!boardId || isNaN(Number(boardId))) next(new Error('Require valid boardId'));;

  req.parameters = { writer, boardId: Number(boardId) };
  next();
};

exports.validationDeleteBoard = async (req, res, next) => {
  const {
    params: { boardId },
    body: { password }
  } = req;

  if (!boardId || isNaN(Number(boardId))) next(new Error('Require valid boardId'));
  else if (!password) next(new Error('Require password'));

  // TODO check password

  req.parameters =  {
    boardId: Number(boardId),
    password, 
  };
  next();
};