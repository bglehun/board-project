'use strict'

const CommentMDB = require('./database/mysql');

exports.createComment = async({
  boardId,
  replyId,
  content,
  writer, 
}) => {
  const createdBoard = await CommentMDB.createComment({
    data: {
      boardId,
      replyId,
      content,
      writer, 
    }
  });

  return createdBoard;
};

exports.findComment = async({ title, writer, cursor }) => {
  const boardList = await BoardMDB.findAllComment({ title, writer, cursor })
  return boardList;
};