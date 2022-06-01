const express = require('express');
const router = express.Router();
const radioRepository = require('../src/repositories/radio.repository');

// reposta de produtos de uma empresa
router.post('/login', radioRepository.getSession);

router.post('/validtoken', radioRepository.validToken)

router.put('/update',  radioRepository.updateUser)

router.post('/like',  radioRepository.like)

router.post('/post', radioRepository.sendPost)

router.get('/posts', radioRepository.getPosts)



module.exports = router;