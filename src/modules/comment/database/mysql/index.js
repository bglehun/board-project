'use strict';

const fs = require('fs');
const modules = {};

fs.readdirSync(__dirname).forEach((module) => {
  if (module === 'index.js') return;
  const modulePath = `${__dirname}/${module}`;
  if (fs.existsSync(modulePath)) Object.assign(modules, require(modulePath)); // eslint-disable-line
});

module.exports = modules;