'use strict'
const express = require('express');
const chat_blacklist = require('../controllers/chat_blacklist.controller');
const chat_greeting = require('../controllers/chat_greeting.controller');
const user_chat_whitelist = require('../controllers/user_chat_whitelist');
const router = express.Router();

//region Swagger /options/blacklist/words/{chat_id}
/**
 * @swagger
 * /options/blacklist/words/{chat_id}:
 *   get:
 *     tags:
 *     - "BlackListWords"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get Black Words from Chatting ID
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             properties:
 *               word:
 *                  type: string
 *       204:
 *         $ref: '#/components/res/EmptyResult'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.get('/blacklist/words/:chat_id', (req,res) => {
    const request = {
        chat_id : req.params.chat_id
    };
    chat_blacklist.findByChatId(request)
        .then(result=>{
            if(result === undefined) res.status(204).send("empty");
            else res.status(200).send(result);
        })
        .catch(()=>{
            res.status(500).send("false");
        });
});

//region Swagger POST /options/blacklist/words/
/**
 * @swagger
 * /options/blacklist/words/:
 *   post:
 *     tags:
 *     - "BlackListWords"
 *     parameters:
 *       - in: body
 *         schema:
 *          type: object
 *          required:
 *              - chat_id
 *              - word
 *          properties:
 *              chat_id:
 *                type: integer
 *              word:
 *                type: string
 *     description: Create Black List Word
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         $ref: '#/components/res/EmptyResult'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.post('/blacklist/words/', (req,res) => {
    const request = {
        chat_id : req.body.chat_id,
        word : req.body.word
    };
    chat_blacklist.create(request)
        .then(result =>{
            res.status(200).send("true")
        })
        .catch(err => {
            res.status(500).send(err)
        })
});
//region Swagger DELETE /options/blacklist/words/:blacklist_seq
/**
 * @swagger
 * /options/blacklist/words/{blacklist_seq}:
 *  delete:
 *     tags:
 *     - "BlackListWords"
 *     parameters:
 *       - name: blacklist_seq
 *         in : path
 *         type: integer
 *     description: Delete Black List Word
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         $ref: '#/components/res/EmptyResult'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.delete('/blacklist/words/:blacklist_seq', (req, res) =>{
    const request = {
        blacklist_seq :req.params.blacklist_seq
    }
    chat_blacklist.delete(request)
        .then(result =>{
            if(result !== undefined){
                res.status(200).send("ok");
            }else{
                res.status(204).send("empty");
            }
        })
        .catch(err =>{
            res.status(500).send(err);
        })
});

//region Swagger /options/whitelist/user/{chat_id}
/**
 * @swagger
 * /options/whitelist/user/{chat_id}:
 *   get:
 *     tags:
 *     - "WhiteListUsers"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get White User from Chatting ID
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/user_chat_whitelist'
 *       204:
 *         $ref: '#/components/res/EmptyResult'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.get('/whitelist/user/:chat_id', (req, res) => {
    const request = {
        chat_id : req.params.chat_id
    };
    user_chat_whitelist.findByChatId(request)
        .then(result=>{
            if(result === undefined) res.status(204).send("empty")
            else res.status(200).send(result)
        })
        .catch(err =>{
            res.status(500).send(err);
        })
});

//region Swagger POST /options/whitelist/user/
/**
 * @swagger
 * /options/whitelist/user/:
 *   post:
 *     tags:
 *     - "WhiteListUsers"
 *     parameters:
 *       - in: body
 *         schema:
 *          type: object
 *          required:
 *              - chat_id
 *              - user_id
 *          properties:
 *              user_id:
 *                type: integer
 *              chat_id:
 *                type: integer
 *     description: Create White List User
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         $ref: '#/components/res/EmptyResult'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

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
            res.status(500).send("false");
        })
});

//region Swagger DELETE /options/blacklist/words/:blacklist_seq
/**
 * @swagger
 * /options/whitelist/user/{whitelist_seq}:
 *  delete:
 *     tags:
 *     - "WhiteListUsers"
 *     parameters:
 *       - name: whitelist_seq
 *         in : path
 *         type: integer
 *     description: Delete White List User
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         $ref: '#/components/res/EmptyResult'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.delete('/whitelist/user/:seq', (req, res) =>{
    const request = {
        seq : req.params.seq
    };
    user_chat_whitelist.delete(request)
        .then(()=>{
            res.status(200).send("ok")
        })
        .catch(err=>{
            res.status(500).send("false")
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