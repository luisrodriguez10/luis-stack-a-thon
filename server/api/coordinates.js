const router = require('express').Router();
const { models: { Coordinate }} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try {
        res.send(await Coordinate.findAll({
            order: [
                ["id", 'ASC']
            ]
        }));

    } catch (ex) {
        next(ex);
    }
})

router.post('/', async (req, res, next) =>{
    try {
        res.status(201).send(await Coordinate.create(req.body));
    } catch (ex) {
        next(ex)
    }
})