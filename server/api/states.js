const router = require('express').Router();
const { models: { State }} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try {
        res.send(await State.findAll({
            order: [
                ['name', 'ASC']
            ]
        }));

    } catch (ex) {
        next(ex);
    }
})