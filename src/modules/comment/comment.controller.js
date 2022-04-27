'use strict';

const router = require('express').Router();


// router.post('/create', BoardValidation.validationCreateBoard, async (req, res, next) => {
//   const { body } = req;
//   res.send({ result: (await BoardService.createBoard(body)) });
// });

// router.get('/find', BoardValidation.validationFindBoard, async (req, res, next) => {
//   const { query } = req;

//   res.send({ result: (await BoardService.createBoard(query)) });
// });

module.exports = router;