'use strict';

const { env } = process;

module.exports = {
  port: env.NODE_PORT && !isNaN(env.NODE_PORT) ? Number(env.NODE_PORT) : 4001,
  boardPaginationLimit: env.BOARD_PAGINATION_LIMIT && !isNaN(env.BOARD_PAGINATION_LIMIT) ? Number(env.BOARD_PAGINATION_LIMIT) : 3,
  mysql: {
    username: env.MYSQL_USERNAME || 'root',
    password: env.MYSQL_PASSWORD || 'localhost1!',
    database: env.MYSQL_DATABASE || 'local',
    host: env.MYSQL_HOST || 'localhost',
    port: env.MYSQL_PORT || 3307,
    dialect: 'mysql',
    pool: {
      min: 1,
      max: 2,
    },
    logging: console.log,
  },
};