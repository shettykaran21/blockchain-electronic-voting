const express = require('express');

const candidateController = require('../controllers/candidate');

const router = express.Router();

router.post('/registerCandidate', candidateController.register);

module.exports = router;
