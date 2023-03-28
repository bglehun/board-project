'use strict';

const mysql = require("mysql2/promise");
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../env');

const entities = {};

const initialize = async ({ force }) => {
  const { host, port, username, password, database } = config.mysql;

  const connection = await mysql.createConnection({ host, port, user: username, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const sequelize = new Sequelize(config.mysql);
  const modulesPath = path.resolve(__dirname, '../modules');

  /** import entity */
  fs.readdirSync(modulesPath).forEach((module) => {
    let entityFunc = require(`${modulesPath}/${module}/entity/${module}.entity`);
    const entity = entityFunc(sequelize, Sequelize.DataTypes)
    if (entity) entities[entity.name] = entity;
  });

  /** associate entity */
  Object.keys(entities).forEach((entityName) => {
    if (entities[entityName].associate) {
      entities[entityName].associate(entities);
    }
  });

  entities.sequelize = sequelize;
  entities.Sequelize = Sequelize;

  await sequelize.sync({ force });
}

entities.initialize = initialize;
module.exports = entities;