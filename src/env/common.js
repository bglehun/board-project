'use strict';

const { env } = process;

module.exports = {
  PORT: env.NODE_PORT || 4001,

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
      idle: 5000,
    },
    operatorsAliases: false,
    logging: true,
  },
};