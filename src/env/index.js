'use strict';

const { env } = process;

let config = require('./common');

try {
  config = Object.assign(require(`./${env.NODE_ENV}`), config); // eslint-disable-line
} catch (err) {
  console.log('Error Assing Confing. Return Common Config')
}

module.exports = config;
