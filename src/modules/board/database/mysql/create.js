'use strict';

const { board } = require('../../../../libs/sequelize');

exports.createBoard = async ({ data,transaction }) => {
  try {
    const result = (await board.create(data, { transaction })).get({ plain: true });
    return result;
  } catch (err){
    console.log('MYSQL ERROR - createBoard error', err);
    throw new Error(err);
  }
};