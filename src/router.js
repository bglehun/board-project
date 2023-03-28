'use strict';

const fs = require('fs');

const modulesPath = `${__dirname}/modules`;

const importRouter = (app) => {
  try {
    fs.readdirSync(modulesPath).forEach((module) => {
      const indexPath = `${modulesPath}/${module}`;
      const controller = require(indexPath);
      if (controller && fs.existsSync(indexPath)) app.use(`/${module}/`, controller); // eslint-disable-line
    });
  } catch (e) {
    console.log('========== Import Router error ========= ', e);
    throw e;
  }
};

module.exports = importRouter;