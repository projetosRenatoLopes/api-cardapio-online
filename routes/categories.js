const express = require('express');
const router = express.Router();
const CategoriesRepository = require('../src/repositories/categories.repository');

// reposta para lista de categorias
router.get('/', CategoriesRepository.getCategories);

module.exports = router;