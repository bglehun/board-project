'use strict';

const router = require('express').Router();
const { asyncWrapper } = require('../../common/asyncWrapper');

const RewardService = require('./reward.service');

router.post('/save', asyncWrapper(async (req, res) => {
    const { parameters } = req;
    res.status(201).send({ result: (await RewardService.saveReward(parameters)) });
}));

router.post('/use', asyncWrapper(async (req, res) => {
    const { parameters } = req;
    res.status(201).send({ result: (await RewardService.useReward(parameters)) });
}));

router.get('/total', asyncWrapper(async (req, res) => {
    const { parameters } = req;

    res.status(200).send({ result: (await RewardService.getRewardTotal(parameters)) });
}));

router.get('/history', asyncWrapper(async (req, res) => {
    const { parameters } = req;

    res.status(200).send({ result: (await RewardService.getRewardHistory(parameters)) });
}));

module.exports = router;