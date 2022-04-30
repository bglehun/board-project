const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "게시판 API",
      description:
        "게시글 및 댓글 기능 API 문서",
    },
    servers: [
      {
        url: "http://localhost:4001",
      },
    ],
  },
  apis: ["./src/modules/*/*.controller.js"], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }