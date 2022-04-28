'use strict';

const { comment } = require('../../../../libs/sequelize');

exports.createComment = async ({ data,transaction }) => {
  try {
    const result = (await comment.create(data, { transaction })).get({ plain: true });
    return result;
  } catch (err){
    console.log('MYSQL ERROR - createComment error', err);
    throw new Error(err);
  }
};