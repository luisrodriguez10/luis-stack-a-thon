const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/buses', require('./buses'));
router.use('/students', require('./students'));
router.use('/statuses', require('./statuses'));
router.use('/studentsStatuses', require('./studentsStatuses'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
