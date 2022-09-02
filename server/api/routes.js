const router = require('express').Router();
const { models: { Route }} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try {
        res.send(await Route.findAll({
            order: [
                ['name', 'ASC']
            ]
        }));

    } catch (ex) {
        next(ex);
    }
})