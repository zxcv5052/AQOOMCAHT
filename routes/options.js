const express = require('express');
const restriction_words = require('../controllers/restriction_words.controllers');
const whitelist_urls = require('../controllers/whitelist_urls.controllers');
const router = express.Router();


/**
 * path : 'address/options/restriction/words/<chat_id>
 * Method : GET
 * origin : '/getWordData'
 */
router.get('/restriction/words/:chat_id', restriction_words.findByChatId);

/**
 * path : 'address/options/restriction/words/
 * Method : POST
 * origin : '/pushWordData'
 */
router.post('/restriction/words/', restriction_words.create);

/**
 * path : 'address/options/restriction/words/<pk>'
 * Method : DELETE
 * origin : '/delWordData'
 */
router.delete('/restriction/words/:id', restriction_words.delete);

/**
 * path: 'address/options/whitelist/urls
 * Method : POST
 * origin : '/pushWhitelist'
 */
router.post('/whitelist/urls/', whitelist_urls.create);

/**
 * path: 'address/options/whitelist/urls/<chat_id>'
 * Method : GET
 * origin : '/getWhitelist'
 */
router.get('/whitelist/urls/:chat_id', whitelist_urls.findByChatId);

/**
 * path: 'address/options/whitelist/urls/<pk>'
 * Method : Delete
 * origin : '/delWhitelist'
 */
router.delete('/whitelist/urls/:id', whitelist_urls.delete);



module.exports = router;