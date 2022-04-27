'use strict'

exports.createBoard = async({
  title,
  content,
  writer,
  password,
}) => {
  return 'create board';
};

exports.editBoard = async({ boardId, password }) => {
  return 'edited board';
};

exports.findBoard = async({ writer, cursor }) => {
  return [1,2,3,4,5];
};

exports.detailBoard = async({ writer, boardId }) => {
  return 'detail';
};

exports.searchBoard = async({ searchText }) => {
  return [1,2];
};

exports.deleteBoard = async({ boardId, password }) => {
  return 'deleted baord';
};

