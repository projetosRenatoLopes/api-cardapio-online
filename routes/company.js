const express = require('express');
const router = express.Router();
const CompanyRepository = require('../src/repositories/company.repository');

// reposta de pesquisa de uma empresa
router.get('/:company', CompanyRepository.findCompanyByTag);

// reposta para lista de empresasa cadastradas
router.get('/', CompanyRepository.findAllCompany);



module.exports = router;