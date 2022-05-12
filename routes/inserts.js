const express = require('express');
const router = express.Router();
const CompanyRepository = require('../src/repositories/company.repository');

// criar uma nova empresa
router.post('/empresa', CompanyRepository.insertCompany)

module.exports = router;