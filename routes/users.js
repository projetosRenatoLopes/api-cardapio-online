const express = require('express');
const router = express.Router();
const userRepository = require('../src/repositories/user.repository');
const adminRepository = require('../src/repositories/admin.repository');

// reposta de produtos de uma empresa
router.post('/login', userRepository.getSession);

router.post('/', adminRepository.getSession);



module.exports = router;