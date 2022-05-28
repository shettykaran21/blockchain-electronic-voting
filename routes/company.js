const express = require('express')

const { create, authenticate } = require('../controllers/company')

const router = express.Router()

router.post('/register', create)
router.post('/authenticate', authenticate)

module.exports = router
