const express = require('express');
const router = express.Router();
const ProductRepository = require('../src/repositories/product.repository');

// reposta de produtos de uma empresa
router.get('/:company', ProductRepository.findAllProducts);

router.put('/alterar', ProductRepository.updateProduct);


module.exports = router;