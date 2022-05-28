const express = require('express')

const {
  create,
  authenticate,
  getAll,
  updateById,
  deleteById,
  resultMail,
} = require('../controllers/voter')

const router = express.Router()

router.post('/register', create)
router.post('/authenticate', authenticate)
router.post('/', getAll)
router.put('/:voterId', updateById)
router.delete('/:voterId', deleteById)
router.post('/resultMail', resultMail)

module.exports = router
