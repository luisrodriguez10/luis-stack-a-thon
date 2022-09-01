const router = require('express').Router();
const { models: { Status }} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try {
        res.send(await Status.findAll());

    } catch (ex) {
        next(ex);
    }
})