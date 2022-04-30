'use strict';

exports.sendKeywordAlarmPush = async ({ writer, keyword }) => {
  console.log('Success send keyword alarm push.', writer, keyword);
  return true;
} 