'use strict'
const express = require('express');
const multer = require('multer');
const storage = require('../public/cloudeStorage');
const { format } = require('util');

const upload = multer();
const blackController = require('../controllers/blackList.controller');
const greetController = require('../controllers/chat_greeting.controller');
const whiteController = require('../controllers/userChatWhite.controller');
const functionController = require('../controllers/chatFuntion');
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

//region Swagger GET setting/{chat_id}/function
/**
 * @swagger
 * /setting/{chat_id}/function:
 *   get:
 *     tags:
 *     - "Function"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get Function Info from Chatting ID
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/chat_function'
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
router.get('/:chat_id/function', (req, res) =>{
    const request = {
        chat_id : req.params.chat_id
    };
    functionController.findByChat(request)
        .then( result => {
            if(result === undefined) res.status(204).seq("false");
            else res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})
//region Swagger POST /setting/{chat_id}/function/
/**
 * @swagger
 * /setting/{chat_id}/function:
 *   post:
 *     tags:
 *     - "Function"
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
 *      - in: path
 *        name: chat_id
 *        type: integer
 *     description: Create Function
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
router.post('/:chat_id/function',upload.single('response_content_image'), async (req,res)=>{
    const request = {
        request_content_text: req.body.request_content_text,
        response_content_text : req.body.response_content_text,
        response_image_type: req.body.response_image_type,
        button: req.body.button,
        chat_id: req.params.chat_id
    }
    request["request_content_text"] = '!'+request.request_content_text;
    uploading(req.file)
        .then(result=>{
        if(result!==undefined) {
            request['response_content_image'] = result;
        }
        functionController.create(request)
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

//region Swagger PUT /setting/function/{id}
/**
 * @swagger
 * /setting/function/{id}:
 *   put:
 *     tags:
 *     - "Function"
 *     consumes:
 *      - multipart/form-data
 *     parameters:
 *      - in: path
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
 *     description: Update Function
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
router.put('/function/:faq_seq', (req,res)=>{
    const request = {
        faq_seq: req.params.faq_seq,
        request_content_text: req.body.request_content_text,
        response_content_text : req.body.response_content_text,
        response_image_type: req.body.response_image_type,
        button: req.body.button,
        is_active: req.body.is_active
    };
    uploading(req.file)
        .then(result=>{
            if(result!==undefined) {
                request['response_content_image'] = result;
            }
            functionController.update(request)
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

//region Swagger DELETE /setting/function/{faq_seq}
/**
 * @swagger
 * /setting/function/{faq_seq}:
 *  delete:
 *     tags:
 *     - "Function"
 *     parameters:
 *       - name: faq_seq
 *         in : path
 *         type: integer
 *     description: Delete Function
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
router.delete('/function/:greeting_seq', (req,res)=>{
    const request = {
        greeting_seq : req.body.faq_seq
    };
    functionController.delete(request)
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