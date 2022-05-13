const express = require('express');
const router = express.Router();
const OpcoesRepository = require('../src/repositories/opcoes.repository');

router.get('/categorias', OpcoesRepository.getCategories);
router.get('/modospagamento', OpcoesRepository.getPaymentModes);

module.exports = router;