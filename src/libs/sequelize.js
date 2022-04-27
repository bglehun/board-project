'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../env');

const sequelize = new Sequelize(config.mysql);

const entities = {};

const modulesPath = path.resolve(__dirname, '../modules');


fs.readdirSync(modulesPath).forEach((module) => {
  let { entityFunc } = require(`${modulesPath}/${module}`);
  const entity = entityFunc(sequelize, Sequelize.DataTypes)
  if (entity) entities[entity.name] = entity;
});

Object.keys(entities).forEach((entityName) => {
  if (entities[entityName].associate) {
    entities[entityName].associate(entities);
  }
});

entities.sequelize = sequelize;
entities.Sequelize = Sequelize;

module.exports = entities;
