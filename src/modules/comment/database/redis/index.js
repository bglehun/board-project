'use strict';

const fs = require('fs');
const path = require('path');

const modules = {};

fs.readdirSync(__dirname).forEach((module) => {
  if (module === 'index.js') return;
  const modulePath = path.join(__dirname, module);
  if (fs.existsSync(modulePath)) Object.assign(modules, require(modulePath)); // eslint-disable-line
});

module.exports = modules;