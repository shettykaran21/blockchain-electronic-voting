const express = require('express')

const { register } = require('../controllers/candidate')

const router = express.Router()

router.post('/registerCandidate', register)

module.exports = router
