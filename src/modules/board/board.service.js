'use strict'

const BoardMDB = require('./database/mysql');

exports.createBoard = async({
  title,
  content,
  writer,
  password,
}) => {
  // TODO: encrypt password using bycrypt
  const createdBoard = await BoardMDB.createBoard({
    data: {
      title,
      content,
      writer,
      password,
    }
  });

  return createdBoard;
};

exports.editBoard = async({ boardId, password, title, content }) => {
  const targetBoard = await BoardMDB.findOneBoard({ boardId, password });

  // TODO: compare encrypted password using bycrypt
  if (!targetBoard || targetBoard.password !== password) throw new Error('Not found board or Missmatch password!');

  const editedBoard = await BoardMDB.editBoard({
    values: { title, content },
    where: { boardId, password }
  });

  return !!editedBoard;
};

exports.findBoard = async({ title, writer, cursor }) => {
  const boardList = await BoardMDB.findAllBoard({ title, writer, cursor })
  return boardList;
};

exports.deleteBoard = async({ boardId, password }) => {
  const targetBoard = await BoardMDB.findOneBoard({ boardId, password });

  // TODO: compare encrypted password using bycrypt
  if (!targetBoard || targetBoard.password !== password) throw new Error('Not found board or Missmatch password!');

  const deletedBoard = await BoardMDB.deleteBoard({ boardId, password });

  return !!deletedBoard;
};

