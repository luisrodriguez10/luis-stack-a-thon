const router = require('express').Router();
const { models: { Student }} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try {
        res.send(await Student.findAll({
           order: [[
               'lastName', 'ASC'
           ]]
        }));

    } catch (ex) {
        next(ex);
    }
})

router.put('/:id', async(req, res, next) =>{
    try {
        const student = await Student.findByPk(req.params.id);
        await student.update(req.body);
        res.send(student);
    } catch (ex) {
        next(ex)
    }
})