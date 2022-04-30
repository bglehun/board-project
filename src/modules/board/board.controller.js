'use strict';

const router = require('express').Router();
const { asyncWrapper } = require('../../common/asyncWrapper');

const BoardService = require('./board.service');
const BoardValidation = require('./board.validation');

/**
 * @swagger
 * paths:
 *  /board/create:
 *    post:
 *      summary: "게시글 생성"
 *      description: "게시글 정보 생성"
 *      tags: [Board]
 *      requestBody:
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: 게시글 제목
 *                  example: "제목입니다."
 *                content:
 *                  type: string
 *                  description: 게시글 본문
 *                  example: "본문입니다."
 *                writer:
 *                  type: string
 *                  description: 게시글 작성자
 *                  example: "장훈"
 *                password:
 *                  type: string
 *                  description: 게시글 비밀번호
 *                  example: "1234"
 * 
 *      responses:
 *        200:
 *          description: 생성된 게시글 정보
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                    result:
 *                      type: object
 *                      properties:
 *                        boradId:
 *                          type: integer
 *                          description: 게시글 고유 id 
 *                          example: 1
 *                        title:
 *                          type: string
 *                          description: 게시글 제목
 *                          example: "게시글 제목 응답값 예시"
 *                        content:
 *                          type: string
 *                          description: 게시글 본문
 *                          example: "게시글 본문 응답값 예시"
 *                        writer:
 *                          type: string
 *                          description: 게시글 작성자
 *                          example: "게시글 작성자 응답값 예시"
 *                        createdAt:
 *                          type: string
 *                          description: 게시글 생성일
 *                          example: "2022-05-01T05:43:51.122Z"
 *                        updatedAt:
 *                          type: string
 *                          description: 게시글 수정일
 *                          example: "2022-05-01T05:43:51.122Z"
 */
router.post('/create', BoardValidation.validationCreateBoard, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;
  res.status(201).send({ result: (await BoardService.createBoard(parameters)) });
}));

/**
 * @swagger
 * paths:
 *  /board/edit/{boardId}:
 *    put:
 *      summary: "게시글 수정"
 *      description: "게시글 정보 수정. 비밀번호가 일치 해야 수정 가능합니다."
 *      tags: [Board]
 *      parameters:
 *      - in: path
 *        name: boardId
 *        required: true
 *        description: 게시글 고유 id
 *        schema:
 *          type: integer
 *      requestBody:
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: 게시글 제목
 *                  example: "제목입니다."
 *                content:
 *                  type: string
 *                  description: 게시글 본문
 *                  example: "본문입니다."
 *                password:
 *                  type: string
 *                  description: 게시글 비밀번호
 *                  example: "1234"
 *      responses:
 *        "200":
 *          description: 게시글 수정 여부
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                    result:
 *                      type: boolean
 *                      example: true
 */
router.put('/edit/:boardId', BoardValidation.validationEditBoard, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;
  res.status(201).send({ result: (await BoardService.editBoard(parameters)) });
}));

/**
 * @swagger
 * paths:
 *  /board/find:
 *    get:
 *      summary: "게시글 목록 조회"
 *      description: "게시글 목록 조회. 페이지네이션 단위 3개 (수정하려면 환경변수 BOARD_PAGINATION_LIMIT 셋팅)"
 *      tags: [Board]
 *      parameters:
 *      - in: query
 *        name: title
 *        required: false
 *        description: 게시글 제목. 제목으로 검색 시 필요.
 *        schema:
 *          type: string
 *      - in: query
 *        name: writer
 *        required: false
 *        description: 게시글 작성자. 작성자로 검색 시 필요.
 *        schema:
 *          type: string
 *      - in: query
 *        name: cursor
 *        required: false
 *        description: 페이지네이션 기준값. 화면 마지막 게시글의 boardId가 들어감.
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          description: 게시글 목록
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                    result:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          boradId:
 *                            type: integer
 *                            description: 게시글 고유 id 
 *                            example: 1
 *                          title:
 *                            type: string
 *                            description: 게시글 제목
 *                            example: "게시글 제목 응답값 예시"
 *                          content:
 *                            type: string
 *                            description: 게시글 본문
 *                            example: "게시글 본문 응답값 예시"
 *                          writer:
 *                            type: string
 *                            description: 게시글 작성자
 *                            example: "게시글 작성자 응답값 예시"
 *                          createdAt:
 *                            type: string
 *                            description: 게시글 생성일
 *                            example: "2022-05-01T05:43:51.122Z"
 *                          updatedAt:
 *                            type: string
 *                            description: 게시글 수정일
 *                            example: "2022-05-01T05:43:51.122Z"
 */
router.get('/find', BoardValidation.validationFindBoard, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;

  res.status(200).send({ result: (await BoardService.findBoard(parameters)) });
}));

/**
 * @swagger
 * paths:
 *  /board/delete/{boardId}:
 *    delete:
 *      summary: "게시글 삭제"
 *      description: "게시글 정보 삭제. 비밀번호가 일치 해야 삭제 가능합니다."
 *      tags: [Board]
 *      parameters:
 *      - in: path
 *        name: boardId
 *        required: true
 *        description: 게시글 고유 id
 *        schema:
 *          type: integer
 *      requestBody:
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                  description: 게시글 비밀번호
 *                  example: "1234"
 *      responses:
 *        "200":
 *          description: 게시글 삭제 여부
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                    result:
 *                      type: boolean
 *                      example: true
 */
router.delete('/delete/:boardId', BoardValidation.validationDeleteBoard, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;
  res.status(200).send({ result: (await BoardService.deleteBoard(parameters)) });
}));

module.exports = router;