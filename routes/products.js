const express = require('express');
const router = express.Router();
const ProductRepository = require('../src/repositories/product.repository');

// reposta de produtos de uma empresa
router.get('/:company', ProductRepository.findAllProducts);


// criar um produto para uma empresa
router.post('/:company', (req, res, next) => {
    const company = req.params.company;
    res.status(201).send({
        return: `Criar produtos de ${company}`
    });
});

module.exports = router;