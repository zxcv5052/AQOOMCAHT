'use strict'
const express = require('express');
const multer = require('multer');
const storage = require('../public/cloudeStorage');
const { format } = require('util');

const upload = multer();
const blackController = require('../controllers/blackList.controller');
const greetController = require('../controllers/chat_greeting.controller');
const whiteController = require('../controllers/userChatWhite.controller');
const chat_faq = require('../controllers/chatFuntion');
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

//region Swagger DELETE setting/{chat_id}/blacklist-word/{id}
/**
 * @swagger
 * /setting/{chat_id}/blacklist-word/{id}
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
router.delete('/{chat_id}/blacklist-word/:id', (req, res) =>{
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

//region Swagger POST /options/whitelist/user
/**
 * @swagger
 * /options/whitelist/user:
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

//region Swagger GET /options/greeting/{chat_id}
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
router.get('/greeting/:chat_id', (req, res) =>{
    const request = {
        seq : req.params.chat_id
    };
    greetController.findByChatId(request)
        .then((result)=>{
            if(result === undefined) res.status(204).seq("false");
            else res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})
//region Swagger POST /options/greeting
/**
 * @swagger
 * /options/greeting:
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
 *      - in: formData
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
router.post('/greeting',upload.single('greeting_image'), async (req,res)=>{
    const request = {
        greeting_text: req.body.greeting_text,
        button: req.body.button,
        chat_id: req.body.chat_id
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
    greetController.delete(request)
        .then(result=>{
            if(result === undefined) res.status(204).send();
            else res.status(200).send("ok");
        })
        .catch(()=>{
            res.status(500).send("false")
        })
})
//region Swagger PUT /options/greeting
/**
 * @swagger
 * /options/greeting:
 *   put:
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
router.put('/greeting', (req,res)=>{
    const request = {
        greeting_seq: req.body.greeting_seq,
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


//region Swagger POST /options/faq
/**
 * @swagger
 * /options/faq:
 *   post:
 *     tags:
 *     - "FAQ"
 *     consumes:
 *          - multipart/form-data
 *     parameters:
 *      - in: formData
 *        name: request_content_text
 *        type: string
 *      - in: formData
 *        name: response_content_text
 *        type: string
 *      - in: formData
 *        name: response_content_image
 *        type: file
 *      - in: formData
 *        name: response_image_type
 *        type: string
 *      - in: formData
 *        name: button
 *        type: string
 *      - in: formData
 *        name: chat_id
 *        type: integer
 *     description: Create FAQ
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
router.post('/faq',upload.single('response_content_image'), async (req,res)=>{
    const request = {
        request_content_text: req.body.request_content_text,
        response_content_text : req.body.response_content_text,
        response_image_type: req.body.response_image_type,
        button: req.body.button,
        chat_id: req.body.chat_id
    }
    request["request_content_text"] = '!'+request.request_content_text;
    console.log(req.file);
    uploading(req.file)
        .then(result=>{
        if(result!==undefined) {
            request['response_content_image'] = result;
        }
        chat_faq.create(request)
            .then(()=>{
                res.status(200).send("ok")
            })
            .catch(err=>{
                console.log(err);
                res.status(500).send(err);
            })
    }).catch(()=>{

    });
});

//region Swagger PUT /options/faq
/**
 * @swagger
 * /options/faq:
 *   put:
 *     tags:
 *     - "FAQ"
 *     consumes:
 *      - multipart/form-data
 *     parameters:
 *      - in: formData
 *        name: faq_seq
 *        type: integer
 *      - in: formData
 *        name: request_content_text
 *        type: string
 *      - in: formData
 *        name: response_content_text
 *        type: string
 *      - in: formData
 *        name: response_content_image
 *        type: file
 *      - in: formData
 *        name: response_image_type
 *        type: string
 *      - in: formData
 *        name: button
 *        type: string
 *      - in: formData
 *        name: is_active
 *        type: boolean
 *     description: Update FAQ
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
router.put('/faq', (req,res)=>{
    const request = {
        faq_seq: req.body.faq_seq,
        request_content_text: req.body.request_content_text,
        response_content_text : req.body.response_content_text,
        response_image_type: req.body.response_image_type,
        button: req.body.button,
        is_active: req.body.is_active
    };
    console.log("hihihii")
    console.log(req.file)
    uploading(req.file)
        .then(result=>{
            if(result!==undefined) {
                request['response_content_image'] = result;
            }
            chat_faq.update(request)
                .then(()=>{
                    if(result === undefined) res.status(204).send();
                    else res.status(200).send("ok")
                })
                .catch(err=>{
                    res.status(500).send(err);
                    console.log(err);
                })
        }).catch((err)=>{
            console.log(err);
    });
});

//region Swagger DELETE /options/faq/:faq_seq
/**
 * @swagger
 * /options/faq/{faq_seq}:
 *  delete:
 *     tags:
 *     - "FAQ"
 *     parameters:
 *       - name: faq_seq
 *         in : path
 *         type: integer
 *     description: Delete FAQ
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
        greeting_seq : req.body.faq_seq
    };
    chat_faq.delete(request)
        .then(result=>{
            if(result === undefined) res.status(204).send();
            else res.status(200).send("ok");
        })
        .catch(()=>{
            res.status(500).send("false")
        })
});


function uploading(requestFile){
    return new Promise(async (resolve, reject) => {
        if(requestFile === undefined) {
            resolve();
            return;
        }
        const date = (new Date()).toISOString().replace(/[^0-9]/g, "").slice(0, -3);
        const fileArray = requestFile.originalname.split('.');
        const fileName = fileArray[0].concat(date).concat('.').concat(fileArray[1]);
        const blob = storage.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false
        });
        blobStream.on('error', err => {
            reject(err);
        });
        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com/${storage.name}/${blob.name}`
            );
            resolve(publicUrl);
        });
        blobStream.end(requestFile.buffer);
    });
};

module.exports = router;