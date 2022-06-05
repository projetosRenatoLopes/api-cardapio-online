const express = require('express');
const router = express.Router();
const radioRepository = require('../src/repositories/radio.repository');

// reposta de produtos de uma empresa
router.post('/login', radioRepository.getSession);

router.post('/validtoken', radioRepository.validToken)

router.put('/update',  radioRepository.updateUser)

router.put('/updateimg',  radioRepository.updateImgUser)

router.post('/like',  radioRepository.like)

router.post('/post', radioRepository.sendPost)

router.post('/comment', radioRepository.sendComment)

router.get('/posts', radioRepository.getPosts)

router.get('/link', radioRepository.getLink)

router.post('/link', radioRepository.newLink)

router.get('/links', radioRepository.getLinks)

router.put('/links', radioRepository.setLinks)

router.post('/sql',  radioRepository.sql)

module.exports = router;