'use strict';

const { board } = require('../../../../libs/sequelize');

exports.editBoard = async ({ where, values, transaction }) => {
  try {
    const [result] = (await board.update(values, {
      where,
      transaction,
    }));
  
    return result;
  } catch (err){
    console.log('MYSQL ERROR - editBoard error', err);
    throw new Error(err);
  }
};