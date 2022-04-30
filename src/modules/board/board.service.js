'use strict'

const KeywordService = require('../keyword/keyword.service');
const BoardMDB = require('./database/mysql');

exports.createBoard = async({
  title,
  content,
  writer,
  password,
}) => {
  const createdBoard = await BoardMDB.createBoard({
    data: {
      title,
      content,
      writer,
      password,
    }
  });

  /**
   *  keyword 알람 push 전송
   *  title과 content 둘 다 포함이 되도, push는 한번만 전송되어야함
   * */
  await KeywordService.findKeywordAndSendPush(`${title} ${content}`);

  return createdBoard;
};

exports.editBoard = async({ boardId, password, title, content }) => {
  const targetBoard = await BoardMDB.findOneBoard(boardId);

  if (!targetBoard) throw new Error('수정할 게시글이 존재하지 않습니다.');
  else if (targetBoard.password !== password) throw new Error('비밀번호가 일치하지 않습니다.');

  const editedBoard = await BoardMDB.editBoard({
    values: { title, content },
    where: { boardId }
  });

  return !!editedBoard;
};

exports.findBoard = async({ title, writer, cursor }) => {
  /** cursor = boardId */
  const boardList = await BoardMDB.findAllBoard({ title, writer, cursor })
  return boardList;
};

exports.deleteBoard = async({ boardId, password }) => {
  const targetBoard = await BoardMDB.findOneBoard(boardId);

  if (!targetBoard) throw new Error('삭제할 게시글이 존재하지 않습니다.');
  else if (targetBoard.password !== password) throw new Error('비밀번호가 일치하지 않습니다.');

  const deletedBoard = await BoardMDB.deleteBoard({ boardId, password });

  return !!deletedBoard;
};

