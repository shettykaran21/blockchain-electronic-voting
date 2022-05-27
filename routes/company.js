const express = require('express');

const CompanyController = require('../controllers/company');

const router = express.Router();

router.post('/register', CompanyController.create);
router.post('/authenticate', CompanyController.authenticate);

module.exports = router;
