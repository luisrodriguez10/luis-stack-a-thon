const router = require('express').Router();
const { models: { StudentBusStatus }} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try {
        res.send(await StudentBusStatus.findAll());

    } catch (ex) {
        next(ex);
    }
})