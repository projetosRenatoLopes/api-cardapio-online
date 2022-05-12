const express = require('express');
const router = express.Router();
const userRepository = require('../src/repositories/user.repository');

// reposta de produtos de uma empresa
router.post('/', userRepository.getSession);


module.exports = router;