'use strict';

const router = require('express').Router();
const { asyncWrapper } = require('../../common/asyncWrapper');

const CommentService = require('./comment.service');
const CommentValidation = require('./comment.validation');

/**
 * @swagger
 * paths:
 *  /comment/create:
 *    post:
 *      summary: "댓글 생성"
 *      description: "댓글 정보 생성"
 *      tags: [Comment]
 *      requestBody:
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                boardId:
 *                  type: integer
 *                  description: 댓글을 작성하는 게시글 고유 id
 *                  example: 1
 *                replyId:
 *                  type: integer
 *                  description: 대댓글을 작성하는 댓글 고유 id. (필수값 X)
 *                  example: 2
 *                content:
 *                  type: string
 *                  description: 댓글 본문
 *                  example: "댓글 본문입니다."
 *                writer:
 *                  type: string
 *                  description: 댓글 작성자
 *                  example: "장훈"
 * 
 *      responses:
 *        200:
 *          description: 생성된 댓글 정보
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                    result:
 *                      type: object
 *                      properties:
 *                        commentId:
 *                          type: integer
 *                          description: 댓글 고유 id 
 *                          example: 2
 *                        boradId:
 *                          type: integer
 *                          description: 게시글 고유 id 
 *                          example: 1
 *                        replyId:
 *                          type: integer
 *                          description: 대댓글 대상 댓글의 고유 id
 *                          example: 1
 *                        dept:
 *                          type: integer
 *                          description: 대댓글 여부. (댓글 - 1, 대댓글 - 2)
 *                          example: 2
 *                        content:
 *                          type: string
 *                          description: 댓글 본문
 *                          example: "댓글 본문 응답값 예시"
 *                        writer:
 *                          type: string
 *                          description: 댓글 작성자
 *                          example: "댓글 작성자 응답값 예시"
 *                        createdAt:
 *                          type: string
 *                          description: 댓글 생성일
 *                          example: "2022-05-01T05:43:51.122Z"
 *                        updatedAt:
 *                          type: string
 *                          description: 댓글 수정일
 *                          example: "2022-05-01T05:43:51.122Z"
 */
router.post('/create', CommentValidation.validationCreateComment, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;
  res.status(201).send({ result: (await CommentService.createComment(parameters)) });
}));


/**
 * @swagger
 * paths:
 *  /comment/find:
 *    get:
 *      summary: "댓글 목록 조회"
 *      description: "댓글 목록 조회. 페이지네이션 단위 5개 (수정하려면 환경변수 COMMENT_PAGINATION_LIMIT 셋팅)"
 *      tags: [Comment]
 *      parameters:
 *      - in: query
 *        name: boardId
 *        required: true
 *        description: 게시글 고유 id
 *        schema:
 *          type: integer
 *      - in: query
 *        name: cursor
 *        required: false
 *        description: 페이지네이션 기준값. 화면 마지막 댓글의 commentId가 들어감.
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          description: 댓글 목록
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                    result:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          commentId:
 *                            type: integer
 *                            description: 댓글 고유 id 
 *                            example: 1
 *                          boradId:
 *                            type: integer
 *                            description: 게시글 고유 id 
 *                            example: 1
 *                          replyId:
 *                            type: integer
 *                            description: 대댓글 대상 댓글 고유 id 
 *                            example: 1
 *                          content:
 *                            type: string
 *                            description: 댓글 본문
 *                            example: "댓글 본문 응답값 예시"
 *                          writer:
 *                            type: string
 *                            description: 댓글 작성자
 *                            example: "댓글 작성자 응답값 예시"
 *                          createdAt:
 *                            type: string
 *                            description: 댓글 생성일
 *                            example: "2022-05-01T05:43:51.122Z"
 *                          updatedAt:
 *                            type: string
 *                            description: 댓글 수정일
 *                            example: "2022-05-01T05:43:51.122Z"
 */
router.get('/find', CommentValidation.validationFindComment, asyncWrapper(async (req, res, next) => {
  const { parameters } = req;
  
  res.status(200).send({ result: (await CommentService.findComment(parameters)) });
}));

module.exports = router;