'use strict';

const { keyword } = require('../../../../libs/sequelize');

exports.findAllKeyword = async () => {
  try {
    const result = await keyword.findAll({
      raw: true,
    } );

    return result;
  } catch (err){
    console.log('MYSQL ERROR - findAllKeyword error', err);
    throw new Error(err);
  }
};