'use strict'
const express = require('express');
const { format } = require('util');

const multer = require('multer');
const upload = multer();
const blackController = require('../controllers/blackList.controller');
const greetController = require('../controllers/chat_greeting.controller');
const whiteController = require('../controllers/userChatWhite.controller');
const router = express.Router();

//region Swagger setting/{chat_id}/blacklist-word
/**
 * @swagger
 * /setting/{chat_id}/blacklist-word:
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
router.get('/:chat_id/blacklist-word', (req,res) => {
    const request = {
        chat_id : req.params.chat_id
    };
    blackController.findByChatId(request)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send("false");
        });
});

//region Swagger POST setting/{chat_id}/blacklist-word
/**
 * @swagger
 * /setting/{chat_id}/blacklist-word:
 *   post:
 *     tags:
 *     - "BlackListWords"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *       - in: body
 *         name: word
 *         schema:
 *              type: object
 *              properties:
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
router.post('/:chat_id/blacklist-word', (req,res) => {
    const request = {
        chat_id : req.params.chat_id,
        word : req.body.word
    };
    blackController.create(request)
        .then(result =>{
            res.status(200).send("true")
        })
        .catch(err => {
            res.status(500).send(err)
        })
});

//region Swagger DELETE setting/blacklist-word/{id}
/**
 * @swagger
 * /setting/blacklist-word/{id}:
 *  delete:
 *     tags:
 *     - "BlackListWords"
 *     parameters:
 *       - name: id
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
router.delete('/blacklist-word/:id', (req, res) =>{
    const request = {
        id :req.params.id
    }
    blackController.delete(request)
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

//region Swagger setting/{chat_id}/whitelist-user
/**
 * @swagger
 * /setting/{chat_id}/whitelist-user:
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
router.get('/:chat_id/whitelist-user', (req, res) => {
    const request = {
        chat_id : req.params.chat_id
    };
    whiteController.findByChatId(request)
        .then(result=>{
            res.status(200).send(result)
        })
        .catch(err =>{
            res.status(500).send(err);
        })
});

//region Swagger POST setting/{chat_id}/whitelist-user
/**
 * @swagger
 * /setting/{chat_id}/whitelist-user:
 *   post:
 *     tags:
 *     - "WhiteListUsers"
 *     parameters:
 *      - name: chat_id
 *        in : path
 *        schema:
 *          type: integer
 *      - in: body
 *        name: user_id
 *        schema:
 *              type: object
 *              properties:
 *                  user_id:
 *                      type: integer
 *                      required: true
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
router.post('/:chat_id/whitelist-user', (req, res) => {
    const request = {
        user_id : req.body.user_id,
        chat_id : req.params.chat_id
    }
    whiteController.create(request)
        .then(()=>{
            res.status(200).send("ok");
        })
        .catch(err =>{
            res.status(500).send("false");
        })
});

//region Swagger DELETE setting/whitelist-user/{id}
/**
 * @swagger
 * /setting/whitelist-user/{id}:
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
router.delete('/whitelist-user/:id', (req, res) =>{
    const request = {
        id : req.params.id
    };
    whiteController.delete(request)
        .then(result =>{
            if(result !== undefined){
                res.status(200).send("ok");
            }else{
                res.status(204).send("empty");
            }
        })
        .catch(err=>{
            res.status(500).send("false")
        })
});

//region Swagger GET setting/{chat_id}/greeting
/**
 * @swagger
 * /setting/{chat_id}/greeting:
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
 *              $ref: '#/definitions/greetController'
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
router.get('/:chat_id/greeting', (req, res) =>{
    const request = {
        chat_id : req.params.chat_id
    };
    greetController.findByChatId(request)
        .then( result => {
            if(result === undefined) res.status(204).seq("false");
            else res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})
//region Swagger POST /setting/{chat_id}/greeting
/**
 * @swagger
 * /setting/{chat_id}/greeting:
 *   post:
 *     tags:
 *     - "Greetings"
 *     consumes:
 *          - multipart/form-data
 *     parameters:
 *      - in: formData
 *        name: greeting_text
 *        type: string
 *      - in: formData
 *        name: greeting_image
 *        type: file
 *      - in: formData
 *        name: button
 *        type: string
 *      - in: path
 *        name: chat_id
 *        type: integer
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
router.post('/:chat_id/greeting',upload.single('greeting_image'), async (req,res)=>{
    const request = {
        greeting_text: req.body.greeting_text,
        button: req.body.button,
        chat_id: req.params.chat_id
    }
    uploading(req.file).then(result=>{
        if(result!==undefined) {
            request['greeting_image'] = result;
        }
        greetController.create(request)
            .then(()=>{
                res.status(200).send("ok")
            })
            .catch(err=>{
                res.status(500).send(err);
            })
    }).catch(()=>{

    });
});
//region Swagger DELETE setting/greeting/{id}
/**
 * @swagger
 * /setting/greeting/{id}:
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
    greetController.delete(request)
        .then(result=>{
            if(result === undefined) res.status(204).send();
            else res.status(200).send("ok");
        })
        .catch(()=>{
            res.status(500).send("false")
        })
})
//region Swagger PUT setting/greeting/{id}
/**
 * @swagger
 * /setting/greeting/{id}:
 *   patch:
 *     tags:
 *     - "Greetings"
 *     consumes:
 *      - multipart/form-data
 *     parameters:
 *      - in: formData
 *        name: greeting_text
 *        type: string
 *      - in: formData
 *        name: greeting_image
 *        type: file
 *      - in: formData
 *        name: button
 *        type: string
 *      - in: formData
 *        name: greeting_seq
 *        type: integer
 *        required: true
 *
 *     description: Update Greeting Message
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
router.put('/greeting/{greeting_seq}', (req,res)=>{
    const request = {
        greeting_seq: req.params.greeting_seq,
        greeting_text: req.body.greeting_text,
        button: req.body.button,
        is_active: req.body.is_active
    }
    uploading(req.file)
        .then(result=>{
        if(result!==undefined) {
            request['greeting_image'] = result;
        }
        greetController.update(request)
            .then(()=>{
                if(result === undefined) res.status(204).send();
                else res.status(200).send("ok")
            })
            .catch(err=>{
                res.status(500).send(err);
            })
    }).catch(()=>{

    });
});



module.exports = router;