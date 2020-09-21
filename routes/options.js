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
 *         $ref: '#/components/res/NoContent'
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
            res.status(200).send(result);
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
 *         name: word
 *         schema:
 *              type: object
 *              properties:
 *                  chat_id:
 *                      type: integer
 *                      required: true
 *                  word:
 *                      type: string
 *                      required: true
 *     description: Create Black List Word
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         $ref: '#/components/res/NoContent'
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
 *         $ref: '#/components/res/NoContent'
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
 *         $ref: '#/components/res/NoContent'
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
            res.status(200).send(result)
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
 *      - in: body
 *        name: user&chat
 *        schema:
 *          type: object
 *          properties:
 *              user_id:
 *                  type: integer
 *                  required: true
 *              chat_id:
 *                  type: integer
 *                  required: true
 *     description: Create White List User
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         $ref: '#/components/res/NoContent'
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
 *         $ref: '#/components/res/NoContent'
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

//region Swagger /options/greeting/{chat_id}
/**
 * @swagger
 * /options/greeting/{chat_id}:
 *   get:
 *     tags:
 *     - "Greetings"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get Greeting Info from Chatting ID
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/chat_greeting'
 *       204:
 *         $ref: '#/components/res/NoContent'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.get('/greeting/:chat_id', (req, res) =>{
    const request = {
        seq : req.params.chat_id
    };
    chat_greeting.findByChatId(request)
        .then((result)=>{
            if(result === undefined) res.status(204).seq("false");
            else res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})
//region Swagger POST /options/greeting/
/**
 * @swagger
 * /options/greeting/:
 *   post:
 *     tags:
 *     - "Greetings"
 *     parameters:
 *      - in: body
 *        name: greet
 *        schema:
 *          type: object
 *          properties:
 *              greeting_text:
 *                  type: string
 *                  description: it's type TEXT
 *              greeting_image:
 *                  type: string
 *              button:
 *                  type: string
 *                  description: it's type TEXT
 *              chat_id:
 *                  type: integer
 *                  required: true
 *     description: Create Greeting Message
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         $ref: '#/components/res/NoContent'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.post('/greeting/', (req,res)=>{
    const request = {
        greeting_text: req.body.greeting_text,
        greeting_image: req.body.greeting_image,
        response_type: req.body.response_type,
        button: req.body.button,
        chat_id: req.body.chat_id
    }
    chat_greeting.create(request)
        .then(()=>{
            res.status(200).send("ok")
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})

//region Swagger DELETE /options/greeting/:greeting_seq
/**
 * @swagger
 * /options/greeting/{greeting_seq}:
 *  delete:
 *     tags:
 *     - "Greetings"
 *     parameters:
 *       - name: greeting_seq
 *         in : path
 *         type: integer
 *     description: Delete Greeting Message
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         $ref: '#/components/res/NoContent'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.delete('/greeting/:greeting_seq', (req,res)=>{
    const request = {
        greeting_seq : req.body.greeting_seq
    };
    chat_greeting.delete(request)
        .then(result=>{
            if(result === undefined) res.status(204).send();
            else res.status(200).send("ok");
        })
        .catch(()=>{
            res.status(500).send("false")
        })
})

module.exports = router;