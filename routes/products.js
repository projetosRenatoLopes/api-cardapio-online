const express = require('express');
const router = express.Router();

// reposta de produtos de uma empresa
router.get('/:company', (req, res, next) => {
    const company = req.params.company;
    res.status(200).send({
        msg: `Produtos de ${company}`
    });
});


// criar um produto para uma empresa
router.post('/:companny', (req, res, next) => {
    const company = req.params.company;
    res.status(201).send({
        return: `Criar produtos de ${company}`
    });
});

module.exports = router;