'use strict'

const KeywordMDB = require('./database/mysql');
const { sendKeywordAlarmPush } = require('../../libs/fcm');

exports.findKeywordAndSendPush = async (text) => {
  try {
    /** 모든 keyword 조회 */
    const keywordList = await KeywordMDB.findAllKeyword();
    const parallelList = [];

    /**
     *  text에 keyword가 포함이되면, writer에게 push 발송
     *  n개의 keyword가 포함이 될 수 있으므로, 병렬로 수행.
     *  */
    for (const data of keywordList) {
      const { keyword, writer } = data;
      if (text.includes(keyword)) parallelList.push(sendKeywordAlarmPush({ writer, keyword })); 
    }

    await Promise.all(parallelList);

    return true;
  } catch (e) {
    /** keyword push 전송이 실패하더라도, 서비스에 지장을 주지 않음 */
    console.log('keyword alarm push 전송 실패')
  }
}