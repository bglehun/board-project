'use strict';

const router = require('express').Router();
const BoardService = require('./board.service');
const BoardValidation = require('./board.validation');

router.post('/create', BoardValidation.validationCreateBoard, async (req, res, next) => {
  const { parameters } = req;
  res.status(201).send({ result: (await BoardService.createBoard(parameters)) });
});

router.put('/edit/:boradId', BoardValidation.validationCreateBoard, async (req, res, next) => {
  const { parameters } = req;
  res.status(201).send({ result: (await BoardService.editBoard(parameters)) });
});

router.get('/find', BoardValidation.validationFindBoard, async (req, res, next) => {
  const { parameters } = req;

  res.status(200).send({ result: (await BoardService.findBoard(parameters)) });
});

router.get('/detail/:boardId', BoardValidation.validationDetailBoard ,async (req, res, next) => {
  const { parameters } = req;
  
  res.status(200).send({ result: (await BoardService.detailBoard(parameters)) });
});

router.delete('/delete/:boardId', BoardValidation.validationDeleteBoard, async (req, res, next) => {
  const { parameters } = req;
  res.status(200).send({ result: (await BoardService.deleteBoard(parameters)) });
});

module.exports = router;