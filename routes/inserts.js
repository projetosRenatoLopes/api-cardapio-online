const { Router } = require('express');
const express = require('express');
const router = express.Router();
const CompanyRepository = require('../src/repositories/company.repository');
const ProductRepository = require('../src/repositories/product.repository');

// criar uma nova empresa
router.post('/empresa', CompanyRepository.insertCompany)

// criar um produto para uma empresa
router.post('/produto', ProductRepository.insertProduct)

module.exports = router;