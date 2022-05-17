const express = require('express');
const router = express.Router();
const ProductRepository = require('../src/repositories/product.repository');

// reposta de produtos de uma empresa
router.get('/:company', ProductRepository.findAllProducts);


module.exports = router;