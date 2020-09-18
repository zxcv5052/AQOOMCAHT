'use strict'

const express = require('express');
const chat_blacklist = require('../controllers/chat_blacklist.controller');
const chat_greeting = require('../controllers/chat_greeting.controller');
const user_chat_whitelist = require('../controllers/user_chat_whitelist');
const router = express.Router();

/**
 * path : 'address/options/restriction/words/<chat_id>
 * Method : GET
 * origin : '/getWordData'
 */
router.get('/restriction/words/:chat_id', (req,res) => {
    const request = {
        chat_id : req.params.chat_id
    };
    chat_blacklist.findByChatId(request)
        .then(result=>{
            res.send(result);
        })
        .catch(()=>{
            res.send("false");
        });
});

/**
 * path : 'address/options/restriction/words/
 * Method : POST
 * origin : '/pushWordData'
 */
router.post('/restriction/words/', (req,res) => {
    const request = {
        chat_id : req.body.chat_id,
        word : req.body.word
    };
    chat_blacklist.create(request)
        .then(() =>{
            res.send("true")
        })
        .catch(err => {
            res.status(500).send(err)
        })
});

/**
 * path : 'address/options/restriction/words/<pk>'
 * Method : DELETE
 * origin : '/delWordData'
 */
router.delete('/restriction/words/:blacklist_seq', (req, res) =>{
    const request = {
        blacklist_seq :req.params.blacklist_seq
    }
    chat_blacklist.delete(request)
        .then(() =>{
            res.send("true")
        })
        .catch(err =>{
            res.status(500).send(err);
        })
});

/**
 * path: 'address/options/whitelist/user
 * Method : POST
 * origin : '/pushWhitelist'
 */
router.post('/whitelist/user', (req, res) => {
    const request = {
        user_id : req.body.user_id,
        chat_id : req.body.chat_id
    }
    user_chat_whitelist.create(request)
        .then(()=>{
            res.status(200).send("ok");
        })
        .catch(err =>{
            res.status(500).send(err);
        })
});

/**
 * path: 'address/options/whitelist/user/<chat_id>'
 * Method : GET
 * origin : '/getWhitelist'
 */

router.get('/whitelist/user/:chat_id', (req, res) => {
    const request = {
        chat_id : req.params.chat_id
    };
    user_chat_whitelist.findByChatId(request)
        .then(()=>{
            res.status(200).send("ok")
        })
        .catch(err =>{
            res.status(500).send(err);
        })
});

/**
 * path: 'address/options/whitelist/user/<pk>'
 * Method : Delete
 * origin : '/delWhitelist'
 */
router.delete('/whitelist/user/:seq', (req, res) =>{
    const request = {
        seq : req.params.seq
    };
    user_chat_whitelist.delete(request)
        .then(()=>{
            res.status(200).send("ok")
        })
        .catch(err=>{
            res.status(500).send(err)
        })
});


router.get('/greeting/:seq', (req, res) =>{
    const request = {
        seq : req.params.seq
    };
    chat_greeting.findByPK(request)
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})

module.exports = router;