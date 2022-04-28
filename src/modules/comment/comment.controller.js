'use strict';

const router = require('express').Router();
const { asyncWrapper } = require('../../common/asyncWrapper');

const CommentService = require('./comment.service');
const CommentValidation = require('./comment.validation');

/** 게시판 생성 */
router.post('/create', CommentValidation.validationCreateComment, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;
  res.status(201).send({ result: (await CommentService.createComment(parameters)) });
}));


/** 게시판 조회 */
router.get('/find', CommentValidation.validationFindComment, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;

  res.status(200).send({ result: (await BoardService.findComment(parameters)) });
}));

module.exports = router;