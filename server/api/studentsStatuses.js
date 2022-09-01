const router = require('express').Router();
const { models: { StudentStatus }} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try {
        res.send(await StudentStatus.findAll());

    } catch (ex) {
        next(ex);
    }
})

router.post('/', async (req, res, next) =>{
    try {
        res.status(201).send(await StudentStatus.create(req.body));
    } catch (ex) {
        next(ex)
    }
})