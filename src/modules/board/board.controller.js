'use strict';

const router = require('express').Router();
const { asyncWrapper } = require('../../common/asyncWrapper');

const BoardService = require('./board.service');
const BoardValidation = require('./board.validation');

/** 게시판 생성 */
router.post('/create', BoardValidation.validationCreateBoard, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;
  res.status(201).send({ result: (await BoardService.createBoard(parameters)) });
}));

/** 게시판 수정 */
router.put('/edit/:boardId', BoardValidation.validationEditBoard, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;
  res.status(201).send({ result: (await BoardService.editBoard(parameters)) });
}));

/** 게시판 조회 */
router.get('/find', BoardValidation.validationFindBoard, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;

  res.status(200).send({ result: (await BoardService.findBoard(parameters)) });
}));

/** 게시판 삭제 */
router.delete('/delete/:boardId', BoardValidation.validationDeleteBoard, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;
  res.status(200).send({ result: (await BoardService.deleteBoard(parameters)) });
}));

module.exports = router;