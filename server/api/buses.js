const router = require('express').Router();
const { models: { Bus }} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try {
        res.send(await Bus.findAll());

    } catch (ex) {
        next(ex);
    }
})



